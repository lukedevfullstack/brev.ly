import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { fakerPT_BR as faker } from "@faker-js/faker";
import type { InferInsertModel } from "drizzle-orm";

export const makeUrl = async (
  overrides?: Partial<InferInsertModel<typeof schema.urls>>
) => {
  const originalUrl = faker.internet.url();
  const shortUrl = faker.string.alphanumeric(8).toLowerCase();

  const result = await db
    .insert(schema.urls)
    .values({
      originalUrl,
      shortUrl,
      ...overrides,
    })
    .returning();

  return result[0];
};
