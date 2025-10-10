import { curry } from "./curry";

const match = curry((regexp: RegExp, s: string) => s.match(regexp));
const matchA = match(/a/g, "An Apple a Day Keeps the Doctor Away");

console.log(matchA);
