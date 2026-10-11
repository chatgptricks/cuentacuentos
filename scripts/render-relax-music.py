#!/usr/bin/env python3
"""Render Luz de casa from recorded acoustic piano samples, without oscillators.

Requires Python 3, numpy, scipy and FFmpeg. Samples remain in the system temp
directory; only the finished MP3 and its documentation belong to the app.
Salamander Grand Piano v3 recordings: Alexander Holm, CC BY 3.0.
"""
from pathlib import Path
from urllib.parse import quote
from urllib.request import urlopen
import argparse
import hashlib
import json
import re
import subprocess
import tempfile

import numpy as np
from scipy.signal import resample_poly

COMMIT = '3382bf9496bba2486f5ab0de55a264d1dfc38404'
SOURCE = f'https://raw.githubusercontent.com/sfzinstruments/SalamanderGrandPiano/{COMMIT}/'
SAMPLE_NOTES = {'D#3': 51, 'F#3': 54, 'A3': 57, 'C4': 60, 'D#4': 63, 'F#4': 66, 'A4': 69}
TUNING_CENTS = {'D#3': -6, 'F#3': -3, 'A3': -3, 'C4': -6, 'D#4': -3, 'F#4': 0, 'A4': -4}
RATE = 32000
DURATION = 88.0

# An original, deliberately sparse score. Each harmony lasts two slow bars.
# Different spacing and register keep it from becoming a continuous arpeggio.
# Event: seconds within harmony, MIDI note, relative amplitude, soft layer, key hold.
HARMONIES = [
    ('D', [(0.68, 50, .53, 2, 5.8), (1.92, 54, .39, 1, 4.9), (3.14, 57, .40, 2, 3.9), (4.86, 66, .34, 1, 2.2)]),
    ('Bm/F#', [(0.78, 54, .43, 2, 5.5), (2.06, 59, .37, 1, 4.3), (3.65, 62, .33, 2, 3.2)]),
    ('G', [(0.53, 55, .45, 2, 5.6), (1.87, 59, .36, 1, 4.7), (3.34, 62, .32, 1, 3.8), (5.12, 64, .27, 2, 1.8)]),
    ('Aadd9', [(0.64, 57, .42, 1, 5.4), (1.72, 61, .31, 2, 4.5), (3.07, 64, .32, 1, 3.5), (4.73, 59, .28, 2, 2.0)]),
    ('D/A', [(0.83, 57, .39, 2, 5.4), (2.28, 62, .36, 1, 4.0), (4.12, 66, .30, 2, 2.5)]),
    ('Bm/F#', [(0.72, 54, .41, 1, 5.7), (2.19, 62, .34, 2, 4.0), (3.89, 59, .32, 1, 2.8), (5.22, 66, .25, 2, 1.7)]),
    ('G', [(0.56, 55, .43, 2, 5.7), (2.13, 62, .33, 1, 4.0), (4.32, 67, .27, 2, 2.4)]),
    ('Aadd9', [(0.81, 57, .39, 1, 5.4), (2.02, 64, .31, 2, 4.4), (3.57, 59, .28, 1, 3.0), (5.13, 61, .24, 2, 1.8)]),
    ('D', [(0.65, 50, .46, 2, 5.8), (2.14, 57, .36, 1, 4.0), (4.08, 66, .28, 2, 2.4)]),
    ('G/D', [(0.84, 50, .37, 1, 5.5), (2.24, 59, .31, 2, 4.0), (4.21, 67, .25, 1, 2.4)]),
    ('Aadd9', [(0.73, 57, .39, 2, 6.0), (2.11, 61, .29, 1, 5.3), (3.69, 64, .27, 2, 4.2), (5.38, 59, .25, 1, 3.4)]),
]


def run(*args, **kwargs):
    return subprocess.run(*args, check=True, **kwargs)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--samples-dir', type=Path, default=Path(tempfile.gettempdir()) / 'cuentacuentos-piano-samples')
    parser.add_argument('--output', type=Path, default=Path(__file__).resolve().parents[1] / 'public/audio/music-relax-original.mp3')
    args = parser.parse_args()
    samples_dir = args.samples_dir
    samples_dir.mkdir(parents=True, exist_ok=True)
    decoded = {}
    source_metadata = []
    for note in SAMPLE_NOTES:
        for layer in [1, 2]:
            relative = f'Samples/{note}v{layer}.flac'
            path = samples_dir / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            if not path.exists():
                path.write_bytes(urlopen(SOURCE + quote(relative), timeout=30).read())
            raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', str(path), '-ar', str(RATE), '-ac', '2', '-f', 'f32le', 'pipe:1'])
            decoded[(note, layer)] = np.frombuffer(raw, dtype='<f4').reshape(-1, 2).copy()
            source_metadata.append({'sample': relative, 'url': SOURCE + quote(relative), 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})

    rng = np.random.default_rng(241011)
    total_samples = round(DURATION * RATE)
    mix = np.zeros((total_samples, 2), dtype=np.float64)
    events = []
    for index, (chord, pattern) in enumerate(HARMONIES):
        for onset, midi, amplitude, layer, hold in pattern:
            source_note = min(SAMPLE_NOTES, key=lambda note: abs(SAMPLE_NOTES[note] - midi))
            semitones = midi - SAMPLE_NOTES[source_note]
            assert abs(semitones) <= 1, 'The original timbre stays close to its recorded key.'
            ratio = 2 ** ((semitones + TUNING_CENTS[source_note] / 100) / 12)
            # Resampling changes pitch just as a conventional sampler does; it adds no tone.
            note = resample_poly(decoded[(source_note, layer)], 100000, round(100000 * ratio), axis=0)
            release = 2.2 if index < 10 else 3.3
            keep = min(len(note), round((hold + release) * RATE))
            note = note[:keep].copy()
            release_start = min(round(hold * RATE), keep)
            if release_start < keep:
                phase = np.linspace(0, np.pi / 2, keep - release_start)
                note[release_start:] *= (np.cos(phase) ** 2)[:, None]
            # A 1 ms fade only protects against a sample-boundary click, preserving the hammer.
            attack = min(round(.001 * RATE), keep)
            note[:attack] *= np.linspace(0, 1, attack)[:, None]
            amplitude *= 10 ** (rng.uniform(-.55, .45) / 20)
            note *= amplitude
            when = index * 8 + onset + rng.uniform(-.035, .035)
            begin = round(when * RATE)
            positions = (begin + np.arange(keep)) % total_samples
            # Last-note resonance continues into the start of the next cycle, rather than
            # being cut or replaced by a long fade to silence.
            mix[positions] += note
            events.append({'time': round(when, 4), 'midi': midi, 'harmony': chord, 'sample': f'{source_note}v{layer}.flac', 'gain': round(float(amplitude), 5), 'hold': hold, 'release': release})

    intermediate = samples_dir / 'luz-de-casa-loop.wav'
    run(['ffmpeg', '-y', '-v', 'error', '-f', 'f32le', '-ar', str(RATE), '-ac', '2', '-i', 'pipe:0', '-c:a', 'pcm_f32le', str(intermediate)], input=mix.astype('<f4').tobytes())
    # Normalise the whole performance, retaining note dynamics and quiet breathing spaces.
    analysis = run(['ffmpeg', '-hide_banner', '-i', str(intermediate), '-af', 'loudnorm=I=-24.5:TP=-8:LRA=12:print_format=json', '-f', 'null', '-'], capture_output=True, text=True)
    measured = json.loads(re.findall(r'\{\s*"input_i"[\s\S]*?\}', analysis.stderr)[-1])
    normalizer = 'loudnorm=I=-24.5:TP=-8:LRA=12:measured_I={input_i}:measured_TP={input_tp}:measured_LRA={input_lra}:measured_thresh={input_thresh}:offset={target_offset}:linear=true'.format(**measured)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    # MP3's independent start/end transform windows can introduce a minute boundary
    # mismatch even for a circular PCM mix. Eight milliseconds protect that edge;
    # the carried resonance and the musical duration remain intact.
    guarded = normalizer + ',afade=t=in:st=0:d=0.008:curve=hsin,afade=t=out:st=87.992:d=0.008:curve=hsin'
    run(['ffmpeg', '-y', '-v', 'error', '-i', str(intermediate), '-af', guarded, '-ar', str(RATE), '-ac', '2', '-c:a', 'libmp3lame', '-b:a', '160k', '-map_metadata', '-1', str(args.output)])
    final = run(['ffmpeg', '-hide_banner', '-i', str(args.output), '-af', 'loudnorm=I=-24.5:TP=-8:LRA=12:print_format=json', '-f', 'null', '-'], capture_output=True, text=True)
    levels = json.loads(re.findall(r'\{\s*"input_i"[\s\S]*?\}', final.stderr)[-1])
    metadata = {'title': 'Luz de casa', 'composition': 'Original para Cuentacuentos', 'samples': 'Salamander Grand Piano V3 — Alexander Holm', 'sampleLicense': 'CC BY 3.0', 'sourceCommit': COMMIT, 'duration': DURATION, 'loopStart': 0, 'loopEnd': DURATION, 'sampleRate': RATE, 'channels': 2, 'bitRate': 160000, 'events': events, 'sources': source_metadata, 'finalLevels': levels, 'bytes': args.output.stat().st_size, 'sha256': hashlib.sha256(args.output.read_bytes()).hexdigest()}
    (samples_dir / 'luz-de-casa-metadata.json').write_text(json.dumps(metadata, indent=2) + '\n')
    print(json.dumps({key: metadata[key] for key in ['title', 'duration', 'loopStart', 'loopEnd', 'sampleRate', 'channels', 'bitRate', 'finalLevels', 'bytes', 'sha256']}, indent=2))


if __name__ == '__main__':
    main()
