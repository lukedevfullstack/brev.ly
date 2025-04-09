import { BaseError } from "@/app/errors/base-error";
import { DrizzleError } from "drizzle-orm";
import type { FastifyReply } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";

export const errorHandler = (reply: FastifyReply, error: unknown) => {
  if (error instanceof BaseError) {
    return reply.code(error.code).send({ message: error.message });
  }

  if (error instanceof DrizzleError) {
    return reply.code(409).send({ message: "Entity already exists" });
  }

  if (typeof error === "object" && hasZodFastifySchemaValidationErrors(error)) {
    return reply.code(400).send({
      message: "Validation error",
      issues: error.validation,
    });
  }

  const fallbackMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "An unexpected error occurred.";

  return reply.code(500).send({ message: fallbackMessage });
}
