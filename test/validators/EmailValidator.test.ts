import { describe, it, expect } from 'vitest';
import { EmailValidator } from '../../src/validators/EmailValidator';

describe('EmailValidator', () => {
  it('should return null for valid emails', () => {
    const validator = new EmailValidator();
    expect(validator.validate('test@example.com')).toBeNull();
    expect(validator.validate('user.name+tag+sorting@example.com')).toBeNull();
  });

  it('should return an error message for invalid emails', () => {
    const validator = new EmailValidator();
    expect(validator.validate('invalid-email')).toBe('Value must be a valid email');
    expect(validator.validate('test@')).toBe('Value must be a valid email');
    expect(validator.validate('@example.com')).toBe('Value must be a valid email');
    expect(validator.validate('test@example')).toBe('Value must be a valid email');
  });

  it('should return an error message for non-string values', () => {
    const validator = new EmailValidator();
    expect(validator.validate(123)).toBe('Value must be a valid email');
    expect(validator.validate(null)).toBe('Value must be a valid email');
    expect(validator.validate(undefined)).toBe('Value must be a valid email');
    expect(validator.validate({})).toBe('Value must be a valid email');
  });
});