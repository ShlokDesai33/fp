// 2 functions
export function pipe<A, B, C>(
	value: A,
	fn1: (a: Awaited<A>) => B,
	fn2: (b: Awaited<B>) => C,
): Promise<Awaited<C>>;

// 3 functions
export function pipe<A, B, C, D>(
	value: A,
	fn1: (a: Awaited<A>) => B,
	fn2: (b: Awaited<B>) => C,
	fn3: (c: Awaited<C>) => D,
): Promise<Awaited<D>>;

// 4 functions
export function pipe<A, B, C, D, E>(
	value: A,
	fn1: (a: Awaited<A>) => B,
	fn2: (b: Awaited<B>) => C,
	fn3: (c: Awaited<C>) => D,
	fn4: (d: Awaited<D>) => E,
): Promise<Awaited<E>>;

// 5 functions
export function pipe<A, B, C, D, E, F>(
	value: A,
	fn1: (a: Awaited<A>) => B,
	fn2: (b: Awaited<B>) => C,
	fn3: (c: Awaited<C>) => D,
	fn4: (d: Awaited<D>) => E,
	fn5: (e: Awaited<E>) => F,
): Promise<Awaited<F>>;

// 6 functions
export function pipe<A, B, C, D, E, F, G>(
	value: A,
	fn1: (a: Awaited<A>) => B,
	fn2: (b: Awaited<B>) => C,
	fn3: (c: Awaited<C>) => D,
	fn4: (d: Awaited<D>) => E,
	fn5: (e: Awaited<E>) => F,
	fn6: (f: Awaited<F>) => G,
): Promise<Awaited<G>>;

/**
 * Passes a value through a series of transformation functions, executing them
 * immediately from left to right with async support. Data flows through each
 * function in the order written: `pipe(x, f, g, h)` equals
 * `await h(await g(await f(x)))`.
 *
 * Each function must be unary (single argument). Each function can be
 * synchronous or asynchronous - all results are awaited. Each function's
 * return type must match the next function's parameter type for full type
 * safety. Always returns a Promise. Supports up to 6 functions with complete
 * type inference.
 *
 * Note: If working purely with synchronous functions, use `pipeSync` instead
 * for better performance (20-100x faster) as it avoids Promise overhead.
 *
 * @returns a Promise that resolves to the final transformed value after
 * passing through all functions.
 *
 * @example
 * // all async functions & starting with a promise
 * const result = await pipe(
 *   fetch(`/api/users/${id}`)
 *   (response) => response.json(),
 *   (user) => ({ ...user, processed: true })
 * );
 *
 * @example
 * // mix of sync and async functions
 * const result = await pipe(
 *   456,
 *   (id: number) => ({ id, name: "Alice" }),
 *   (user) => ({ ...user, timestamp: Date.now() }),
 *   saveToDb
 * );
 */
export async function pipe(
	value: unknown,
	...fns: Array<(arg: unknown) => unknown>
) {
	let result = await value;
	for (let i = 0; i < fns.length; i++) {
		result = await fns[i]?.(result);
	}
	return result;
}

// 2 functions
export function pipeSync<A, B, C>(
	value: A,
	fn1: (a: A) => B,
	fn2: (b: B) => C,
): C;

// 3 functions
export function pipeSync<A, B, C, D>(
	value: A,
	fn1: (a: A) => B,
	fn2: (b: B) => C,
	fn3: (c: C) => D,
): D;

// 4 functions
export function pipeSync<A, B, C, D, E>(
	value: A,
	fn1: (a: A) => B,
	fn2: (b: B) => C,
	fn3: (c: C) => D,
	fn4: (d: D) => E,
): E;

// 5 functions
export function pipeSync<A, B, C, D, E, F>(
	value: A,
	fn1: (a: A) => B,
	fn2: (b: B) => C,
	fn3: (c: C) => D,
	fn4: (d: D) => E,
	fn5: (e: E) => F,
): F;

// 6 functions
export function pipeSync<A, B, C, D, E, F, G>(
	value: A,
	fn1: (a: A) => B,
	fn2: (b: B) => C,
	fn3: (c: C) => D,
	fn4: (d: D) => E,
	fn5: (e: E) => F,
	fn6: (f: F) => G,
): G;

/**
 * Passes a value through a series of synchronous transformation functions,
 * executing them immediately from left to right. Data flows through each
 * function in the order written: `pipeSync(x, f, g, h)` equals `h(g(f(x)))`.
 *
 * Each function must be unary (single argument) and synchronous. Each
 * function's return type must match the next function's parameter type for
 * full type safety. Supports up to 6 functions with complete type inference.
 *
 * Note: Use this function when all transformations are synchronous for optimal
 * performance. If any function is async or returns a Promise, use `pipe`
 * instead.
 *
 * @returns the final transformed value after passing through all functions.
 *
 * @example
 * // simple transformation chain
 * const result = pipeSync(
 *   5,
 *   (x: number) => x * 2,
 *   x => x + 10,
 *   x => `Result: ${x}`
 * ); // "Result: 20"
 */
export function pipeSync(
	value: unknown,
	...fns: Array<(arg: unknown) => unknown>
) {
	let result = value;
	for (let i = 0; i < fns.length; i++) {
		result = fns[i]?.(result);
	}
	return result;
}
