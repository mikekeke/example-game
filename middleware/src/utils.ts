import type { RoundExecutor, MatchExecutor } from 'paima-sdk/paima-executors';
import type { Hash } from 'paima-sdk/paima-utils';

export type { RoundExecutor, MatchExecutor };


export function normalizeAddress(walletAddress: string): string {
  return walletAddress.startsWith("0x")
    ? walletAddress.slice(2, walletAddress.length)
    : walletAddress;
}