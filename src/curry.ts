// biome-ignore-all lint/complexity/noArguments: using the `arguments` object
// instead of `...args` to avoid creating a new array gives us a small
// performance gain

// binary function
export function curry<A, B, R>(
	fn: (a: A, b: B) => R,
): {
	(a: A, b: B): R;
	(a: A): (b: B) => R;
};

/**
 * Curries a function with 2 parameters, enabling partial application and
 * flexible invocation patterns.
 *
 * Currying transforms a function that takes multiple arguments into a sequence
 * of functions that each take a single argument. This implementation supports
 * partial application (e.g., `f(a)(b)`), and direct calls (e.g., `f(a, b)`).
 * Nullary and unary functions are not supported.
 *
 * @param fn the function to be curried
 *
 * @returns A curried function supporting `f(a, b)` or `f(a)(b)`.
 *
 * @example
 * const sum = (a: number, b: number) => a + b;
 * const curriedSum = curry(sum);
 * curriedSum(5)(10); // 15
 * curriedSum(5, 10); // 15
 *
 * @remarks
 * - Does not support rest parameters or optional parameters
 * - All parameters must be required for proper currying behavior
 * - Function.length must accurately reflect the parameter count
 */
export function curry(fn: (...args: unknown[]) => unknown) {
	// binary function
	return function $curry(a: unknown, b?: unknown) {
		return arguments.length === 1
			? // partial application
				function $$curry(b: unknown) {
					return fn(a, b);
				}
			: // direct invocation
				fn(a, b);
	};
}
