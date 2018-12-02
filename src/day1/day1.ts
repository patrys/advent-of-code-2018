import * as fs from "fs";

function getInput(path: string): Array<string> {
  return fs
    .readFileSync(path)
    .toString()
    .split("\n");
}

function parseCommand(cmd: string): number {
  return parseInt(cmd, 10);
}

function* commandFeed(
  input: Array<string>,
  repeat: Boolean = false
): IterableIterator<number> {
  let index = 0;
  const length = input.length;
  while (true) {
    yield parseCommand(input[index]);
    index = (index + 1) % length;
    if (index === 0 && !repeat) break;
  }
}

function solveFirstPass(input: Array<string>): number {
  const feed = commandFeed(input);
  let freq = 0;
  while (true) {
    const delta = feed.next().value;
    if (delta === undefined) break;
    freq += delta;
  }
  return freq;
}

function solveStabilized(input: Array<string>): number {
  const feed = commandFeed(input, true);
  let freq = 0;
  const visitedFrequencies: { [freq: number]: Boolean } = {};
  while (true) {
    const delta = feed.next().value;
    freq += delta;
    if (freq in visitedFrequencies) break;
    visitedFrequencies[freq] = true;
  }
  return freq;
}

const input = getInput("data/day1.txt");
console.log("First pass result", solveFirstPass(input));
console.log("Stabilized result", solveStabilized(input));
