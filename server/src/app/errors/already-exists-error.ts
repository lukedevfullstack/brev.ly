import { BaseError } from "./base-error";

export class AlreadyExistsError extends BaseError {
  constructor(entity = "Entity") {
    super(`${entity} already exists.`, 409);
  }
}
