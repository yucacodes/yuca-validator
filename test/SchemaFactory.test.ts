import { describe, it, expect } from 'vitest';
import { Yvalidator } from '../src/core/SchemaFactory';

describe('YucaValidator', () => {
  describe('string()', () => {
    it('should create a schema that validates strings', () => {
      const schema = Yvalidator.string();
      expect(schema.validate('hello').success).toBe(true);
      expect(schema.validate(123).success).toBe(false);
      expect(schema.validate(null).success).toBe(false);
    });
  });

  describe('email()', () => {
    it('should create a schema that validates emails', () => {
      const schema = Yvalidator.email();
      expect(schema.validate('test@example.com').success).toBe(true);
      expect(schema.validate('invalid-email').success).toBe(false);
      expect(schema.validate(123).success).toBe(false);
    });
  });

  describe('minLength()', () => {
    it('should create a validator that checks minimum length', () => {
      const minLengthValidator = Yvalidator.minLength(3);
      const schema = Yvalidator.string().addValidator(minLengthValidator);

      expect(schema.validate('abc').success).toBe(true); // Longitud válida
      expect(schema.validate('ab').success).toBe(false); // Longitud inválida
      expect(schema.validate(123).success).toBe(false); // No es una cadena
    });
  });
 describe('object()', () => {
    it('should create a schema that validates nested objects', () => {
      const userSchema = Yvalidator.object({
        name: Yvalidator.string().addValidator(Yvalidator.minLength(3)),
        email: Yvalidator.email(),
        address: Yvalidator.object({
          city: Yvalidator.string(),
          zip: Yvalidator.string().addValidator(Yvalidator.minLength(5)),
        }),
      });

      const validData = {
        name: 'John',
        email: 'john@example.com',
        address: {
          city: 'New York',
          zip: '12345',
        },
      };

      const invalidData = {
        name: 'Jo', // Nombre demasiado corto
        email: 'invalid-email', // Correo inválido
        address: {
          city: 'NY', // Ciudad válida
          zip: '123', // Código postal demasiado corto
        },
      };

      // Prueba con datos válidos
      const validResult = userSchema.validate(validData);
      expect(validResult.success).toBe(true);

      // Prueba con datos inválidos
      const invalidResult = userSchema.validate(invalidData);
      expect(invalidResult.success).toBe(false);
      expect(invalidResult.errors).toEqual({
        name: ['Value must be at least 3 characters long'],
        email: ['Value must be a valid email'],
        address: {
          zip: ['Value must be at least 5 characters long'],
        },
      });
    });
  });
 
});