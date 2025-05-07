import { db } from "@/infra/db";
import { tryCatch } from "@/shared/try-catch";
import type { SQL } from "drizzle-orm";
import { and } from "drizzle-orm";

export const getUrl = async (conditions: SQL<unknown>[]) => {
  return await tryCatch(() =>
    db.query.urls.findFirst({
      where: and(...conditions),
    })
  );
};