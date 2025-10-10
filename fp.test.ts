import { describe, test, expect } from "bun:test";
import { curry } from "./fp";

describe("curry - arity 2", () => {
	test("full application with both arguments", () => {
		const add = (a: number, b: number) => a + b;
		const curried = curry(add);
		expect(curried(5, 3)).toBe(8);
	});

	test("partial application then complete", () => {
		const add = (a: number, b: number) => a + b;
		const curried = curry(add);
		const addFive = curried(5);
		expect(addFive(3)).toBe(8);
	});

	test("ignores extra arguments in full application", () => {
		const add = (a: number, b: number) => a + b;
		const curried = curry(add);
		// @ts-expect-error - testing runtime behavior with extra args
		expect(curried(5, 3, 999)).toBe(8);
	});

	test("ignores extra arguments in partial application", () => {
		const add = (a: number, b: number) => a + b;
		const curried = curry(add);
		const addFive = curried(5);
		// @ts-expect-error - testing runtime behavior with extra args
		expect(addFive(3, 999)).toBe(8);
	});

	test("works with different value types", () => {
		const concat = (a: string, b: string) => a + b;
		const curried = curry(concat);
		expect(curried("hello", " world")).toBe("hello world");
		expect(curried("hello")(" world")).toBe("hello world");
	});

	test("works with null and undefined", () => {
		const fn = (a: any, b: any) => [a, b];
		const curried = curry(fn);
		expect(curried(null, undefined)).toEqual([null, undefined]);
		expect(curried(null)(undefined)).toEqual([null, undefined]);
	});

	test("works with objects", () => {
		const merge = (a: object, b: object) => ({ ...a, ...b });
		const curried = curry(merge);
		expect(curried({ x: 1 }, { y: 2 })).toEqual({ x: 1, y: 2 });
		expect(curried({ x: 1 })({ y: 2 })).toEqual({ x: 1, y: 2 });
	});

	test("preserves function behavior with side effects", () => {
		let callCount = 0;
		const fn = (a: number, b: number) => {
			callCount++;
			return a + b;
		};
		const curried = curry(fn);

		curried(1, 2);
		expect(callCount).toBe(1);

		curried(3)(4);
		expect(callCount).toBe(2);
	});

	test("partial application returns new function each time", () => {
		const add = (a: number, b: number) => a + b;
		const curried = curry(add);
		const addFive = curried(5);
		const addTen = curried(10);

		expect(addFive(3)).toBe(8);
		expect(addTen(3)).toBe(13);
	});

	test("multiple partial applications are independent", () => {
		const add = (a: number, b: number) => a + b;
		const curried = curry(add);
		const addFive = curried(5);

		expect(addFive(1)).toBe(6);
		expect(addFive(2)).toBe(7);
		expect(addFive(3)).toBe(8);
	});

	test("works with 0 as argument", () => {
		const add = (a: number, b: number) => a + b;
		const curried = curry(add);
		expect(curried(0, 0)).toBe(0);
		expect(curried(0)(0)).toBe(0);
		expect(curried(5)(0)).toBe(5);
	});

	test("works with negative numbers", () => {
		const subtract = (a: number, b: number) => a - b;
		const curried = curry(subtract);
		expect(curried(-5, -3)).toBe(-2);
		expect(curried(-5)(-3)).toBe(-2);
	});
});

describe("curry - arity 3", () => {
	test("full application with all three arguments", () => {
		const add3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(add3);
		expect(curried(1, 2, 3)).toBe(6);
	});

	test("partial: two args then one", () => {
		const add3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(add3);
		const addOneTwo = curried(1, 2);
		expect(addOneTwo(3)).toBe(6);
	});

	test("partial: one arg then two", () => {
		const add3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(add3);
		const addOne = curried(1);
		expect(addOne(2, 3)).toBe(6);
	});

	test("partial: one at a time", () => {
		const add3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(add3);
		const addOne = curried(1);
		const addOneTwo = addOne(2);
		expect(addOneTwo(3)).toBe(6);
	});

	test("chained partial application: (a)(b)(c)", () => {
		const add3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(add3);
		expect(curried(1)(2)(3)).toBe(6);
	});

	test("ignores extra arguments in full application", () => {
		const add3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(add3);
		// @ts-expect-error - testing runtime behavior
		expect(curried(1, 2, 3, 999)).toBe(6);
	});

	test("ignores extra arguments in two-arg partial", () => {
		const add3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(add3);
		const partial = curried(1, 2);
		// @ts-expect-error - testing runtime behavior
		expect(partial(3, 999)).toBe(6);
	});

	test("ignores extra arguments in one-arg partial completing with two", () => {
		const add3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(add3);
		const partial = curried(1);
		// @ts-expect-error - testing runtime behavior
		expect(partial(2, 3, 999)).toBe(6);
	});

	test("ignores extra arguments in one-arg partial completing with one", () => {
		const add3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(add3);
		const partial1 = curried(1);
		const partial2 = partial1(2);
		// @ts-expect-error - testing runtime behavior
		expect(partial2(3, 999)).toBe(6);
	});

	test("works with string concatenation", () => {
		const concat3 = (a: string, b: string, c: string) => a + b + c;
		const curried = curry(concat3);

		expect(curried("a", "b", "c")).toBe("abc");
		expect(curried("a", "b")("c")).toBe("abc");
		expect(curried("a")("b", "c")).toBe("abc");
		expect(curried("a")("b")("c")).toBe("abc");
	});

	test("works with mixed types", () => {
		const fn = (a: number, b: string, c: boolean) => `${a}-${b}-${c}`;
		const curried = curry(fn);

		expect(curried(1, "test", true)).toBe("1-test-true");
		expect(curried(1, "test")(true)).toBe("1-test-true");
		expect(curried(1)("test", true)).toBe("1-test-true");
		expect(curried(1)("test")(true)).toBe("1-test-true");
	});

	test("works with null and undefined", () => {
		const fn = (a: any, b: any, c: any) => [a, b, c];
		const curried = curry(fn);

		expect(curried(null, undefined, null)).toEqual([null, undefined, null]);
		expect(curried(null)(undefined, null)).toEqual([null, undefined, null]);
		expect(curried(null, undefined)(null)).toEqual([null, undefined, null]);
		expect(curried(null)(undefined)(null)).toEqual([null, undefined, null]);
	});

	test("works with objects and arrays", () => {
		const fn = (a: object, b: any[], c: number) => ({ ...a, arr: b, num: c });
		const curried = curry(fn);
		const result = { x: 1, arr: [1, 2], num: 3 };

		expect(curried({ x: 1 }, [1, 2], 3)).toEqual(result);
		expect(curried({ x: 1 })([1, 2], 3)).toEqual(result);
		expect(curried({ x: 1 }, [1, 2])(3)).toEqual(result);
		expect(curried({ x: 1 })([1, 2])(3)).toEqual(result);
	});

	test("preserves side effects", () => {
		let callCount = 0;
		const fn = (a: number, b: number, c: number) => {
			callCount++;
			return a + b + c;
		};
		const curried = curry(fn);

		curried(1, 2, 3);
		expect(callCount).toBe(1);

		curried(1, 2)(3);
		expect(callCount).toBe(2);

		curried(1)(2, 3);
		expect(callCount).toBe(3);

		curried(1)(2)(3);
		expect(callCount).toBe(4);
	});

	test("partial applications are independent", () => {
		const add3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(add3);

		const addOne = curried(1);
		const addOneFive = curried(1, 5);
		const addTen = curried(10);

		expect(addOne(2, 3)).toBe(6);
		expect(addOneFive(3)).toBe(9);
		expect(addTen(20, 30)).toBe(60);

		// Verify they don't interfere with each other
		expect(addOne(2, 3)).toBe(6);
	});

	test("nested partial applications are independent", () => {
		const add3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(add3);
		const addOne = curried(1);

		const addOneTwo = addOne(2);
		const addOneThree = addOne(3);

		expect(addOneTwo(10)).toBe(13);
		expect(addOneThree(10)).toBe(14);
		expect(addOneTwo(5)).toBe(8);
	});

	test("works with 0 as arguments", () => {
		const add3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(add3);

		expect(curried(0, 0, 0)).toBe(0);
		expect(curried(0)(0, 0)).toBe(0);
		expect(curried(0, 0)(0)).toBe(0);
		expect(curried(0)(0)(0)).toBe(0);
		expect(curried(5, 0)(0)).toBe(5);
	});

	test("works with negative numbers", () => {
		const subtract3 = (a: number, b: number, c: number) => a - b - c;
		const curried = curry(subtract3);

		expect(curried(-5, -3, -2)).toBe(0);
		expect(curried(-5)(-3, -2)).toBe(0);
		expect(curried(-5, -3)(-2)).toBe(0);
		expect(curried(-5)(-3)(-2)).toBe(0);
	});

	test("order of arguments is preserved", () => {
		const fn = (a: number, b: number, c: number) => `${a}-${b}-${c}`;
		const curried = curry(fn);

		expect(curried(1, 2, 3)).toBe("1-2-3");
		expect(curried(1)(2, 3)).toBe("1-2-3");
		expect(curried(1, 2)(3)).toBe("1-2-3");
		expect(curried(1)(2)(3)).toBe("1-2-3");

		// Different order should give different results
		expect(curried(3, 2, 1)).toBe("3-2-1");
	});
});

describe("curry - error cases", () => {
	test("throws error for arity 0", () => {
		const fn = () => "no args";
		expect(() => curry(fn)).toThrow("Unsupported arity: 0");
	});

	test("throws error for arity 1", () => {
		const fn = (a: number) => a;
		expect(() => curry(fn)).toThrow("Unsupported arity: 1");
	});

	test("throws error for arity 4", () => {
		const fn = (a: number, b: number, c: number, d: number) => a + b + c + d;
		// @ts-expect-error - testing runtime behavior
		expect(() => curry(fn)).toThrow("Unsupported arity: 4");
	});

	test("throws error for arity 5+", () => {
		const fn = (a: number, b: number, c: number, d: number, e: number) =>
			a + b + c + d + e;
		// @ts-expect-error - testing runtime behavior
		expect(() => curry(fn)).toThrow("Unsupported arity: 5");
	});
});

describe("curry - special function behaviors", () => {
	test("works with functions that return functions", () => {
		const fn = (a: number, b: number) => (x: number) => a + b + x;
		const curried = curry(fn);

		const result1 = curried(1, 2);
		expect(result1(3)).toBe(6);

		const result2 = curried(1)(2);
		expect(result2(3)).toBe(6);
	});

	test("works with functions that return objects", () => {
		const fn = (a: string, b: number) => ({ name: a, value: b });
		const curried = curry(fn);

		expect(curried("test", 42)).toEqual({ name: "test", value: 42 });
		expect(curried("test")(42)).toEqual({ name: "test", value: 42 });
	});

	test("works with functions that throw errors", () => {
		const fn = (a: number, b: number) => {
			if (a === 0) throw new Error("Cannot be zero");
			return b / a;
		};
		const curried = curry(fn);

		expect(() => curried(0, 10)).toThrow("Cannot be zero");
		expect(() => curried(0)(10)).toThrow("Cannot be zero");
		expect(curried(2, 10)).toBe(5);
		expect(curried(2)(10)).toBe(5);
	});

	test("works with async functions (arity 2)", async () => {
		const fn = async (a: number, b: number) => {
			return Promise.resolve(a + b);
		};
		const curried = curry(fn);

		expect(await curried(1, 2)).toBe(3);
		expect(await curried(1)(2)).toBe(3);
	});

	test("works with async functions (arity 3)", async () => {
		const fn = async (a: number, b: number, c: number) => {
			return Promise.resolve(a + b + c);
		};
		const curried = curry(fn);

		expect(await curried(1, 2, 3)).toBe(6);
		expect(await curried(1, 2)(3)).toBe(6);
		expect(await curried(1)(2, 3)).toBe(6);
		expect(await curried(1)(2)(3)).toBe(6);
	});
});
