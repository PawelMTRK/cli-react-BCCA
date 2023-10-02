// Duplicates first and last cell
function prepareGeneration(generation: boolean[]): boolean[] {
  return [generation.at(0)!, ...generation, generation.at(-1)!];
}

// Get every triple from the array, eg.
// [1 0 1 1] => [1 0 1], [0 1 1]
function expandGeneration(generation: boolean[]): boolean[][] {
  // shifts generation left eg.
  // [0, 1, 0, 1]
  // [1, 0, 1]
  // [0, 1]
  const generation_s1 = generation.slice(1);
  const generation_s2 = generation.slice(2);
  return generation_s2.map(
    (v, i) => {
      return [generation.at(i)!, generation_s1.at(i)!, v];
    },
  );
}

function tripleToNumber(triple: boolean[]): number {
  return triple
    .map((elem, i, arr) => {
      const pow = 2 ** (arr.length - i - 1);
      return elem ? pow : 0;
    })
    .reduce((acc, e) => {
      return acc + e;
    }, 0);
}

function advanceGeneration(
  generation: boolean[][],
  rules: boolean[],
): boolean[] {
  return generation.map(
    (elem) => {
      // change triple to number to change the cell in the next generation
      // to an appropriate one, eg.
      // [1 0 1] will get 5th cell from the rule array
      const index = tripleToNumber(elem);
      return rules[index];
    },
  );
}

// Basically decimal to binary
function parseNumericRule(rule: number): boolean[] {
  return rule
    .toString(2)
    .padStart(8, "0")
    .split("")
    .map((e: string) => {
      return e == "1" ? true : false;
    });
}

// Advances the given generation
export function newGeneration(
  generation: boolean[],
  rule: number,
): boolean[] {
  return advanceGeneration(
    expandGeneration(prepareGeneration(generation)),
    parseNumericRule(rule),
  );
}

export function newNGenerations(
  n: number,
  generation: boolean[],
  rule: number,
): boolean[][] {
  let gen = newGeneration(generation, rule);
  const out = [gen];
  for (let i = 0; i < n; i++) {
    gen = newGeneration(gen, rule);
    out.push(gen);
  }
  return out;
}