export type MaybeArray<T> = T | Array<T>;

export const isArray = <T>(v: MaybeArray<T>): boolean => {
  return Array.isArray(v);
};