import { exportUrls } from "@/app/functions/export-urls";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportUrlsRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/urls/exports",
    {
      schema: {
        summary: "Export URLs",
        tags: ["Urls"],
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery } = request.query;
  
      const { reportUrl } = await exportUrls({ searchQuery });
  
      return reply.status(200).send({ reportUrl });
    }
  );
  
};
