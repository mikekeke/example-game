/** Types generated for queries found in "src/queries/select.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetSubmission' parameters type */
export interface IGetSubmissionParams {
  submission_id: number | null | void;
  wallet_address: string | null | void;
}

/** 'GetSubmission' return type */
export interface IGetSubmissionResult {
  guess: string;
  is_success: boolean;
  submission_id: number;
  symbols: string;
  wallet_address: string;
}

/** 'GetSubmission' query type */
export interface IGetSubmissionQuery {
  params: IGetSubmissionParams;
  result: IGetSubmissionResult;
}

const getSubmissionIR: any = {"usedParamSet":{"wallet_address":true,"submission_id":true},"params":[{"name":"wallet_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":63,"b":77}]},{"name":"submission_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":111,"b":124}]}],"statement":"select \n*\nfrom submissions\nwhere \nsubmissions.wallet_address = :wallet_address\nand submissions.submission_id = :submission_id"};

/**
 * Query generated from SQL:
 * ```
 * select 
 * *
 * from submissions
 * where 
 * submissions.wallet_address = :wallet_address
 * and submissions.submission_id = :submission_id
 * ```
 */
export const getSubmission = new PreparedQuery<IGetSubmissionParams,IGetSubmissionResult>(getSubmissionIR);


/** 'GetSubmissionIds' parameters type */
export interface IGetSubmissionIdsParams {
  wallet_address: string | null | void;
}

/** 'GetSubmissionIds' return type */
export interface IGetSubmissionIdsResult {
  submission_id: number;
}

/** 'GetSubmissionIds' query type */
export interface IGetSubmissionIdsQuery {
  params: IGetSubmissionIdsParams;
  result: IGetSubmissionIdsResult;
}

const getSubmissionIdsIR: any = {"usedParamSet":{"wallet_address":true},"params":[{"name":"wallet_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":85,"b":99}]}],"statement":"select submissions.submission_id\nfrom submissions\nwhere\nsubmissions.wallet_address = :wallet_address\norder by (submission_id) desc"};

/**
 * Query generated from SQL:
 * ```
 * select submissions.submission_id
 * from submissions
 * where
 * submissions.wallet_address = :wallet_address
 * order by (submission_id) desc
 * ```
 */
export const getSubmissionIds = new PreparedQuery<IGetSubmissionIdsParams,IGetSubmissionIdsResult>(getSubmissionIdsIR);


