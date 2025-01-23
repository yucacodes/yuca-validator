import { Schema } from './Schema';
import { ObjectSchema } from '../composites/ObjectSchema';
import { StringValidator } from '../validators/StringValidator';
import { EmailValidator } from '../validators/EmailValidator';
import { MinLengthValidator } from '../validators/MinLengthValidator';
import { DateValidator } from '../validators/DateValidator';

export class Yvalidator {
  static string(): Schema {
    return new Schema([new StringValidator()]);
  }

  static email(): Schema {
    return new Schema([new StringValidator(), new EmailValidator()]);
  }

  static minLength(length: number): Schema {
    return  new Schema([ new MinLengthValidator(length)]);
  }

  static date(options: { isFuture?: boolean; isPast?: boolean } = {}) : Schema {
    return new Schema([new DateValidator(options)]);
  }

  static object<T extends Record<string, Schema>>(schema: T): ObjectSchema<T> {
    return new ObjectSchema(schema);
  }
}