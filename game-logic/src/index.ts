import type { RoundExecutor } from 'paima-sdk/paima-executors';
import { roundExecutor } from 'paima-sdk/paima-executors';
import type Prando from 'paima-sdk/paima-prando';
import type { MatchState, MatchEnvironment, TickEvent, MatchMove } from './types';
import { processTick } from './tick';
import type { IGetSubmissionResult } from '@game/db';

export * from './types';
export * from './tick';

// Paima docs:
// We initialize the round executor object using lobby data + submitted moves + randomness generator.
// This function extracts the match environment and match state from the lobby.
// and the openworld `processTick` function
export function initRoundExecutor(
  userMove: MatchMove,
  randomnessGenerator: Prando
): RoundExecutor<MatchState, TickEvent> {
  return roundExecutor.initialize(
    extractMatchEnvironment(),
    buildMatchState(userMove),
    [userMove],
    randomnessGenerator,
    processTick
  );
}

// Paima docs:
// A match environment is a piece of immutable data about the match which is
// relevant to the round executor, but which can not be updated.
export function extractMatchEnvironment(): MatchEnvironment {
  return {};
}

// Paima docs:
// From a given round, construct the match state which will be used by the round executor.
// A match state is comprised of mutable data which the round executor will
// update, and in the end return a final new match state upon completion.
export function buildMatchState(userMove: MatchMove): MatchState {
  const initMatchState = {
    isGoodSoFar: true,
    symbolsLeft: userMove.symbols,
    codesLeft: userMove.codes
  }
  console.log("Init match state", JSON.stringify(initMatchState));
  return initMatchState;
};
