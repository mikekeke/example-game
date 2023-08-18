import { builder } from 'paima-sdk/paima-concise';
import type { EndpointErrorFxn, OldResult, Result } from 'paima-sdk/paima-mw-core';
import {
  PaimaMiddlewareErrorCode,
  postConciselyEncodedData,
  getActiveAddress,
  postConciseData,
} from 'paima-sdk/paima-mw-core';

import { buildEndpointErrorFxn } from '../errors';

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

async function submitMoves(x: number, y: number): Promise<OldResult> {
  const errorFxn = buildEndpointErrorFxn('submitMoves');

  const query = getUserWallet(errorFxn);
  if (!query.success) return query;
  const userWalletAddress = query.result;

  const conciseBuilder = builder.initialize();
  conciseBuilder.setPrefix('m', true); // @m||x|y
  conciseBuilder.addValue({ value: String(x) });
  conciseBuilder.addValue({ value: String(y) });

  try {
    const result = await postConciselyEncodedData(conciseBuilder.build());
    if (result.success) {
      return { success: true, message: '' };
    } else {
      return errorFxn(PaimaMiddlewareErrorCode.ERROR_POSTING_TO_CHAIN);
    }
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.ERROR_POSTING_TO_CHAIN, err);
  }
}

async function submitIncrement(x: number, y: number): Promise<OldResult> {
  const errorFxn = buildEndpointErrorFxn('submitIncrement');

  const query = getUserWallet(errorFxn);
  if (!query.success) return query;
  // const userWalletAddress = query.result;

  const conciseBuilder = builder.initialize();
  conciseBuilder.setPrefix('i');
  conciseBuilder.addValue({ value: String(x), isStateIdentifier: true });
  conciseBuilder.addValue({ value: String(y), isStateIdentifier: true });

  try {
    const result = await postConciselyEncodedData(conciseBuilder.build());
    if (result.success) {
      return { success: true, message: '' };
    } else {
      return errorFxn(PaimaMiddlewareErrorCode.ERROR_POSTING_TO_CHAIN);
    }
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.ERROR_POSTING_TO_CHAIN, err);
  }
}

async function joinWorld(): Promise<OldResult> {
  const errorFxn = buildEndpointErrorFxn('joinWorld');

  const query = getUserWallet(errorFxn);
  if (!query.success) return query;

  const conciseBuilder = builder.initialize();
  conciseBuilder.setPrefix('j');
  try {
    const result = await postConciselyEncodedData(conciseBuilder.build());
    if (result.success) {
      return { success: true, message: '' };
    } else {
      return errorFxn(PaimaMiddlewareErrorCode.ERROR_POSTING_TO_CHAIN);
    }
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.ERROR_POSTING_TO_CHAIN, err);
  }
}

async function submitGuess(userAddress: string, symbols: string, guess: string) {
  //todo: validate input
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
  conciseBuilder.addValue({ value: String(guess) });

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
