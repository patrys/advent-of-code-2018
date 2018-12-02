import * as fs from "fs";

function getInput(path: string): Array<string> {
  return fs
    .readFileSync(path)
    .toString()
    .split("\n");
}

function qualify(value: string) {
  const data = value.split("");
  const letterCounts: { [key: string]: number } = {};
  for (let char of data) {
    if (!(char in letterCounts)) {
      letterCounts[char] = 1;
    } else {
      letterCounts[char]++;
    }
  }
  const hasCount = (expected: number) =>
    !!Object.values(letterCounts).filter(count => count === expected).length;
  const hasPairs = hasCount(2);
  const hasTriplets = hasCount(3);
  return [hasPairs, hasTriplets];
}

function solveChecksum(input: Array<string>) {
  let pairs = 0;
  let triplets = 0;
  for (let value of input) {
    const [hasPairs, hasTriplets] = qualify(value);
    if (hasPairs) pairs++;
    if (hasTriplets) triplets++;
  }
  return pairs * triplets;
}

function getCommonLetters(
  first: Array<string>,
  second: Array<string>
): Array<string> {
  return first
    .map((letter, index) => (second[index] === letter ? letter : undefined))
    .filter(letter => letter !== undefined);
}

function solveFabricBoxes(input: Array<string>): string {
  const splitInput = input.map(value => value.split(""));
  for (let i = 0; i < splitInput.length - 1; i++) {
    const first = splitInput[i];
    for (let j = i + 1; j < splitInput.length; j++) {
      const second = splitInput[j];
      const commonLetters = getCommonLetters(first, second);
      if (commonLetters.length === first.length - 1) {
        return commonLetters.join("");
      }
    }
  }
}

const input = getInput("data/day2.txt");
console.log("Checksum", solveChecksum(input));
console.log("Fabric box code", solveFabricBoxes(input));
