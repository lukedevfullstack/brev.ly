import { BaseError } from "./base-error";

export class ResourceNotFoundError extends BaseError {
  constructor(entity = "Resource") {
    super(`${entity} not found.`, 404);
  }
}
