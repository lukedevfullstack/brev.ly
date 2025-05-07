import { db } from "@/infra/db";
import { urls } from "@/infra/db/schemas/urls";
import { tryCatch } from "@/shared/try-catch";
import { eq, sql } from "drizzle-orm";

export const incrementVisitCount = async (shortUrl: string) => {
  return await tryCatch(() =>
    db
      .update(urls)
      .set({
        visitCount: sql`${urls.visitCount} + 1`,
        lastVisited: new Date(),
      })
      .where(eq(urls.shortUrl, shortUrl))
      .returning({ visitCount: urls.visitCount })
  );
};
