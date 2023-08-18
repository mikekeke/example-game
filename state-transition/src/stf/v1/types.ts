import { WalletAddress } from "paima-sdk/paima-utils";

export type ParsedSubmittedInput =
  | InvalidInput
  | SubmitGuess
  // | SubmitMoveInput
  // | SubmitIncrementInput
  // | JoinWorldInput;

export interface SubmitGuess {
  input: 'submitGuess';
  address:WalletAddress;
  symbols: string;
  guess: string;
}
export interface InvalidInput {
  input: 'invalidString';
}

// export interface JoinWorldInput {
//   input: 'joinWorld';
// }

// export interface SubmitMoveInput {
//   input: 'submitMove';
//   x: number;
//   y: number;
// }
// export interface SubmitIncrementInput {
//   input: 'submitIncrement';
//   x: number;
//   y: number;
// }
