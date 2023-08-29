import { builder } from 'paima-sdk/paima-concise';
import {
  postConciseData,
} from 'paima-sdk/paima-mw-core';

import { buildEndpointErrorFxn } from '../errors';
import { toOnChainRepr } from '@game/utils';

async function submitGuess(userAddress: string, symbols: string, guess: string) {
  const conciseBuilder = builder.initialize();
  conciseBuilder.setPrefix('s');
  // Address of user wallet will have sequence state identifier,
  // so all user submissions will be processed via FIFO queue
  conciseBuilder.addValue({ value: String(userAddress), isStateIdentifier: true });
  conciseBuilder.addValue({ value: String(symbols) });
  conciseBuilder.addValue({ value: String(toOnChainRepr(guess)) });

  const errorFxn = buildEndpointErrorFxn('submitGuess');
  const result = postConciseData(conciseBuilder.build(), errorFxn);
  return result;
}

export const writeEndpoints = {
  submitGuess,
};
