import { PaimaParser, ParserRecord } from 'paima-sdk/paima-utils-backend';
import { characters, type AchievementNftMint, type ParsedSubmittedInput } from './types';

const myGrammar = `
        submitGuess      = s|*address|symbols|guess
        nftMint          = nftmint|address|tokenId|type
`;

const nftMint: ParserRecord<AchievementNftMint> = {
  renameCommand: 'scheduledData',
  effect: 'achievementNftMint', //todo: how to avoid literals copy-paste here?
  address: PaimaParser.WalletAddress(),
  tokenId: PaimaParser.NumberParser(),
  type: PaimaParser.EnumParser(characters),
};

const parserCommands = {
  submitGuess: {
    address: PaimaParser.WalletAddress(),
    symbols: PaimaParser.NCharsParser(1, 100),
    guess: PaimaParser.NCharsParser(1, 1000),
  },
  nftMint
};

const myParser = new PaimaParser(myGrammar, parserCommands);

function parse(s: string): ParsedSubmittedInput {
  try {
    const parsed = myParser.start(s);
    console.log("Parsed", parsed);
    return { input: parsed.command, ...parsed.args } as any;
  } catch (e) {
    console.log(e, 'Parsing error');
    return { input: 'invalidString' };
  }
}

export default parse;
