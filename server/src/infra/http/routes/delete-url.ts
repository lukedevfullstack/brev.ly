import { ResourceNotFoundError } from "@/app/errors/resource-not-found-error";
import { UnexpectedError } from "@/app/errors/unexpected-error";
import { deleteUrl } from "@/app/functions/delete-url";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/urls/:shortUrl",
    {
      schema: {
        summary: "Delete a shortened URL",
        tags: ["Urls"],
        params: z.object({
          shortUrl: z
            .string()
            .min(4)
            .max(15)
            .transform((val) => val.toLowerCase()),
        }),
        response: {
          204: z.null().describe("URL successfully deleted"),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params;
      const [deleted, error] = await deleteUrl(shortUrl);

      if (!deleted) {
        throw new ResourceNotFoundError("URL not found");
      }

      if (error) {
        throw new UnexpectedError();
      }

      return reply.code(204).send();
    }
  );
};
