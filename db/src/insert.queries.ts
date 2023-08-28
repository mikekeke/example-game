/** Types generated for queries found in "src/queries/insert.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'InsertSubmission' parameters type */
export interface IInsertSubmissionParams {
  guess: string;
  is_success: boolean;
  symbols: string;
  wallet_address: string;
}

/** 'InsertSubmission' return type */
export type IInsertSubmissionResult = void;

/** 'InsertSubmission' query type */
export interface IInsertSubmissionQuery {
  params: IInsertSubmissionParams;
  result: IInsertSubmissionResult;
}

const insertSubmissionIR: any = {"usedParamSet":{"wallet_address":true,"symbols":true,"guess":true,"is_success":true},"params":[{"name":"wallet_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":90,"b":105}]},{"name":"symbols","required":true,"transform":{"type":"scalar"},"locs":[{"a":110,"b":118}]},{"name":"guess","required":true,"transform":{"type":"scalar"},"locs":[{"a":123,"b":129}]},{"name":"is_success","required":true,"transform":{"type":"scalar"},"locs":[{"a":134,"b":145}]}],"statement":"INSERT INTO submissions (\n  wallet_address,\n  symbols,\n  guess,\n  is_success\n) VALUES (\n  :wallet_address!,\n  :symbols!,\n  :guess!,\n  :is_success!\n)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO submissions (
 *   wallet_address,
 *   symbols,
 *   guess,
 *   is_success
 * ) VALUES (
 *   :wallet_address!,
 *   :symbols!,
 *   :guess!,
 *   :is_success!
 * )
 * ```
 */
export const insertSubmission = new PreparedQuery<IInsertSubmissionParams,IInsertSubmissionResult>(insertSubmissionIR);


/** 'InitAchievements' parameters type */
export interface IInitAchievementsParams {
  contract_address: string;
  nft_id: string;
  record: string;
}

/** 'InitAchievements' return type */
export type IInitAchievementsResult = void;

/** 'InitAchievements' query type */
export interface IInitAchievementsQuery {
  params: IInitAchievementsParams;
  result: IInitAchievementsResult;
}

const initAchievementsIR: any = {"usedParamSet":{"contract_address":true,"nft_id":true,"record":true},"params":[{"name":"contract_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":79,"b":96}]},{"name":"nft_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":101,"b":108}]},{"name":"record","required":true,"transform":{"type":"scalar"},"locs":[{"a":113,"b":120}]}],"statement":"INSERT INTO achievements (\n  contract_address,\n  nft_id,\n  record\n) VALUES (\n  :contract_address!,\n  :nft_id!,\n  :record!\n)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO achievements (
 *   contract_address,
 *   nft_id,
 *   record
 * ) VALUES (
 *   :contract_address!,
 *   :nft_id!,
 *   :record!
 * )
 * ```
 */
export const initAchievements = new PreparedQuery<IInitAchievementsParams,IInitAchievementsResult>(initAchievementsIR);


