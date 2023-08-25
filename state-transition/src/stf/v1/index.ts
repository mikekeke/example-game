import type { Pool } from 'pg';

import parse from './parser.js';
import type Prando from 'paima-sdk/paima-prando';
import type { SubmittedChainData } from 'paima-sdk/paima-utils';
import type { SQLUpdate } from 'paima-sdk/paima-db';
import { insertSubmission, IInsertSubmissionParams, getAchievementsByOwned, IGetAchievementsByOwnedResult } from '@game/db';
import { ScheduledDataInput, SubmitGuess, isAchievementNft } from './types.js';
import { MatchMove, initRoundExecutor } from '@game/game-logic';
import { getOwnedNfts } from 'paima-sdk/paima-utils-backend';
import { initAchievementsQuery, updateAchievements } from './updates.js';

export default async function (
  inputData: SubmittedChainData,
  blockHeight: number,
  randomnessGenerator: Prando,
  dbConn: Pool
): Promise<SQLUpdate[]> {
  console.log(inputData, 'parsing input data');
  const walletAddress = inputData.userAddress.toLowerCase();
  const input = parse(inputData.inputData);
  console.log(`Processing input string: ${inputData.inputData}`);
  console.log(`Input string parsed as: ${input.input}`);

  switch (input.input) {
    case 'submitGuess':
      const res = await processSubmission(input, dbConn, randomnessGenerator, walletAddress);
      return res;
    case 'scheduledData':
      if (!inputData.scheduled) return [];
      return processScheduled(input);
    default:
      console.warn("Unexpected input", input);
      return [];
  }
}

async function processSubmission(
  input: SubmitGuess,
  dbConn: Pool,
  randomnessGenerator: Prando,
  walletAddress: string
): Promise<SQLUpdate[]> {
  const move: MatchMove = MatchMove.fromData(input.symbols, input.guess);

  console.log("Match move", JSON.stringify(move));

  const executor = initRoundExecutor(move, randomnessGenerator);
  const finalState = executor.endState();
  console.log("Final state", JSON.stringify(finalState));

  const achievements = await getAchievements(walletAddress, dbConn);
  let achievementsUpdate: SQLUpdate[] = [];
  if (achievements) {
    achievementsUpdate = await updateAchievements(achievements, walletAddress, dbConn);
  } else {
    console.log(`Achievements not enabled for user ${walletAddress}`);
  }

  const params: IInsertSubmissionParams =
  {
    wallet_address: input.address,
    symbols: input.symbols,
    guess: input.guess,
    is_success: finalState.isGoodSoFar
  }
  return [[insertSubmission, params], ...achievementsUpdate]
}

function processScheduled(input: ScheduledDataInput): SQLUpdate[] {
  if (isAchievementNft(input)) {
    console.log("PE: got mint NFT");
    return [initAchievementsQuery(input)];
  }
  return [];
}


async function getAchievements(
  walletAddress: string,
  readonlyDBConn: Pool
): Promise<IGetAchievementsByOwnedResult | undefined> {
  const ownedNftIds =
    await getOwnedNfts(
      readonlyDBConn,
      "Test NFT contract",
      walletAddress).then(r => r.map((x) => x.toString()));

  console.log("owned", ownedNftIds)

  if (ownedNftIds.length > 0) {

    //todo: check if rest is empty
    const [result, ...rest] = await getAchievementsByOwned.run(
      { nft_ids: ownedNftIds },
      readonlyDBConn
    );
    console.log("Achievements", result)
    return result;
  }
  return undefined;

}
