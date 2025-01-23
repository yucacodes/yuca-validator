import { describe, it, expect } from 'vitest';
import { StringValidator } from '../../src/validators/StringValidator';

describe('StringValidator', () => {
  it('should return null for valid strings', () => {
    const validator = new StringValidator();
    expect(validator.validate('hello')).toBeNull();
    expect(validator.validate('')).toBeNull();
  });

  it('should return an error message for non-string values', () => {
    const validator = new StringValidator();
    expect(validator.validate(123)).toBe('Value must be a string');
    expect(validator.validate(null)).toBe('Value must be a string');
    expect(validator.validate(undefined)).toBe('Value must be a string');
    expect(validator.validate({})).toBe('Value must be a string');
  });
});