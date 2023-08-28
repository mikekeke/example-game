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
  IUpdateAchievementsParams,
  IGetSubmissionsResult
} from "@game/db";
import type { Pool } from 'pg';
import { MatchState } from "@game/game-logic";
import { AchievementsRecord } from "@game/utils";
import { getNftOwner } from "paima-sdk/paima-utils-backend";

export async function initAchievementsQuery(
  input: AchievementNftMint,
  walletAddress: string,
  dbConn: Pool
): Promise<SQLUpdate[]> {

  const submissions = await getSubmissions.run(
    { wallet_address: walletAddress },
    dbConn
  );

  const record: AchievementsRecord =
  {
    gamesPlayed: submissions.length,
    winStreak: longestWinStreak(submissions.map(s => s.is_success))
  };

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
    console.error("Could not prase achievements record received from DB", achievements);
    return [];
  }

  const outcomes = await getSubmissions.run(
    { wallet_address: walletAddress },
    dbConn
  ).then(r => r.map(s => s.is_success));
  console.log("before push", outcomes);
  outcomes.push(currentSubmissionState.isGoodSoFar);
  console.log("after push", outcomes);

  let winStreak = longestWinStreak(outcomes);
  console.log("winStreak", winStreak)


  const newRecord: AchievementsRecord = {
    gamesPlayed: 1 + achievementsRecord.gamesPlayed,
    winStreak: winStreak
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

function longestWinStreak(outcomes: boolean[]): number {
  let maxStreak = 0;
  let currentStreak = 0;
  outcomes.forEach(is_success => {
    currentStreak = is_success ? currentStreak + 1 : 0;
    maxStreak = Math.max(maxStreak, currentStreak);
  })
  return maxStreak;
}
