import { db } from "@/infra/db";
import { urls } from "@/infra/db/schemas/urls";
import { tryCatch } from "@/shared/try-catch";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { AlreadyExistsError } from "../errors/already-exists-error";
import { InvalidFormatError } from "../errors/invalid-format-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { UnexpectedError } from "../errors/unexpected-error";
import { getUrl } from "./get-url";
import { validateShortUrl } from "./validate-short-url";

const createUrlInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z
    .string()
    .min(4)
    .max(15)
    .transform((val) => val.toLowerCase()),
});

type CreateUrlInput = z.input<typeof createUrlInput>;

export const createUrl = async (input: CreateUrlInput) => {
  const { originalUrl, shortUrl } = createUrlInput.parse(input);
  const validationError = validateShortUrl(shortUrl);

  if (validationError) {
    throw new InvalidFormatError(validationError);
  }

  const [match, error] = await getUrl([eq(urls.shortUrl, shortUrl)]);
  
  if (!(error instanceof ResourceNotFoundError)) {
    throw new UnexpectedError()
  }

  if (match) {
    throw new AlreadyExistsError("Url");
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
