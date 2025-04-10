import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { tryCatch } from "@/shared/try-catch";
import { asc, count, desc, ilike } from "drizzle-orm";
import { z } from "zod";

const getUrlsInput = z.object({
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(20),
  searchQuery: z.string().optional(),
  sortBy: z.enum(["createdAt"]).optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

type GetUrlsInput = z.input<typeof getUrlsInput>;

export const getUrls = async (input: GetUrlsInput) => {
  const { page, pageSize, searchQuery, sortBy, sortDirection } =
    getUrlsInput.parse(input);

  return await tryCatch(() =>
    Promise.all([
      db
        .select({
          id: schema.urls.id,
          originalUrl: schema.urls.originalUrl,
          shortUrl: schema.urls.shortUrl,
          visitCount: schema.urls.visitCount,
          createdAt: schema.urls.createdAt,
          lastVisited: schema.urls.lastVisited,
        })
        .from(schema.urls)
        .where(
          searchQuery
            ? ilike(schema.urls.shortUrl, `%${searchQuery}%`)
            : undefined
        )
        .orderBy((fields) => {
          if (sortBy) {
            return sortDirection === "asc"
              ? asc(fields[sortBy])
              : desc(fields[sortBy]);
          }
          return desc(fields.id);
        })
        .offset((page - 1) * pageSize)
        .limit(pageSize),

      db
        .select({ total: count(schema.urls.id) })
        .from(schema.urls)
        .where(
          searchQuery
            ? ilike(schema.urls.shortUrl, `%${searchQuery}%`)
            : undefined
        ),
    ])
  );
};
