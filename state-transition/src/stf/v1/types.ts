import { ContractAddress, WalletAddress } from "paima-sdk/paima-utils";

export type ParsedSubmittedInput =
  | InvalidInput
  | SubmitGuess
  | AchievementNftMint

export interface SubmitGuess {
  input: 'submitGuess';
  address: WalletAddress;
  symbols: string;
  guess: string;
}
export interface InvalidInput {
  input: 'invalidString';
}

// Stateful NFT scheduled input
// template taken from https://github.com/PaimaStudios/paima-game-templates/blob/main/nft-lvlup/state-transition/src/stf/v1/types.ts
export interface ScheduledDataInput {
  input: 'scheduledData';
}

export interface AchievementNftMint extends ScheduledDataInput {
  effect: 'achievementNftMint';
  tokenId: string;
  address: ContractAddress;
  type: NftType;
}

// Only one type here - all achievements are stored under single stateful NFT
export const achievementTypes = ['achievement'] as const;
export type NftType = typeof achievementTypes[number];

export function isAchievementNft(input: ScheduledDataInput): input is AchievementNftMint {
  return (input as AchievementNftMint).effect === 'achievementNftMint';
}
