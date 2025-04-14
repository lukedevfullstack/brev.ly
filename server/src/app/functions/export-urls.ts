import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { tryCatch } from "@/shared/try-catch";
import { stringify } from "csv-stringify";
import { ilike } from "drizzle-orm";
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { z } from "zod";
import { UnexpectedError } from "../errors/unexpected-error";

const exportUrlsInput = z.object({
  searchQuery: z.string().optional(),
});

type ExportUrlsInput = z.input<typeof exportUrlsInput>;

type ExportUrlsOutput = {
  reportUrl: string;
};

export const exportUrls = async(
  input: ExportUrlsInput
) => {
  const { searchQuery } = exportUrlsInput.parse(input);

  const { sql, params } = db
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
      searchQuery ? ilike(schema.urls.shortUrl, `%${searchQuery}%`) : undefined
    )
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(1);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "id", header: "ID" },
      { key: "original_url", header: "Original URL" },
      { key: "short_url", header: "Short URL" },
      { key: "visit_count", header: "Visit count" },
      { key: "created_at", header: "Created at" },
      { key: "last_visited", header: "Last visited at" },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const convertToCSVPipeLine = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }
        callback();
      },
    }),
    csv,
    uploadToStorageStream
  );

  const uploadToStorage = uploadFileToStorage({
    contentType: "text/csv",
    folder: "urls",
    fileName: `${new Date().toISOString()}-urls.csv`,
    contentStream: uploadToStorageStream,
  });

  const [url, error] = await tryCatch(() => Promise.all([uploadToStorage, convertToCSVPipeLine]))

  if (error || !url) {
    throw new UnexpectedError("Failed to execute operation")
  }

  return { reportUrl: url as NonNullable<typeof url>}
}
