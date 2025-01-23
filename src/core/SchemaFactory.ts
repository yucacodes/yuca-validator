import { Schema } from './Schema';
import { ObjectSchema } from '../composites/ObjectSchema';
import { StringValidator } from '../validators/StringValidator';
import { EmailValidator } from '../validators/EmailValidator';
import { MinLengthValidator } from '../validators/MinLengthValidator';
import { Validator } from './Validator';

export class Yvalidator {
  static string(): Schema {
    return new Schema([new StringValidator()]);
  }

  static email(): Schema {
    return new Schema([new StringValidator(), new EmailValidator()]);
  }

  static minLength(length: number): Validator {
    return new MinLengthValidator(length);
  }

  static object<T extends Record<string, Schema>>(schema: T): ObjectSchema<T> {
    return new ObjectSchema(schema);
  }
}