import { curry } from "./fp";

const match = curry((what: RegExp, s: string) => s.match(what));
const matchA = match(/a/g, "aaaklaa;lkja");

console.log(matchA);
