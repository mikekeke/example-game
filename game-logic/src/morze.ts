// Taken from https://github.com/mvukic/morse-code/blob/master/src/data/alphabet.ts
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
  ['2', '.---'],
  ['3', '...--'],
  ['4', '....-'],
  ['5', '.....'],
  ['6', '.----'],
  ['7', '..---'],
  ['8', '...--'],
  ['9', '....-'],
  ['.', '.-.-.-'],
  [',', '--..--'],
  ['?', '..--..'],
  ['\'', '.----.'],
  ['!', '-.-.--'],
  ['/', '-..-.'],
  ['(', '-.--.'],
  [')', '-.--.-'],
  ['&', '.-...'],
  [':', '---...'],
  [';', '-.-.-.'],
  ['=', '-...-'],
  ['+', '-.-.-'],
  ['-', '-....-'],
  ['_', '..--.-'],
  ['\"', '.-..-.'],
  ['$', '...-..-'],
  ['@', '.--.-.'],
  [' ', ' '],
  ['\n', '\n'],
  ['\n\r', '\n\r'],
];

const letterToCodeMap: Map<string, string> = new Map(lettersAndCodes);

const codeToLetterMap: Map<string, string> = new Map(
  // Switch key-value places
  lettersAndCodes.map(([letter, code]) => [code, letter])
);

export function matchesCoding(symbol: string, code: string): boolean {
  const coding = getCoding(symbol);

  // todo: handle conversion better somehow
  const morzeCode = code.replaceAll("0", ".").replaceAll("1", "-");

  const result = coding === morzeCode;
  console.log("Single result: ", coding, morzeCode, result);
  return result;
}

export function getCoding(symbol: string): string {
  return letterToCodeMap.get(symbol.toUpperCase())!
}
