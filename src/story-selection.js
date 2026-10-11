import { BOOKS, generateStory } from './story-engine.js';

/** The history records plots, without retaining character names or story text. */
const BOOK_IDS = new Set(BOOKS.map(book => book.id));
const SUMMARY_FIELDS = ['bookId', 'goalId', 'obstacleId', 'strategyId', 'discoveryId', 'destinationId'];
const ID = /^[a-z0-9][a-z0-9-]{0,79}$/u;
const HISTORY_PER_BOOK = 8;
const RECENT_GOALS = 3;
const MAX_ATTEMPTS = 20;

function normalizeSummary(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const summary = {};
  try {
    for (const field of SUMMARY_FIELDS) {
      // Stored JSON has data properties; reject getters and inherited fields.
      const raw = Object.getOwnPropertyDescriptor(value, field)?.value;
      if (typeof raw !== 'string') return null;
      const id = raw.trim();
      if (!ID.test(id)) return null;
      summary[field] = id;
    }
    // Older histories have no structure; newer ones remember it to vary the shape of the next story.
    const structure = Object.getOwnPropertyDescriptor(value, 'structureId')?.value;
    if (typeof structure === 'string' && ID.test(structure.trim())) summary.structureId = structure.trim();
  } catch {
    return null;
  }
  return BOOK_IDS.has(summary.bookId) ? summary : null;
}

/** Accept parsed storage or JSON; return a fresh array ordered oldest to newest. */
export function normalizeStoryHistory(value) {
  if (typeof value === 'string') {
    try { value = JSON.parse(value); } catch { return []; }
  }
  if (!Array.isArray(value)) return [];
  const kept = [];
  const counts = new Map();
  for (let index = value.length - 1; index >= 0; index--) {
    const summary = normalizeSummary(value[index]);
    if (!summary || (counts.get(summary.bookId) || 0) >= HISTORY_PER_BOOK) continue;
    kept.push(summary);
    counts.set(summary.bookId, (counts.get(summary.bookId) || 0) + 1);
    if (kept.length === BOOK_IDS.size * HISTORY_PER_BOOK) break;
  }
  return kept.reverse();
}

function summarizeStory(story) {
  if (!story || typeof story !== 'object') return null;
  const blocks = story.plan?.blockIds;
  return normalizeSummary({
    bookId: story.bookId,
    goalId: blocks?.goal ?? story.questId,
    obstacleId: blocks?.obstacle ?? story.variantId,
    strategyId: blocks?.strategy,
    discoveryId: blocks?.discovery,
    destinationId: story.plan?.world?.destination ?? story.place?.id,
    ...(story.plan?.structure ? { structureId: story.plan.structure } : {}),
  });
}

/** Remember an accepted new story; restoring a saved story need not call this. */
export function rememberStory(history, story) {
  const normalized = normalizeStoryHistory(history);
  const summary = summarizeStory(story);
  return summary ? normalizeStoryHistory([...normalized, summary]) : normalized;
}

const sameBlocks = (left, right) => ['goalId', 'obstacleId', 'strategyId', 'discoveryId']
  .every(field => left[field] === right[field]);

function repetition(summary, recent) {
  return {
    recentGoal: recent.slice(-RECENT_GOALS).some(previous => previous.goalId === summary.goalId),
    recentBlocks: recent.some(previous => sameBlocks(summary, previous)),
    recentStructure: Boolean(summary.structureId) && recent.at(-1)?.structureId === summary.structureId,
  };
}

function similarity(summary, recent, repeated) {
  // Keep the main objective more important than secondary or cosmetic choices.
  let score = Number(repeated.recentGoal) * 1000 + Number(repeated.recentBlocks) * 100 + Number(repeated.recentStructure) * 50;
  let weightedMatches = 0;
  let totalWeight = 0;
  const fields = [['goalId', 12], ['obstacleId', 6], ['strategyId', 3], ['discoveryId', 3], ['destinationId', 1]];
  recent.forEach((previous, index) => {
    const recency = index + 1;
    totalWeight += recency;
    for (const [field, weight] of fields) {
      if (summary[field] === previous[field]) weightedMatches += weight * recency;
    }
  });
  if (totalWeight) score += weightedMatches / totalWeight;
  return score;
}

/**
 * Choose a new plot from fresh seeds. Reproducible generation by explicit seed
 * remains in generateStory; the history only selects which new story to accept.
 */
export function generateFreshStory(bookId, duration = 3, options = {}, history = [], generator = generateStory) {
  if (!BOOK_IDS.has(bookId)) throw new RangeError(`Unknown book: ${bookId}`);
  const minutes = Number(duration);
  if (![3, 6, 9].includes(minutes)) throw new RangeError('Choose a reading duration of 3, 6 or 9 minutes.');
  if (typeof generator !== 'function') throw new TypeError('A story generator must be a function.');
  const recent = normalizeStoryHistory(history).filter(summary => summary.bookId === bookId);
  let best;
  let bestScore = Infinity;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const story = generator(bookId, minutes, undefined, options);
    const summary = summarizeStory(story);
    if (!summary || summary.bookId !== bookId) {
      throw new TypeError('The story generator must return a complete plan for the requested book.');
    }
    const repeated = repetition(summary, recent);
    if (!repeated.recentGoal && !repeated.recentBlocks && !repeated.recentStructure) return story;
    const score = similarity(summary, recent, repeated);
    if (score < bestScore) {
      best = story;
      bestScore = score;
    }
  }
  // A small catalogue or constrained generator can repeat without trapping the reader.
  return best;
}
