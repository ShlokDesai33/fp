import { compose } from './compose';

const add1 = (x: number) => x + 1;
const add5 = (x: number) => x + 5;
const double = (x: number) => x * 2;
const triple = (x: number) => x * 3;
const square = (x: number) => x * x;
const negate = (x: number) => -x;
const half = (x: number) => x / 2;
const abs = (x: number) => Math.abs(x);

const test = compose(
	add1,
	add5,
	double,
	triple,
	(a: number, b: number) => a + b,
);
