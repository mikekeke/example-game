import parse from './parser';

describe('Input parsing', () => {

  test('parses joinWorld', () => {
    const parsed = parse('s|*cf578a945dc50aa74fae976d4197f0d6d0a1d41d|A|01');
    expect(parsed.input).toBe('submitGuess');
    // console.log(parsed)
  });

  // test('parses joinWorld', () => {
  //   const parsed = parse('j|');
  //   expect(parsed.input).toBe('joinWorld');
  // });

  // test('parses submitMove', () => {
  //   const parsed = parse('m|*Xs6Q9GAqZVwe|1|2');
  //   expect(parsed.input).toBe('submitMove');
  // });

  // test('parses submitIncrement', () => {
  //   const parsed = parse('i|*1|*2');

  //   expect(parsed.input).toBe('submitIncrement');
  // });
});
