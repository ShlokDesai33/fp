// 2 functions
export function compose<A extends unknown[], B, C>(
	fn1: (b: Awaited<B>) => C,
	fn2: (...args: A) => B,
): (...args: A) => Promise<Awaited<C>>;

// 3 functions
export function compose<A extends unknown[], B, C, D>(
	fn1: (c: Awaited<C>) => D,
	fn2: (b: Awaited<B>) => C,
	fn3: (...args: A) => B,
): (...args: A) => Promise<Awaited<D>>;

// 4 functions
export function compose<A extends unknown[], B, C, D, E>(
	fn1: (d: Awaited<D>) => E,
	fn2: (c: Awaited<C>) => D,
	fn3: (b: Awaited<B>) => C,
	fn4: (...args: A) => B,
): (...args: A) => Promise<Awaited<E>>;

// 5 functions
export function compose<A extends unknown[], B, C, D, E, F>(
	fn1: (e: Awaited<E>) => F,
	fn2: (d: Awaited<D>) => E,
	fn3: (c: Awaited<C>) => D,
	fn4: (b: Awaited<B>) => C,
	fn5: (...args: A) => B,
): (...args: A) => Promise<Awaited<F>>;

// 6 functions
export function compose<A extends unknown[], B, C, D, E, F, G>(
	fn1: (f: Awaited<F>) => G,
	fn2: (e: Awaited<E>) => F,
	fn3: (d: Awaited<D>) => E,
	fn4: (c: Awaited<C>) => D,
	fn5: (b: Awaited<B>) => C,
	fn6: (...args: A) => B,
): (...args: A) => Promise<Awaited<G>>;

/**
 * Composes functions right-to-left (down-to-up) into a single reusable async
 * function. The last function executes first: `compose(f, g, h)(x)` equals
 * `await f(await g(await h(x)))`.
 *
 * The last function can accept multiple arguments; other functions must be
 * unary (single argument). Each function can be synchronous or asynchronous -
 * all results are awaited. Each function's return type must match the next
 * function's parameter type for full type safety. Always returns a function
 * that returns a Promise. Supports up to 6 functions with complete type
 * inference.
 *
 * Note: If working purely with synchronous functions, use `composeSync`
 * instead for better performance (20-100x faster) as it avoids Promise
 * overhead.
 *
 * @returns a function that takes the same arguments as the last function and
 * applies the functions right-to-left (bottom-to-top). The result of each
 * function is awaited before being passed to the next function.
 *
 * @example
 * // function decoration / wrapping
 * const enhancedHandler = compose(
 *   withErrorHandling,
 *   withLogging,
 *   withValidation,
 *   baseHandler
 * );
 * await enhancedHandler(request);
 *
 * @example
 * // data transformation layers
 * const processOrder = compose(
 *   generateInvoice,
 *   applyDiscounts,
 *   calculateTax,
 *   validateOrder
 * );
 * await processOrder(orderData);
 */
export function compose(...fns: Array<(...args: unknown[]) => unknown>) {
	return async (...args: unknown[]) => {
		let result = await fns[fns.length - 1]?.(...args);
		for (let i = fns.length - 2; i >= 0; i--) {
			result = await fns[i]?.(result);
		}
		return result;
	};
}

// 2 functions
export function composeSync<A extends unknown[], B, C>(
	fn1: (b: B) => C,
	fn2: (...args: A) => B,
): (...args: A) => C;

// 3 functions
export function composeSync<A extends unknown[], B, C, D>(
	fn1: (c: C) => D,
	fn2: (b: B) => C,
	fn3: (...args: A) => B,
): (...args: A) => D;

// 4 functions
export function composeSync<A extends unknown[], B, C, D, E>(
	fn1: (d: D) => E,
	fn2: (c: C) => D,
	fn3: (b: B) => C,
	fn4: (...args: A) => B,
): (...args: A) => E;

// 5 functions
export function composeSync<A extends unknown[], B, C, D, E, F>(
	fn1: (e: E) => F,
	fn2: (d: D) => E,
	fn3: (c: C) => D,
	fn4: (b: B) => C,
	fn5: (...args: A) => B,
): (...args: A) => F;

// 6 functions
export function composeSync<A extends unknown[], B, C, D, E, F, G>(
	fn1: (f: F) => G,
	fn2: (e: E) => F,
	fn3: (d: D) => E,
	fn4: (c: C) => D,
	fn5: (b: B) => C,
	fn6: (...args: A) => B,
): (...args: A) => G;

/**
 * Composes synchronous functions right-to-left (down-to-up) into a single
 * reusable function. The last function executes first: `composeSync(f, g, h)(x)`
 * equals `f(g(h(x)))`.
 *
 * The last function can accept multiple arguments; other functions must be
 * unary (single argument) and synchronous. Each function's return type must
 * match the next function's parameter type for full type safety. Supports up
 * to 6 functions with complete type inference.
 *
 * Note: Use this function when all transformations are synchronous for optimal
 * performance. If any function is async or returns a Promise, use `compose`
 * instead.
 *
 * @returns a function that takes the same arguments as the last function and
 * applies the functions right-to-left (bottom-to-top). The result of each
 * function is passed to the next function.
 *
 * @example
 * // function decoration / wrapping
 * const enhancedHandler = composeSync(
 *   formatResponse,
 *   addHeaders,
 *   processData
 * );
 * enhancedHandler(input);
 *
 * @example
 * // mathematical composition
 * const calculate = composeSync(
 *   (x: number) => `Result: ${x}`,
 *   (x) => x * 3,
 *   (x) => x + 10,
 *   (x) => x * 2
 * );
 * calculate(5); // "Result: 60" - executes as: ((5 * 2) + 10) * 3
 */
export function composeSync(...fns: Array<(...args: unknown[]) => unknown>) {
	return (...args: unknown[]) => {
		let result = fns[fns.length - 1]?.(...args);
		for (let i = fns.length - 2; i >= 0; i--) {
			result = fns[i]?.(result);
		}
		return result;
	};
}
