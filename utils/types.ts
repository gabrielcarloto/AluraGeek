export type UndefinedPartial<T> = { [P in keyof T]?: T[P] | undefined };

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
