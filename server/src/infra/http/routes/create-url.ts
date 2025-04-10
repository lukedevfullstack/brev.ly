import { InvalidFormatError } from "@/app/errors/invalid-format-error";
import { createUrl } from "@/app/functions/create-url";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/urls",
    {
      schema: {
        summary: "Create a shortened URL",
        tags: ["Urls"],
        body: z.object({
          originalUrl: z.string().url(),
          shortUrl: z
            .string()
            .min(4)
            .max(12)
            .transform((val) => val.toLowerCase()),
        }),
        response: {
          201: z
            .array(
              z.object({
                id: z.string(),
                originalUrl: z.string(),
                shortUrl: z.string(),
                visitCount: z.number(),
                createdAt: z.date(),
                lastVisited: z.date().nullable(),
              })
            )
            .describe("Short URLs created"),
          400: z
            .object({ message: z.string() })
            .describe("Invalid format error"),
          409: z
            .object({ message: z.string() })
            .describe("Already exists error"),
          500: z.object({ message: z.string() }).describe("Unexpected error"),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body;
      if (!originalUrl || !shortUrl) {
        throw new InvalidFormatError();
      }

      const [newUrl, err] = await createUrl({
        originalUrl,
        shortUrl,
      });

      if (err) throw err;

      return reply.code(201).send(newUrl);
    }
  );
};
