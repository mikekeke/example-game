import { fromOnChainRepr } from '@game/utils';

// Partially taken from https://github.com/mvukic/morse-code/blob/master/src/data/alphabet.ts
// (number were wrong there)
const lettersAndCodes: [string, string][] = [
  ['A', '.-'],
  ['B', '-...'],
  ['C', '-.-.'],
  ['D', '-..'],
  ['E', '.'],
  ['F', '..-.'],
  ['G', '--.'],
  ['H', '....'],
  ['I', '..'],
  ['J', '.---'],
  ['K', '-.-'],
  ['L', '.-..'],
  ['M', '--'],
  ['N', '-.'],
  ['O', '---'],
  ['P', '.--.'],
  ['Q', '--.-'],
  ['R', '.-.'],
  ['S', '...'],
  ['T', '-'],
  ['U', '..-'],
  ['V', '...-'],
  ['W', '.--'],
  ['X', '-..-'],
  ['Y', '-.--'],
  ['Z', '--..'],
  ['0', '-----'],
  ['1', '.----'],
  ['2', '..---'],
  ['3', '...--'],
  ['4', '....-'],
  ['5', '.....'],
  ['6', '-....'],
  ['7', '--...'],
  ['8', '---..'],
  ['9', '----.'],
];

const letterToCodeMap: Map<string, string> = new Map(lettersAndCodes);

export function matchesCoding(symbol: string, code: string): boolean {
  const coding = getCoding(symbol);
  const result = coding === fromOnChainRepr(code);
  return result;
}

export function getCoding(symbol: string): string {
  return letterToCodeMap.get(symbol.toUpperCase())!
}
