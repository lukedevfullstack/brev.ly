import { db } from "@/infra/db";
import { urls } from "@/infra/db/schemas/urls";
import { tryCatch } from "@/shared/try-catch";
import { eq } from "drizzle-orm";

export const deleteUrl = async (shortUrl: string) => {
  return await tryCatch(() =>
    db.delete(urls).where(eq(urls.shortUrl, shortUrl))
  );
};
