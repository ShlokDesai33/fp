import { curry } from "./fp";

const match = curry((what: RegExp, s: string) => s.match(what));
const matchA = match(/a/g);

console.log(matchA("abcdefg"));
console.log(matchA("abcdefg"));
