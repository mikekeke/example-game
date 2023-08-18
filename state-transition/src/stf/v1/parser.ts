import { PaimaParser } from 'paima-sdk/paima-utils-backend';
import type { ParsedSubmittedInput } from './types';

const myGrammar = `
        submitGuess      = s|*address|symbols|guess
`;

const parserCommands = {
  submitGuess: {
    address: PaimaParser.WalletAddress(),
    symbols: PaimaParser.NCharsParser(1, 100),
    guess: PaimaParser.NCharsParser(1, 1000),
  },
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
