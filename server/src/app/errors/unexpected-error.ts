import { BaseError } from "./base-error";

export class UnexpectedError extends BaseError {
  constructor(message = "An unexpected error occurred.") {
    super(message, 500);
  }
}
