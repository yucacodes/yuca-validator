import { describe, it, expect } from 'vitest';
import { DateValidator } from '../../src/validators/DateValidator';

describe('DateValidator', () => {
  it('should validate valid dates', () => {
    const validator = new DateValidator();
    expect(validator.validate('2023-10-01')).toBeNull(); // Fecha válida
    expect(validator.validate('invalid-date')).toBe('Value must be a valid date'); // Fecha inválida
  });

  it('should validate future dates', () => {
    const validator = new DateValidator({ isFuture: true });
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1); // Fecha futura
    expect(validator.validate(futureDate.toISOString())).toBeNull();

    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1); // Fecha pasada
    expect(validator.validate(pastDate.toISOString())).toBe('Value must be a future date');
  });

  it('should validate past dates', () => {
    const validator = new DateValidator({ isPast: true });
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1); // Fecha pasada
    expect(validator.validate(pastDate.toISOString())).toBeNull();

    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1); // Fecha futura
    expect(validator.validate(futureDate.toISOString())).toBe('Value must be a past date');
  });
});