import { ValidationError } from 'class-validator';

export function transformError(errors: ValidationError[]) {
  const error: { [key: string]: string } = {};
  errors.forEach((errorItem) => {
    const messageKey = Object.keys(errorItem.constraints);
    const fieldName = errorItem.property;
    if (
      (fieldName && messageKey.length, errorItem.constraints[messageKey[0]])
    ) {
      error[fieldName] = errorItem.constraints[messageKey[0]];
    }
  });
  return error;
}
