import type { RoundExecutor, MatchExecutor } from 'paima-sdk/paima-executors';

export type { RoundExecutor, MatchExecutor };

export function normalizeAddress(walletAddress: string): string {
  return walletAddress.startsWith("0x")
    ? walletAddress.slice(2, walletAddress.length)
    : walletAddress;
}
