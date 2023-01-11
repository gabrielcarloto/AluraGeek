import assert from 'assert';

export function getENV<T extends string>(...variables: Array<T>) {
  const envVariables: Record<string, string> = {};

  variables.forEach((v) => {
    assert(
      process.env[v] !== undefined,
      `Expected environment variable ${v} to be defined`,
    );

    envVariables[v] = process.env[v] as string;
  });

  return envVariables as Record<T, string>;
}
