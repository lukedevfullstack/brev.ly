import { BaseError } from "./base-error";

export class InvalidFormatError extends BaseError {
  constructor(fields?: string[]) {
    super(
      fields && fields.length > 0
        ? `Invalid format for fields: ${fields.join(", ")}`
        : "Invalid request format.",
      400
    );
  }
}
