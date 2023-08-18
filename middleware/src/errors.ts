import type { ErrorMessageFxn } from 'paima-sdk/paima-utils';
import { buildErrorCodeTranslator } from 'paima-sdk/paima-utils';
import type { EndpointErrorFxn } from 'paima-sdk/paima-mw-core';
import {
  PaimaMiddlewareErrorCode,
  PAIMA_MIDDLEWARE_ERROR_MESSAGES,
  buildAbstractEndpointErrorFxn,
} from 'paima-sdk/paima-mw-core';

export const enum MiddlewareErrorCode {
  GENERIC_ERROR = PaimaMiddlewareErrorCode.FINAL_PAIMA_GENERIC_ERROR + 1,
  // Query endpoint related:
  CALCULATED_ROUND_END_IN_PAST,
  UNABLE_TO_BUILD_EXECUTOR,
  // Morze Code game
  GUESS_CONTAINS_WRONG_DATA,
}

type ErrorMessageMapping = Record<MiddlewareErrorCode, string>;
const MIDDLEWARE_ERROR_MESSAGES: ErrorMessageMapping = {
  [MiddlewareErrorCode.GENERIC_ERROR]: 'Unspecified generic Game error',
  [MiddlewareErrorCode.CALCULATED_ROUND_END_IN_PAST]: 'Calculated round end is in the past',
  [MiddlewareErrorCode.UNABLE_TO_BUILD_EXECUTOR]:
    'Unable to build executor from data returned from server -- executor might not exist',
  // Morze Code game
  [MiddlewareErrorCode.GUESS_CONTAINS_WRONG_DATA]:
    `Your guess contains symbol that does not relate to encoding`
};

const errorMessageFxn: ErrorMessageFxn = buildErrorCodeTranslator({
  ...PAIMA_MIDDLEWARE_ERROR_MESSAGES,
  ...MIDDLEWARE_ERROR_MESSAGES,
});

export function buildEndpointErrorFxn(endpointName: string): EndpointErrorFxn {
  return buildAbstractEndpointErrorFxn(errorMessageFxn, endpointName);
}
