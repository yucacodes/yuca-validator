import { ValidationResult } from './ValidationResult';
import { Validator, ValidationError } from './Validator';

export class Schema {
  private validators: Validator[] = [];

  constructor(validators: Validator[] = []) {
    this.validators = validators;
  }

  addValidator(validator: Validator): this {
    this.validators.push(validator);
    return this;
  }

  validate(data: any): ValidationResult {
    const errors: ValidationError[] = [];
    for (const validator of this.validators) {
      const error = validator.validate(data);
      if (error) {
        errors.push(error);
      }
    }
    return errors.length ? { success: false, errors: { _global: errors } } : { success: true, data };
  }
}