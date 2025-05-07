import { getUrls } from "@/app/functions/get-urls";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getUrlsRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/urls",
    {
      schema: {
        summary: "Get shortened URLs",
        tags: ["Urls"],
        querystring: z.object({
          page: z.coerce.number().optional().default(1),
          pageSize: z.coerce.number().optional().default(20),
          searchQuery: z.string().optional(),
          sortBy: z.enum(["createdAt"]).optional(),
          sortDirection: z.enum(["asc", "desc"]).optional(),
        }),
        response: {
          200: z.object({
            total: z.number(),
            urls: z.array(
              z.object({
                id: z.string(),
                originalUrl: z.string(),
                shortUrl: z.string(),
                visitCount: z.number(),
                createdAt: z.date(),
                lastVisited: z.date().nullable(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, pageSize, searchQuery, sortBy, sortDirection } =
        request.query;
      const [res, error] = await getUrls({
        page,
        pageSize,
        searchQuery,
        sortBy,
        sortDirection,
      });

      if (error) throw error;
      const [urls, [{ total }]] = res as NonNullable<typeof res>;

      return reply.status(200).send({
        urls,
        total,
      });
    }
  );
};
