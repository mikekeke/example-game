import { SQLUpdate } from "paima-sdk/paima-db";
import { AchievementNftMint } from "./types";
import { IInitAchievementsParams, IGetAchievementsByOwnedResult, initAchievements, winsCount } from "@game/db";
import type { Pool } from 'pg';
import { Achievements } from "@game/utils";

export function initAchievementsQuery(input: AchievementNftMint): SQLUpdate {
  const params: IInitAchievementsParams = {
    contract_address: input.address,
    nft_id: input.tokenId
  };
  return [initAchievements, params];
}

export async function updateAchievements(
  achResult: Achievements,
  walletAddress: string,
  dbConn: Pool
): Promise<SQLUpdate[]> {

  console.log("updateAchievements:address", walletAddress);
  console.log("updateAchievements:achResult", achResult);

  const [wins] = await winsCount.run(
    { wallet_address: walletAddress },
    dbConn
  );
  if (wins.count) {
    console.log("wins", BigInt(wins.count))
  }

  return []
}