import { describe, it, expect } from 'vitest';
import { MinLengthValidator } from '../../src/validators/MinLengthValidator';

describe('MinLengthValidator', () => {
  it('should return null for strings with sufficient length', () => {
    const validator = new MinLengthValidator(3);
    expect(validator.validate('abc')).toBeNull();
    expect(validator.validate('abcd')).toBeNull();
  });

  it('should return an error message for strings that are too short', () => {
    const validator = new MinLengthValidator(3);
    expect(validator.validate('ab')).toBe('Value must be at least 3 characters long');
    expect(validator.validate('')).toBe('Value must be at least 3 characters long');
  });

  it('should return an error message for non-string values', () => {
    const validator = new MinLengthValidator(3);
    expect(validator.validate(123)).toBe('Value must be a string');
    expect(validator.validate(null)).toBe('Value must be a string');
    expect(validator.validate(undefined)).toBe('Value must be a string');
    expect(validator.validate({})).toBe('Value must be a string');
  });
});