import { ValidationError } from "./Validator";

export interface ValidationResult {
    success: boolean;
    errors?: Record<string, ValidationError[]>;
    data?: any;
  }