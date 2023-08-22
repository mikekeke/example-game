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


/** 'SubmissionData' parameters type */
export interface ISubmissionDataParams {
  wallet_address: string | null | void;
}

/** 'SubmissionData' return type */
export interface ISubmissionDataResult {
  submission_id: number;
  symbols: string;
}

/** 'SubmissionData' query type */
export interface ISubmissionDataQuery {
  params: ISubmissionDataParams;
  result: ISubmissionDataResult;
}

const submissionDataIR: any = {"usedParamSet":{"wallet_address":true},"params":[{"name":"wallet_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":111,"b":125}]}],"statement":"select \n  submissions.submission_id,\n  submissions.symbols\nfrom submissions\nwhere\nsubmissions.wallet_address = :wallet_address\norder by (submission_id) desc"};

/**
 * Query generated from SQL:
 * ```
 * select 
 *   submissions.submission_id,
 *   submissions.symbols
 * from submissions
 * where
 * submissions.wallet_address = :wallet_address
 * order by (submission_id) desc
 * ```
 */
export const submissionData = new PreparedQuery<ISubmissionDataParams,ISubmissionDataResult>(submissionDataIR);


