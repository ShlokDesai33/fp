// biome-ignore-all lint/complexity/noArguments: using the `arguments` object
// instead of `...args` to avoid creating a new array gives us a small
// performance gain

// nullary function
export function curry<R>(fn: () => R): () => R;

// unary function
export function curry<A, R>(fn: (a: A) => R): (a: A) => R;

// binary function
export function curry<A, B, R>(
	fn: (a: A, b: B) => R,
): {
	(a: A, b: B): R;
	(a: A): (b: B) => R;
};

// ternary function
export function curry<A, B, C, R>(
	fn: (a: A, b: B, c: C) => R,
): {
	(a: A, b: B, c: C): R;
	(a: A, b: B): (c: C) => R;
	(a: A): { (b: B, c: C): R; (b: B): (c: C) => R };
};

/**
 * Curries a function with 0-3 parameters, enabling partial application and
 * flexible invocation patterns.
 *
 * Currying transforms a function that takes multiple arguments into a sequence
 * of functions that each take a single argument. This implementation supports
 * traditional currying style (e.g., `f(a)(b)(c)`), direct calls (e.g.,
 * `f(a, b, c)`), and mixed patterns (e.g., `f(a, b)(c)` or `f(a)(b, c)`).
 * Nullary and unary functions are returned unchanged as they are already in
 * their most curried form.
 *
 * @template A type of the first parameter
 * @template B type of the second parameter (binary/ternary only)
 * @template C type of the third parameter (ternary only)
 * @template R type of the returned value
 *
 * @param fn the function to be curried (must have arity of 1, 2, or 3)
 *
 * @returns For nullary and unary functions, returns the original function. For
 * binary functions, returns a curried function supporting `f(a, b)` or
 * `f(a)(b)`. For ternary functions, returns a curried function supporting all
 * patterns: `f(a, b, c)`, `f(a, b)(c)`, `f(a)(b, c)`, and `f(a)(b)(c)`.
 *
 * @example
 * // binary function
 * const sum = (a: number, b: number) => a + b;
 * const curriedSum = curry(sum);
 * curriedSum(5)(10); // 15
 * curriedSum(5, 10); // 15
 *
 * @example
 * // ternary function
 * const sum3 = (a: number, b: number, c: number) => a + b + c;
 * const curriedSum = curry(sum3);
 * curriedSum(1, 2, 3); // 6
 * curriedSum(1)(2, 3); // 6
 * curriedSum(1, 2)(3); // 6
 * curriedSum(1)(2)(3); // 6
 *
 * @remarks
 * - Does not support rest parameters or optional parameters
 * - All parameters must be required for proper currying behavior
 * - Function.length must accurately reflect the parameter count
 */
export function curry(fn: (...args: unknown[]) => unknown) {
	switch (fn.length) {
		case 0:
		case 1: {
			// no-op, already curried
			return fn;
		}
		case 2: {
			return function $curry(a: unknown, b: unknown) {
				return arguments.length === 2 ? fn(a, b) : (b: unknown) => fn(a, b);
			};
		}
		case 3: {
			return function $curry(a: unknown, b: unknown, c: unknown) {
				switch (arguments.length) {
					case 1: {
						return function $$curry(b: unknown, c: unknown) {
							return arguments.length === 2
								? fn(a, b, c)
								: (c: unknown) => fn(a, b, c);
						};
					}
					case 2: {
						return (c: unknown) => fn(a, b, c);
					}
					case 3: {
						return fn(a, b, c);
					}
				}
			};
		}
	}
}
