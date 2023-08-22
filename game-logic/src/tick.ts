import type Prando from 'paima-sdk/paima-prando';
import { type MatchState, type MatchEnvironment, TickEvent, type MatchMove, getNextPair } from './types';
import { matchesCoding } from './morze';

// Executes a round executor tick and generates a tick event as a result
export function processTick(
  _matchEnvironment: MatchEnvironment,
  matchState: MatchState,
  moves: MatchMove[],
  _currentTick: number,
  __: Prando
): TickEvent[] | null {

  if (moves.length != 1) {
    console.warn("Wrong user moves: ", moves);
    return null;
  }
  if (!matchState.isGoodSoFar) return null;
  const next = getNextPair(matchState);
  if (!next) return null;
  const [symbol, code] = next;

  let te: TickEvent;
  if (matchesCoding(symbol, code)) {
    te = TickEvent.new(true, symbol, code);

  } else {
    te = TickEvent.new(false, symbol, code);
  }
  applyEvents(matchState, te);
  return [te];
}

// Apply events to match state for the roundExecutor.
// eslint-disable-next-line @typescript-eslint/no-empty-function
function applyEvents(matchState: MatchState, event: TickEvent): void {
  matchState.isGoodSoFar =
    (matchState.codesLeft.length === matchState.symbolsLeft.length)
    && event.isCorrect;
  matchState.symbolsLeft = matchState.symbolsLeft.slice(1, matchState.symbolsLeft.length);
  matchState.codesLeft = matchState.codesLeft.slice(1, matchState.codesLeft.length);
}
