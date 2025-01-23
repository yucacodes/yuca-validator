import { ValidationError, Validator } from '../core/Validator';

export class StringValidator implements Validator {
  validate(value: any): ValidationError {
    return typeof value === 'string' ? null : 'Value must be a string';
  }
}