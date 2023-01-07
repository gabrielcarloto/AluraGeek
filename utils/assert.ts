export function isDefined<T = unknown>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function keysAreOfValue<O extends Record<any, unknown>, V = unknown>(
  object: O | undefined,
  value: V,
): object is O & boolean {
  if (!isDefined(object)) return false;
  return Object.keys(object).every((k) => object[k] === value);
}
