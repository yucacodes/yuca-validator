import { ValidationError, Validator } from '../core/Validator';

export class MinLengthValidator implements Validator {
  constructor(private min: number) {}

  validate(value: any): ValidationError {
    if (typeof value !== 'string') {
      return 'Value must be a string';
    }
    return value.length >= this.min ? null : `Value must be at least ${this.min} characters long`;
  }
}