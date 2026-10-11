#!/usr/bin/env python3
"""Render De tu lado, an original piano conversation for Cuentacuentos.

Requires numpy, scipy and FFmpeg. Reuses the recorded Salamander Grand Piano
source and tuning from render-relax-music.py, leaving that score and master intact.
No oscillators, stock melody, ukulele, percussion or synthesizer layers are used.
"""
from pathlib import Path
from urllib.parse import quote
from urllib.request import urlopen
import argparse
import hashlib
import importlib.util
import json
import re
import subprocess
import sys
import tempfile

import numpy as np
from scipy.signal import resample_poly

sys.dont_write_bytecode = True
SAMPLER_FILE = Path(__file__).with_name('render-relax-music.py')
spec = importlib.util.spec_from_file_location('cuentacuentos_acoustic_piano_source', SAMPLER_FILE)
sampler = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sampler)

RATE = 32000
DURATION = 96.0
TEMPO = 80

# Two slow bars per phrase. The upper voice asks, then a lower phrase answers.
# Different endings and rests make a conversation, rather than a repeating jingle.
# Phrase: harmony, occasional quiet support note, question, answer, timing shape.
SCORE = [
    ('D', 50, [62, 66, 64], [66, 62], 0),
    ('Bm/F#', None, [62, 59, 66], [64, 62, 59], 1),
    ('G', 55, [67, 66, 62], [59, 62], 2),
    ('Aadd9', None, [64, 61, 59], [62, 61], 3),
    ('D/A', 57, [69, 66, 64], [62, 57], 1),
    ('Bm', None, [66, 62, 59], [64, 66], 2),
    ('G', 55, [62, 67, 66], [64, 62], 0),
    ('Aadd9', None, [61, 64], [59, 61, 57], 3),
    ('D/F#', 54, [66, 64, 62], [57, 62], 2),
    ('Bm', None, [59, 62], [66, 64, 62], 0),
    ('G/D', 50, [67, 62, 59], [62, 64], 1),
    ('Aadd9', None, [64, 66, 64], [61, 59], 3),
    ('D', 50, [62, 66], [64, 62, 57], 0),
    ('G', None, [59, 62, 67], [66, 62], 1),
    ('D/A', 57, [66, 64, 62], [64, 66], 2),
    ('Aadd9', None, [61, 64], [62, 61, 59], 3),
]
QUESTION_TIMES = [[.63, 1.26, 2.14], [.76, 1.63, 2.28], [.53, 1.37, 2.19], [.81, 1.48, 2.34]]
ANSWER_TIMES = [[3.48, 4.44, 5.16], [3.57, 4.23, 5.12], [3.71, 4.66, 5.22], [3.61, 4.34, 5.28]]


def run(*args, **kwargs):
    return subprocess.run(*args, check=True, **kwargs)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--samples-dir', type=Path, default=Path(tempfile.gettempdir()) / 'cuentacuentos-piano-samples')
    parser.add_argument('--output', type=Path, default=Path(__file__).resolve().parents[1] / 'public/audio/music-friends-original.mp3')
    args = parser.parse_args()
    args.samples_dir.mkdir(parents=True, exist_ok=True)
    sources = []
    recordings = {}
    for note in sampler.SAMPLE_NOTES:
        for layer in [1, 2]:
            relative = f'Samples/{note}v{layer}.flac'
            path = args.samples_dir / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            if not path.exists():
                path.write_bytes(urlopen(sampler.SOURCE + quote(relative), timeout=30).read())
            raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', str(path), '-ar', str(RATE), '-ac', '2', '-f', 'f32le', 'pipe:1'])
            recordings[(note, layer)] = np.frombuffer(raw, dtype='<f4').reshape(-1, 2).copy()
            sources.append({'sample': relative, 'url': sampler.SOURCE + quote(relative), 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})

    rng = np.random.default_rng(24101180)
    length = round(DURATION * RATE)
    mix = np.zeros((length, 2), dtype=np.float64)
    events = []
    pitched = {}

    def strike(when, midi, amplitude, layer, hold, release, voice, harmony):
        source_note = min(sampler.SAMPLE_NOTES, key=lambda note: abs(sampler.SAMPLE_NOTES[note] - midi))
        semitones = midi - sampler.SAMPLE_NOTES[source_note]
        assert abs(semitones) <= 1
        key = (source_note, layer, midi)
        if key not in pitched:
            ratio = 2 ** ((semitones + sampler.TUNING_CENTS[source_note] / 100) / 12)
            pitched[key] = resample_poly(recordings[(source_note, layer)], 100000, round(100000 * ratio), axis=0)
        note = pitched[key][:round((hold + release) * RATE)].copy()
        release_start = min(round(hold * RATE), len(note))
        if release_start < len(note):
            phase = np.linspace(0, np.pi / 2, len(note) - release_start)
            note[release_start:] *= (np.cos(phase) ** 2)[:, None]
        attack = min(round(.001 * RATE), len(note))
        note[:attack] *= np.linspace(0, 1, attack)[:, None]
        amplitude *= 10 ** (rng.uniform(-.65, .50) / 20)
        note *= amplitude
        when += rng.uniform(-.025, .025)
        begin = round(when * RATE)
        mix[(begin + np.arange(len(note))) % length] += note
        events.append({'time': round(float(when), 4), 'midi': midi, 'voice': voice, 'harmony': harmony, 'sample': f'{source_note}v{layer}.flac', 'gain': round(float(amplitude), 5), 'hold': hold, 'release': release})

    for index, (harmony, support, question, answer, shape) in enumerate(SCORE):
        start = index * 6.0
        if support is not None:
            strike(start + .22, support, .24, 1 if index % 4 else 2, 2.7, 1.7, 'support', harmony)
        for turn, (notes, times) in enumerate([(question, QUESTION_TIMES[shape]), (answer, ANSWER_TIMES[shape])]):
            for offset, midi in enumerate(notes):
                # Questions have a little lift; answers soften and settle differently.
                layer = 2 if (index + offset + turn) % 3 == 0 else 1
                gain = (.37 if turn == 0 else .32) * (1.0 if offset == 0 else .88)
                hold = 1.0 if turn == 0 else 1.18
                release = 1.75
                if index == len(SCORE) - 1 and turn == 1:
                    hold, release = 2.0, 2.8
                strike(start + times[offset], midi, gain, layer, hold, release, 'question' if turn == 0 else 'answer', harmony)

    intermediate = args.samples_dir / 'de-tu-lado-loop.wav'
    run(['ffmpeg', '-y', '-v', 'error', '-f', 'f32le', '-ar', str(RATE), '-ac', '2', '-i', 'pipe:0', '-c:a', 'pcm_f32le', str(intermediate)], input=mix.astype('<f4').tobytes())
    analysis = run(['ffmpeg', '-hide_banner', '-i', str(intermediate), '-af', 'loudnorm=I=-24.5:TP=-8:LRA=12:print_format=json', '-f', 'null', '-'], capture_output=True, text=True)
    measured = json.loads(re.findall(r'\{\s*"input_i"[\s\S]*?\}', analysis.stderr)[-1])
    normalizer = 'loudnorm=I=-24.5:TP=-8:LRA=12:measured_I={input_i}:measured_TP={input_tp}:measured_LRA={input_lra}:measured_thresh={input_thresh}:offset={target_offset}:linear=true'.format(**measured)
    guarded = normalizer + f',afade=t=in:st=0:d=0.008:curve=hsin,afade=t=out:st={DURATION - .008:.3f}:d=0.008:curve=hsin'
    args.output.parent.mkdir(parents=True, exist_ok=True)
    run(['ffmpeg', '-y', '-v', 'error', '-i', str(intermediate), '-af', guarded, '-ar', str(RATE), '-ac', '2', '-c:a', 'libmp3lame', '-b:a', '160k', '-map_metadata', '-1', str(args.output)])
    final = run(['ffmpeg', '-hide_banner', '-i', str(args.output), '-af', 'loudnorm=I=-24.5:TP=-8:LRA=12:print_format=json', '-f', 'null', '-'], capture_output=True, text=True)
    levels = json.loads(re.findall(r'\{\s*"input_i"[\s\S]*?\}', final.stderr)[-1])
    metadata = {'title': 'De tu lado', 'composition': 'Original para Cuentacuentos', 'samples': 'Salamander Grand Piano V3 — Alexander Holm', 'sampleLicense': 'CC BY 3.0', 'sourceCommit': sampler.COMMIT, 'tempo': TEMPO, 'duration': DURATION, 'loopStart': 0, 'loopEnd': DURATION, 'sampleRate': RATE, 'channels': 2, 'bitRate': 160000, 'events': events, 'sources': sources, 'finalLevels': levels, 'bytes': args.output.stat().st_size, 'sha256': hashlib.sha256(args.output.read_bytes()).hexdigest()}
    (args.samples_dir / 'de-tu-lado-metadata.json').write_text(json.dumps(metadata, indent=2) + '\n')
    print(json.dumps({key: metadata[key] for key in ['title', 'tempo', 'duration', 'loopStart', 'loopEnd', 'sampleRate', 'channels', 'bitRate', 'finalLevels', 'bytes', 'sha256']}, indent=2))
    print(f'Note events: {len(events)}')


if __name__ == '__main__':
    main()
