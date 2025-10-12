// 2 functions
export function pipe<A extends unknown[], B, C>(
	fn1: (...args: A) => B,
	fn2: (b: B) => C,
): (...args: A) => C;

// 3 functions
export function pipe<A extends unknown[], B, C, D>(
	fn1: (...args: A) => B,
	fn2: (b: B) => C,
	fn3: (c: C) => D,
): (...args: A) => D;

// 4 functions
export function pipe<A extends unknown[], B, C, D, E>(
	fn1: (...args: A) => B,
	fn2: (b: B) => C,
	fn3: (c: C) => D,
	fn4: (d: D) => E,
): (...args: A) => E;

// 5 functions
export function pipe<A extends unknown[], B, C, D, E, F>(
	fn1: (...args: A) => B,
	fn2: (b: B) => C,
	fn3: (c: C) => D,
	fn4: (d: D) => E,
	fn5: (e: E) => F,
): (...args: A) => F;

// 6 functions
export function pipe<A extends unknown[], B, C, D, E, F, G>(
	fn1: (...args: A) => B,
	fn2: (b: B) => C,
	fn3: (c: C) => D,
	fn4: (d: D) => E,
	fn5: (e: E) => F,
	fn6: (f: F) => G,
): (...args: A) => G;

// 7 functions
export function pipe<A extends unknown[], B, C, D, E, F, G, H>(
	fn1: (...args: A) => B,
	fn2: (b: B) => C,
	fn3: (c: C) => D,
	fn4: (d: D) => E,
	fn5: (e: E) => F,
	fn6: (f: F) => G,
	fn7: (g: G) => H,
): (...args: A) => H;

// 8 functions
export function pipe<A extends unknown[], B, C, D, E, F, G, H, I>(
	fn1: (...args: A) => B,
	fn2: (b: B) => C,
	fn3: (c: C) => D,
	fn4: (d: D) => E,
	fn5: (e: E) => F,
	fn6: (f: F) => G,
	fn7: (g: G) => H,
	fn8: (h: H) => I,
): (...args: A) => I;

// 9 functions
export function pipe<A extends unknown[], B, C, D, E, F, G, H, I, J>(
	fn1: (...args: A) => B,
	fn2: (b: B) => C,
	fn3: (c: C) => D,
	fn4: (d: D) => E,
	fn5: (e: E) => F,
	fn6: (f: F) => G,
	fn7: (g: G) => H,
	fn8: (h: H) => I,
	fn9: (i: I) => J,
): (...args: A) => J;

// 10 functions
export function pipe<A extends unknown[], B, C, D, E, F, G, H, I, J, K>(
	fn1: (...args: A) => B,
	fn2: (b: B) => C,
	fn3: (c: C) => D,
	fn4: (d: D) => E,
	fn5: (e: E) => F,
	fn6: (f: F) => G,
	fn7: (g: G) => H,
	fn8: (h: H) => I,
	fn9: (i: I) => J,
	fn10: (j: J) => K,
): (...args: A) => K;

/**
 * Composes functions left-to-right into a single function. Data flows through
 * each function in the order written: `pipe(f, g, h)(x)` equals `h(g(f(x)))`.
 *
 * The first function can accept multiple arguments; subsequent functions must
 * be unary (single argument). Each function's return type must match the next
 * function's parameter type for full type safety.
 *
 * Supports up to 10 functions with complete type inference. Ideal for creating
 * reusable transformation pipelines in a readable, declarative style.
 *
 * @returns a function that takes the same arguments as the first function and
 * applies the functions left to right. The result of each function is passed
 * to the next function.
 *
 * @example
 * // simple transformation chain
 * const transform = pipe(
 *   (x: number) => x * 2,
 *   x => x + 10,
 *   x => `Result: ${x}`
 * );
 * transform(5); // "Result: 20"
 *
 * @example
 * // multiple initial arguments
 * const processUser = pipe(
 *   (name: string, age: number) => ({ name, age }),
 *   user => ({ ...user, isAdult: user.age >= 18 }),
 *   user => `${user.name} (${user.isAdult ? 'adult' : 'minor'})`
 * );
 * processUser("Alice", 25); // "Alice (adult)"
 */
export function pipe(...fns: Array<(...args: unknown[]) => unknown>) {
	return (...args: unknown[]) => {
		let result = fns[0]?.(...args);
		for (let i = 1; i < fns.length; i++) {
			result = fns[i]?.(result);
		}
		return result;
	};
}

// 2 functions
export function pipeAsync<A extends unknown[], B, C>(
	fn1: (...args: A) => B | Promise<B>,
	fn2: (b: B) => C | Promise<C>,
): (...args: A) => Promise<C>;

// 3 functions
export function pipeAsync<A extends unknown[], B, C, D>(
	fn1: (...args: A) => B | Promise<B>,
	fn2: (b: B) => C | Promise<C>,
	fn3: (c: C) => D | Promise<D>,
): (...args: A) => Promise<D>;

// 4 functions
export function pipeAsync<A extends unknown[], B, C, D, E>(
	fn1: (...args: A) => B | Promise<B>,
	fn2: (b: B) => C | Promise<C>,
	fn3: (c: C) => D | Promise<D>,
	fn4: (d: D) => E | Promise<E>,
): (...args: A) => Promise<E>;

// 5 functions
export function pipeAsync<A extends unknown[], B, C, D, E, F>(
	fn1: (...args: A) => B | Promise<B>,
	fn2: (b: B) => C | Promise<C>,
	fn3: (c: C) => D | Promise<D>,
	fn4: (d: D) => E | Promise<E>,
	fn5: (e: E) => F | Promise<F>,
): (...args: A) => Promise<F>;

// 6 functions
export function pipeAsync<A extends unknown[], B, C, D, E, F, G>(
	fn1: (...args: A) => B | Promise<B>,
	fn2: (b: B) => C | Promise<C>,
	fn3: (c: C) => D | Promise<D>,
	fn4: (d: D) => E | Promise<E>,
	fn5: (e: E) => F | Promise<F>,
	fn6: (f: F) => G | Promise<G>,
): (...args: A) => Promise<G>;

// 7 functions
export function pipeAsync<A extends unknown[], B, C, D, E, F, G, H>(
	fn1: (...args: A) => B | Promise<B>,
	fn2: (b: B) => C | Promise<C>,
	fn3: (c: C) => D | Promise<D>,
	fn4: (d: D) => E | Promise<E>,
	fn5: (e: E) => F | Promise<F>,
	fn6: (f: F) => G | Promise<G>,
	fn7: (g: G) => H | Promise<H>,
): (...args: A) => Promise<H>;

// 8 functions
export function pipeAsync<A extends unknown[], B, C, D, E, F, G, H, I>(
	fn1: (...args: A) => B | Promise<B>,
	fn2: (b: B) => C | Promise<C>,
	fn3: (c: C) => D | Promise<D>,
	fn4: (d: D) => E | Promise<E>,
	fn5: (e: E) => F | Promise<F>,
	fn6: (f: F) => G | Promise<G>,
	fn7: (g: G) => H | Promise<H>,
	fn8: (h: H) => I | Promise<I>,
): (...args: A) => Promise<I>;

// 9 functions
export function pipeAsync<A extends unknown[], B, C, D, E, F, G, H, I, J>(
	fn1: (...args: A) => B | Promise<B>,
	fn2: (b: B) => C | Promise<C>,
	fn3: (c: C) => D | Promise<D>,
	fn4: (d: D) => E | Promise<E>,
	fn5: (e: E) => F | Promise<F>,
	fn6: (f: F) => G | Promise<G>,
	fn7: (g: G) => H | Promise<H>,
	fn8: (h: H) => I | Promise<I>,
	fn9: (i: I) => J | Promise<J>,
): (...args: A) => Promise<J>;

// 10 functions
export function pipeAsync<A extends unknown[], B, C, D, E, F, G, H, I, J, K>(
	fn1: (...args: A) => B | Promise<B>,
	fn2: (b: B) => C | Promise<C>,
	fn3: (c: C) => D | Promise<D>,
	fn4: (d: D) => E | Promise<E>,
	fn5: (e: E) => F | Promise<F>,
	fn6: (f: F) => G | Promise<G>,
	fn7: (g: G) => H | Promise<H>,
	fn8: (h: H) => I | Promise<I>,
	fn9: (i: I) => J | Promise<J>,
	fn10: (j: J) => K | Promise<K>,
): (...args: A) => Promise<K>;

/**
 * Composes async functions left-to-right into a single async function. Data
 * flows through each function in the order written: `pipeAsync(f, g, h)(x)`
 * equals `await h(await g(await f(x)))`.
 *
 * The first function can accept multiple arguments; subsequent functions must
 * be unary (single argument). Each function can be synchronous or asynchronous
 * - all results are awaited. Each function's return type must match the next
 * function's parameter type for full type safety.
 *
 * Always returns a Promise. Supports up to 10 functions with complete type
 * inference. Ideal for creating reusable async transformation pipelines in a
 * readable, declarative style.
 *
 * @returns a function that takes the same arguments as the first function and
 * applies the functions left to right. The result of each function is awaited
 * before being passed to the next function.
 *
 * @example
 * // all async functions
 * const fetchAndProcess = pipeAsync(
 *   (id: number) => fetch(`/api/users/${id}`),
 *   (response) => response.json(),
 *   (user) => ({ ...user, processed: true })
 * );
 * await fetchAndProcess(123);
 *
 * @example
 * // mix of sync and async functions
 * const processUser = pipeAsync(
 *   (id: number) => ({ id, name: "Alice" }),
 *   (user) => ({ ...user, timestamp: Date.now() }),
 *   saveToDb
 * );
 * await processUser(456);
 */
export function pipeAsync(...fns: Array<(...args: unknown[]) => unknown>) {
	return async (...args: unknown[]) => {
		let result = await fns[0]?.(...args);
		for (let i = 1; i < fns.length; i++) {
			result = await fns[i]?.(result);
		}
		return result;
	};
}
