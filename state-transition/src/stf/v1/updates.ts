import { SQLUpdate } from "paima-sdk/paima-db";
import { AchievementNftMint } from "./types";
import {
  IInitAchievementsParams,
  IGetAchievementsByOwnedResult,
  initAchievements,
  getSubmissions,
  updateAchievements,
  getAchievements,
  IUpdateAchievementsParams,
  IGetSubmissionsResult,
} from "@game/db";
import type { Pool } from 'pg';
import { MatchState } from "@game/game-logic";
import { ACHIEVEMENTS_CDE, AchievementsRecord } from "@game/utils";
import { getNftOwner } from "paima-sdk/paima-utils-backend";

//Helper functions for building state transition SQL statements


// Generate statements to persist state of the
// newly minted stateful achievements NFT
export async function initAchievement(
  input: AchievementNftMint,
  dbConn: Pool
): Promise<SQLUpdate[]> {
  /* Had to get wallet address like this, coz when CDE mint input is processed,
     there is no data about address of the owner in input, only NFT contract address
  */
  const walletAddress = await getNftOwner(
    dbConn,
    ACHIEVEMENTS_CDE,
    BigInt(input.tokenId)
  );
  if (!walletAddress) {
    console.warn(`
        WARNING!
        Owner of NFT ${input.tokenId} not found in the database.
        This achievement NFT is not tracked by the node, no state will be created.
       `);
    return [];
  }
  const achievements = await getAchievements(ACHIEVEMENTS_CDE, walletAddress, dbConn);
  if (achievements) {
    console.warn(`
        WARNING!
        Although mint input is processed by the game node, 
        user already have achievements instance in the database associated with another NFT.
        So no state for the new NFT will be created.`);
    return [];
  }

  const submissions = await getSubmissions.run(
    { wallet_address: walletAddress },
    dbConn
  );

  return mkInitQuery(input, submissions);
}

function mkInitQuery(
  input: AchievementNftMint,
  submissions: IGetSubmissionsResult[]
): SQLUpdate[] {

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

  return [
    [initAchievements, initParams],
  ];
}

// Generate statements to update state of achievements NFT
export async function updateAchievementsRecord(
  walletAddress: string,
  currentSubmissionState: MatchState,
  dbConn: Pool
): Promise<SQLUpdate[]> {
  console.log(`Updating achievements for the user ${walletAddress}`);

  const achievementsResult = await getAchievements(ACHIEVEMENTS_CDE, walletAddress, dbConn);
  if (!achievementsResult) {
    console.log(`Achievements are not enabled for the user ${walletAddress}`);
    return []
  };
  const achievements = achievementsResult as IGetAchievementsByOwnedResult;
  const submissions = await getSubmissions.run(
    { wallet_address: walletAddress },
    dbConn
  );
  return mkUpdateQuery(achievements, submissions, currentSubmissionState);
}

function mkUpdateQuery(
  achievements: IGetAchievementsByOwnedResult,
  submissions: IGetSubmissionsResult[],
  currentSubmissionState: MatchState
): SQLUpdate[] {
  const achievementsRecord = tryParseRecord(achievements.record);
  if (!achievementsRecord) {
    console.error("Could not prase achievements record received from DB", achievements);
    return [];
  }

  const outcomes = submissions.map(s => s.is_success);
  outcomes.push(currentSubmissionState.isGoodSoFar);
  let winStreak = longestWinStreak(outcomes);

  const newRecord: AchievementsRecord = {
    gamesPlayed: 1 + achievementsRecord.gamesPlayed,
    winStreak: winStreak
  };

  const updateParams: IUpdateAchievementsParams = {
    nft_id: achievements.nft_id,
    record: JSON.stringify(newRecord)
  };
  return [[updateAchievements, updateParams]]
}

// Helper to parse AchievementsRecord from JSON string stored in DB
function tryParseRecord(record: string): AchievementsRecord | null {
  try {
    return JSON.parse(record);
  } catch (e) {
    console.error("Error parsing AchievementsRecord:", e);
    return null;
  }
}

// Calculates longest streak of correct answers
function longestWinStreak(outcomes: boolean[]): number {
  let maxStreak = 0;
  let currentStreak = 0;
  outcomes.forEach(is_success => {
    currentStreak = is_success ? currentStreak + 1 : 0;
    maxStreak = Math.max(maxStreak, currentStreak);
  })
  return maxStreak;
}
