import type Prando from 'paima-sdk/paima-prando';
import { type MatchState, type MatchEnvironment, TickEvent, type MatchMove, getNextPair } from './types';
import { matchesCoding } from './morze';

// Paima docs:
// Executes a round executor tick and generates a tick event as a result

/* MLabs docs:
   To check results of Morze code submission, each character is compared against
   corresponding code. Each such comparison is one tick.
   When next character or code can not be found in queue, then no more  events are
   emitted and round is considered finished.
*/
export function processTick(
  _matchEnvironment: MatchEnvironment, // No environment is needed for the current game.
  matchState: MatchState,
  moves: MatchMove[],
  _currentTick: number,
  __: Prando // No randomness source is needed for the current game.
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

  /* Following Paima examples here: changing match state by going through generated events.
     But this is "best practice" seems like, as nothing can stop you from mutating the state
     in arbitrary way anywhere inside the `processTick`
  */
  applyEvents(matchState, te);
  return [te];
}

// Paima docs:
// Apply events to match state for the roundExecutor.
// eslint-disable-next-line @typescript-eslint/no-empty-function
function applyEvents(matchState: MatchState, event: TickEvent): void {
  matchState.symbolsLeft = matchState.symbolsLeft.slice(1, matchState.symbolsLeft.length);
  matchState.codesLeft = matchState.codesLeft.slice(1, matchState.codesLeft.length);

  /* We can detect difference in arrays lengths right away and mark result as bad ASAP,
     but doing it this way, round executor will go through each awaitable pair to compare and
     we can play nicer animation in the game UI
  */
  const p1 = (matchState.codesLeft.length !== 0 && matchState.symbolsLeft.length !== 0)
  && (matchState.symbolsLeft.length !== 0 && matchState.codesLeft.length !== 0);

  const p2 = matchState.codesLeft.length === 0 
            && matchState.symbolsLeft.length === 0;
  matchState.isGoodSoFar =
    (p1 || p2)
    && event.isCorrect;
}
