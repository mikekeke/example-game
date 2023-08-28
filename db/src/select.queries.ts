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


/** 'GetSubmissions' parameters type */
export interface IGetSubmissionsParams {
  wallet_address: string | null | void;
}

/** 'GetSubmissions' return type */
export interface IGetSubmissionsResult {
  guess: string;
  is_success: boolean;
  submission_id: number;
  symbols: string;
  wallet_address: string;
}

/** 'GetSubmissions' query type */
export interface IGetSubmissionsQuery {
  params: IGetSubmissionsParams;
  result: IGetSubmissionsResult;
}

const getSubmissionsIR: any = {"usedParamSet":{"wallet_address":true},"params":[{"name":"wallet_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":63,"b":77}]}],"statement":"select \n*\nfrom submissions\nwhere \nsubmissions.wallet_address = :wallet_address"};

/**
 * Query generated from SQL:
 * ```
 * select 
 * *
 * from submissions
 * where 
 * submissions.wallet_address = :wallet_address
 * ```
 */
export const getSubmissions = new PreparedQuery<IGetSubmissionsParams,IGetSubmissionsResult>(getSubmissionsIR);


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


/** 'GetAchievementsByOwned' parameters type */
export interface IGetAchievementsByOwnedParams {
  nft_ids: readonly (string | null | void)[];
}

/** 'GetAchievementsByOwned' return type */
export interface IGetAchievementsByOwnedResult {
  contract_address: string;
  nft_id: string;
  record: string;
}

/** 'GetAchievementsByOwned' query type */
export interface IGetAchievementsByOwnedQuery {
  params: IGetAchievementsByOwnedParams;
  result: IGetAchievementsByOwnedResult;
}

const getAchievementsByOwnedIR: any = {"usedParamSet":{"nft_ids":true},"params":[{"name":"nft_ids","required":false,"transform":{"type":"array_spread"},"locs":[{"a":43,"b":50}]}],"statement":"select * from achievements\nwhere nft_id in :nft_ids\norder by nft_id"};

/**
 * Query generated from SQL:
 * ```
 * select * from achievements
 * where nft_id in :nft_ids
 * order by nft_id
 * ```
 */
export const getAchievementsByOwned = new PreparedQuery<IGetAchievementsByOwnedParams,IGetAchievementsByOwnedResult>(getAchievementsByOwnedIR);


/** 'WinsCount' parameters type */
export interface IWinsCountParams {
  wallet_address: string | null | void;
}

/** 'WinsCount' return type */
export interface IWinsCountResult {
  count: string | null;
}

/** 'WinsCount' query type */
export interface IWinsCountQuery {
  params: IWinsCountParams;
  result: IWinsCountResult;
}

const winsCountIR: any = {"usedParamSet":{"wallet_address":true},"params":[{"name":"wallet_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":56,"b":70}]}],"statement":"select count(*)\nfrom submissions\nwhere\nwallet_address = :wallet_address\nand is_success is TRUE"};

/**
 * Query generated from SQL:
 * ```
 * select count(*)
 * from submissions
 * where
 * wallet_address = :wallet_address
 * and is_success is TRUE
 * ```
 */
export const winsCount = new PreparedQuery<IWinsCountParams,IWinsCountResult>(winsCountIR);


