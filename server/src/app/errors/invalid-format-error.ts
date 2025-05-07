import { BaseError } from "./base-error";

export class InvalidFormatError extends BaseError {
  constructor(messageOrFields?: string | string[]) {
    const message = Array.isArray(messageOrFields)
      ? `Invalid format for fields: ${messageOrFields.join(", ")}`
      : messageOrFields ?? "Invalid request format.";

    super(message, 400);
  }
}
