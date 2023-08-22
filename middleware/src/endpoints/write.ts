import { builder } from 'paima-sdk/paima-concise';
import type { EndpointErrorFxn, OldResult, Result } from 'paima-sdk/paima-mw-core';
import {
  PaimaMiddlewareErrorCode,
  postConciselyEncodedData,
  getActiveAddress,
  postConciseData,
} from 'paima-sdk/paima-mw-core';

import { buildEndpointErrorFxn } from '../errors';
import { toOnChainRepr } from '@game/utils';

const getUserWallet = (errorFxn: EndpointErrorFxn): Result<string> => {
  try {
    const wallet = getActiveAddress();
    if (wallet.length === 0) {
      return errorFxn(PaimaMiddlewareErrorCode.WALLET_NOT_CONNECTED);
    }
    return { result: wallet, success: true };
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.INTERNAL_INVALID_POSTING_MODE, err);
  }
};

async function submitGuess(userAddress: string, symbols: string, guess: string) {
  //todo: validate input

  // throw new Error("debug");

  const address =
    userAddress.startsWith("0x")
      ? userAddress.slice(2, userAddress.length)
      : userAddress;
  console.log("before", userAddress, "after", address);
  const conciseBuilder = builder.initialize();
  conciseBuilder.setPrefix('s');
  // Address of user wallet will have sequence state identifier,
  // so all user submissions will be processed via FIFO queue
  conciseBuilder.addValue({ value: String(address), isStateIdentifier: true });
  conciseBuilder.addValue({ value: String(symbols) });
  conciseBuilder.addValue({ value: String(toOnChainRepr(guess)) });

  const errorFxn = buildEndpointErrorFxn('submitGuess');
  const result = postConciseData(conciseBuilder.build(), errorFxn);
  return result;
}

export const writeEndpoints = {
  submitGuess,
  // joinWorld,
  // submitMoves,
  // submitIncrement,
};
