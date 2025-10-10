import { curry } from "./fp";

const match = curry((what: RegExp, s: string, b: boolean) => s.match(what));
const filter = curry((f: (x: string) => boolean, xs: string[]) => xs.filter(f));
const map = curry((f: (x: string) => string, xs: string[]) => xs.map(f));

const matchA = match(/a/g);
const matchB = match(/b/g, 'lkj');

console.log(matchA("abcdefg"));
console.log(matchA("abcdefg"));