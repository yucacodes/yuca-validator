import { ValidationError, Validator } from '../core/Validator';

export class EmailValidator implements Validator {
  private emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  validate(value: any): ValidationError {
    return this.emailPattern.test(value) ? null : 'Value must be a valid email';
  }
}