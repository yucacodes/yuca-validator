import { Validator, ValidationError } from '../core/Validator';

export class DateValidator implements Validator {
  private options: {
    isFuture?: boolean;
    isPast?: boolean;
  };

  constructor(options: { isFuture?: boolean; isPast?: boolean } = {}) {
    this.options = options;
  }

  validate(value: any): ValidationError {
    // Verifica si el valor es una fecha válida
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'Value must be a valid date';
    }

    // Verifica si la fecha debe ser futura
    if (this.options.isFuture && date <= new Date()) {
      return 'Value must be a future date';
    }

    // Verifica si la fecha debe ser pasada
    if (this.options.isPast && date >= new Date()) {
      return 'Value must be a past date';
    }

    // Si pasa todas las validaciones, devuelve null
    return null;
  }
}