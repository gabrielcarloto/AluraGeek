export function assert(condition: unknown, message?: string | Error): asserts condition {
  if (!condition) {
    throw message instanceof Error ? message : new Error(message ?? 'Assertion failed');
  }
}

export function getENV<T extends string>(...variables: Array<T>) {
  const envVariables: Record<string, string> = {};

  variables.forEach((v) => {
    assert(process.env[v] !== undefined, `Expected environment variable ${v} to be defined`);

    envVariables[v] = process.env[v] as string;
  });

  return envVariables as Record<T, string>;
}
