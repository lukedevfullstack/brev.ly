import { getUrl } from "@/app/functions/get-url";
import { urls } from "@/infra/db/schemas/urls";
import { eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getUrlByShortRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/urls/:shortUrl",
    {
      schema: {
        summary: "Get a shortened URL by short code",
        tags: ["Urls"],
        params: z.object({
          shortUrl: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            originalUrl: z.string(),
            shortUrl: z.string(),
            visitCount: z.number(),
            createdAt: z.date(),
            lastVisited: z.date().nullable(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params;

      const [url, error] = await getUrl([eq(urls.shortUrl, shortUrl)]);

      if (error || !url) {
        return reply.status(404).send({ message: "Short URL not found" });
      }

      return reply.status(200).send(url);
    }
  );
};
