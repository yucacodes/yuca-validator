
// Exporta las clases principales
export { ObjectSchema } from './composites/ObjectSchema';
export { Schema } from './core/Schema';
export { Yvalidator } from './core/SchemaFactory';

// Exporta los validadores básicos
export { EmailValidator } from './validators/EmailValidator';
export { MinLengthValidator } from './validators/MinLengthValidator';
export { StringValidator } from './validators/StringValidator';

// Exporta tipos útiles para los usuarios de la librería
export type { ValidationError } from './core/Validator';

export type { ValidationResult } from './core/ValidationResult';
