/** Types generated for queries found in "src/queries/select.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetSubmission' parameters type */
export interface IGetSubmissionParams {
  address: string | null | void;
}

/** 'GetSubmission' return type */
export interface IGetSubmissionResult {
  guess: string;
  is_success: boolean;
  symbols: string;
  user_address: string;
}

/** 'GetSubmission' query type */
export interface IGetSubmissionQuery {
  params: IGetSubmissionParams;
  result: IGetSubmissionResult;
}

const getSubmissionIR: any = {"usedParamSet":{"address":true},"params":[{"name":"address","required":false,"transform":{"type":"scalar"},"locs":[{"a":147,"b":154}]}],"statement":"select \nsubmissions.user_address,\nsubmissions.symbols,\nsubmissions.guess,\nsubmissions.is_success\nfrom submissions\nwhere submissions.user_address = :address"};

/**
 * Query generated from SQL:
 * ```
 * select 
 * submissions.user_address,
 * submissions.symbols,
 * submissions.guess,
 * submissions.is_success
 * from submissions
 * where submissions.user_address = :address
 * ```
 */
export const getSubmission = new PreparedQuery<IGetSubmissionParams,IGetSubmissionResult>(getSubmissionIR);


