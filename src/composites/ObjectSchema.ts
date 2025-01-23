import { Schema } from '../core/Schema';
import { ValidationResult } from '../core/ValidationResult';
import { ValidationError } from '../core/Validator';

export class ObjectSchema<T extends Record<string, Schema>> extends Schema {
  private schema: T;

  constructor(schema: T) {
    super(); // Llama al constructor de la clase base (Schema)
    this.schema = schema;
  }

  validate(data: any): ValidationResult {
    if (typeof data !== 'object' || data === null) {
      return { success: false, errors: { _global: ['Value must be an object'] } };
    }

    const errors: Record<string, ValidationError[]> = {};

    for (const key in this.schema) {
      if (this.schema.hasOwnProperty(key)) {
        const validator = this.schema[key]; 
        const value = data[key]; 

        const result = validator.validate(value);

        if (!result.success) {
          errors[key] = result.errors!._global || result.errors;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    return { success: true, data };
  }
}