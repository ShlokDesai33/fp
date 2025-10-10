// biome-ignore-all lint/complexity/noArguments: using the `arguments` object
// instead of `...args` to avoid creating a new array gives us a small
// performance gain

/**
 * Curries a binary function, enabling both partial application and direct
 * invocation.
 *
 * Currying transforms a function that takes multiple arguments into a sequence
 * of functions that each take a single argument. This implementation is
 * flexible and supports both traditional currying style `f(a)(b)` and direct
 * calls `f(a, b)` for convenience.
 *
 * @template A type of the first parameter
 * @template B type of the second parameter
 * @template R type of the returned value
 *
 * @param fn the binary function to be curried
 *
 * @returns A curried function that can be called in two ways:
 *  - `curried(a, b)` - Direct call, returns `R`
 *  - `curried(a)` - Partial application, returns `(b: B) => R`
 *
 * @example
 * // basic usage via direct call
 * const add = (a: number, b: number) => a + b;
 * const curriedAdd = curry(add);
 * curriedAdd(5, 10); // 15
 *
 * @example
 * // curried style via partial application
 * const add = (a: number, b: number) => a + b;
 * const curriedAdd = curry(add);
 * const add5 = curriedAdd(5);
 * add5(10); // 15
 *
 * @remarks
 * 	- Does not support rest parameters or optional parameters
 * 	- All parameters must be required for proper currying behavior
 * 	- Function.length must accurately reflect the parameter count
 */
export function curry<A, B, R>(
	fn: (a: A, b: B) => R,
): {
	(a: A, b: B): R;
	(a: A): (b: B) => R;
};

/**
 * Curries a ternary function, enabling flexible argument application patterns.
 *
 * Currying transforms a function that takes multiple arguments into a sequence
 * of functions that each take a single argument. This implementation is highly
 * flexible and supports multiple calling patterns for maximum convenience:
 * - Traditional currying: `f(a)(b)(c)`
 * - Direct calls: `f(a, b, c)`
 * - Mixed patterns: `f(a)(b, c)` or `f(a, b)(c)`
 *
 * @template A type of the first parameter
 * @template B type of the second parameter
 * @template C type of the third parameter
 * @template R type of the returned value
 *
 * @param fn the ternary function to be curried
 *
 * @returns A curried function supporting multiple invocation patterns:
 *  - `curried(a, b, c)` - Direct call, returns `R`
 *  - `curried(a, b)` - Partial application, returns `(c: C) => R`
 *  - `curried(a)` - Partial application, returns:
 *    - `(b, c)` - Direct call, returns `R`
 *    - `(b)` - Partial application, returns `(c: C) => R`
 *
 * @example
 * // direct call with all arguments
 * const sum3 = (a: number, b: number, c: number) => a + b + c;
 * const curriedSum = curry(sum3);
 * curriedSum(1, 2, 3); // 6
 *
 * @example
 * // fully curried style
 * const sum3 = (a: number, b: number, c: number) => a + b + c;
 * const curriedSum = curry(sum3);
 * curriedSum(1)(2)(3); // 6
 *
 * @example
 * // mixed style
 * const sum3 = (a: number, b: number, c: number) => a + b + c;
 * const curriedSum = curry(sum3);
 * curriedSum(1, 2)(3); // 6
 * curriedSum(1)(2, 3); // 6
 *
 * @remarks
 * 	- Does not support rest parameters or optional parameters
 * 	- All parameters must be required for proper currying behavior
 * 	- Function.length must accurately reflect the parameter count
 */
export function curry<A, B, C, R>(
	fn: (a: A, b: B, c: C) => R,
): {
	(a: A, b: B, c: C): R;
	(a: A, b: B): (c: C) => R;
	(a: A): { (b: B, c: C): R; (b: B): (c: C) => R };
};

/**
 * Implementation function for curry. Transforms functions with arity 2 or 3
 * into curried versions.
 *
 * This is the runtime implementation that handles both binary and ternary
 * functions. It inspects the function's arity (via `Function.length`) and
 * returns an appropriately specialized curried wrapper that supports multiple
 * calling patterns for maximum flexibility.
 *
 * @param fn the function to curry (must have arity of 2 or 3)
 *
 * @returns A curried function wrapper that checks argument count and either:
 *  - Executes the original function if sufficient arguments are provided
 *  - Returns a new function awaiting remaining arguments
 *
 * @throws an Error if the function arity is not 2 or 3.
 */
export function curry(fn: (...args: unknown[]) => unknown) {
	if (fn.length === 2) {
		return function $curry(a: unknown, b: unknown) {
			return arguments.length >= 2 ? fn(a, b) : (b: unknown) => fn(a, b);
		};
	}

	if (fn.length === 3) {
		return function $curry(a: unknown, b: unknown, c: unknown) {
			if (arguments.length >= 3) return fn(a, b, c);
			if (arguments.length === 2) return (c: unknown) => fn(a, b, c);

			return function $$curry(b: unknown, c: unknown) {
				return arguments.length >= 2
					? fn(a, b, c)
					: (c: unknown) => fn(a, b, c);
			};
		};
	}

	throw new Error(`Unsupported arity: ${fn.length}`);
}
