import { SQLUpdate } from "paima-sdk/paima-db";
import { AchievementNftMint } from "./types";
import {
  IInitAchievementsParams,
  IGetAchievementsByOwnedResult,
  initAchievements,
  winsCount,
  getSubmissions,
  updateAchievements,
  getAchievements,
  IUpdateAchievementsParams
} from "@game/db";
import type { Pool } from 'pg';
import { MatchState } from "@game/game-logic";
import { AchievementsRecord } from "@game/utils";
import { getNftOwner } from "paima-sdk/paima-utils-backend";

export function initAchievementsQuery(
  input: AchievementNftMint,
  gamesPlayed: number
): SQLUpdate[] {

  const record: AchievementsRecord = { gamesPlayed: gamesPlayed };
  const initParams: IInitAchievementsParams = {
    contract_address: input.address,
    nft_id: input.tokenId,
    record: JSON.stringify(record)
  };

  console.log("Init AchNFT", initParams);

  return [
    [initAchievements, initParams],
  ];
}

export async function updateAchievementsRecord(
  walletAddress: string,
  currentSubmissionState: MatchState,
  dbConn: Pool
): Promise<SQLUpdate[]> {

  const achievementsResult = await getAchievements(walletAddress, dbConn);
  if (!achievementsResult) {
    console.log(`Achievements are not enabled for the user ${walletAddress}`);
    return []
  };

  console.log(`Updating achievements for the user ${walletAddress}`);
  const achievements = achievementsResult as IGetAchievementsByOwnedResult;

  const achievementsRecord = tryParseRecord(achievements.record);
  if (!achievementsRecord) {
    return [];
  }
  const newRecord: AchievementsRecord = {
    gamesPlayed: 1 + achievementsRecord.gamesPlayed
  };
  const updateParams: IUpdateAchievementsParams = {
    nft_id: achievements.nft_id,
    record: JSON.stringify(newRecord)
  };

  console.log("queried achievementsRecord", achievementsRecord)
  console.log("updateParams", updateParams)

  return [[updateAchievements, updateParams]]
}

function tryParseRecord(record: string): AchievementsRecord | null {
  try {
    return JSON.parse(record);
  } catch (e) {
    console.error("Error parsing AchievementsRecord:", e);
    return null;
  }
}
