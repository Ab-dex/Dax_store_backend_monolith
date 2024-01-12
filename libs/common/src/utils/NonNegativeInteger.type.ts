export type NonnegativeInteger<T extends number> = `${T}` extends
  | `-${any}`
  | `${any}.${any}`
  ? never
  : T;

type PositiveInteger<T extends number> = `${T}` extends
  | '0'
  | `-${any}`
  | `${any}.${any}`
  ? never
  : T;
