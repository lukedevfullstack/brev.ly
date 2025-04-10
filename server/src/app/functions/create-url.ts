import { db } from "@/infra/db";
import { urls } from "@/infra/db/schemas/urls";
import { tryCatch } from "@/shared/try-catch";
import { z } from "zod";
import { InvalidFormatError } from "../errors/invalid-format-error";
import { validateShortUrl } from "./validate-short-url";

const createUrlInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z
    .string()
    .min(4)
    .max(12)
    .transform((val) => val.toLowerCase()),
});

type CreateUrlInput = z.input<typeof createUrlInput>;

export const createUrl = async (input: CreateUrlInput) => {
  const { originalUrl, shortUrl } = createUrlInput.parse(input);
  const validationError = validateShortUrl(shortUrl);

  if (validationError) {
    throw new InvalidFormatError(validationError);
  }

  return await tryCatch(() =>
    db.insert(urls).values({ originalUrl, shortUrl }).returning({
      id: urls.id,
      originalUrl: urls.originalUrl,
      shortUrl: urls.shortUrl,
      createdAt: urls.createdAt,
      visitCount: urls.visitCount,
      lastVisited: urls.lastVisited,
    })
  );
};
