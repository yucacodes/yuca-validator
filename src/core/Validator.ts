export type ValidationError = string | null;

export interface Validator<T = any> {
  validate(value: T): ValidationError;
}