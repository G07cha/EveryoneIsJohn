declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };

export type Branded<T, B> = T & Brand<B>;

export const toBranded = <T extends Branded<unknown, unknown>>(
  value: T extends Branded<infer X, unknown> ? X : never,
): T => value as T;
