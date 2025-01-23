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
      const schema = Yvalidator.string().minLength(3);;

      expect(schema.validate('abc').success).toBe(true); // Longitud válida
      expect(schema.validate('ab').success).toBe(false); // Longitud inválida
      expect(schema.validate(123).success).toBe(false); // No es una cadena
    });
  });
 describe('object()', () => {
    it('should create a schema that validates nested objects', () => {
      const userSchema = Yvalidator.object({
        name: Yvalidator.string().minLength(3),
        email: Yvalidator.email(),
        address: Yvalidator.object({
          city: Yvalidator.string(),
          zip: Yvalidator.string().minLength(5),
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



  describe('Yvalidator Dates', () => {
    it('should validate dates', () => {
      const schema = Yvalidator.date();
      expect(schema.validate('2023-10-01').success).toBe(true);
      expect(schema.validate('invalid-date').success).toBe(false);
    });
  
    it('should validate future dates', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1); // Fecha futura
      const schema = Yvalidator.date({ isFuture: true });
      expect(schema.validate(futureDate.toISOString()).success).toBe(true);
  
      const pastDate = new Date();
      pastDate.setFullYear(pastDate.getFullYear() - 1); // Fecha pasada
      expect(schema.validate(pastDate.toISOString()).success).toBe(false);
    });
  
    it('should validate past dates', () => {
      const pastDate = new Date();
      pastDate.setFullYear(pastDate.getFullYear() - 1); // Fecha pasada
      const schema = Yvalidator.date({ isPast: true });
      expect(schema.validate(pastDate.toISOString()).success).toBe(true);
  
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1); // Fecha futura
      expect(schema.validate(futureDate.toISOString()).success).toBe(false);
    });
  });
  
 
});
 