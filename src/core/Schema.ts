import { DateValidator } from '../validators/DateValidator';
import { MinLengthValidator } from '../validators/MinLengthValidator';
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

  date(options: { isFuture?: boolean; isPast?: boolean } = {}): Schema {
    this.addValidator(new DateValidator(options));
    return this; // Permite encadenar métodos
  }

  minLength(length: number): this {
    this.addValidator(new MinLengthValidator(length));
    return this; // Permite encadenar métodos
  }
  
}