import { ResourceNotFoundError } from "@/app/errors/resource-not-found-error";
import { UnexpectedError } from "@/app/errors/unexpected-error";
import { getUrl } from "@/app/functions/get-url";
import { incrementVisitCount } from "@/app/functions/increment-visit-count";
import { urls } from "@/infra/db/schemas/urls";
import { eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const visitUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/visit/:shortUrl",
    {
      schema: {
        summary: "Visit a shortened URL",
        tags: ["Urls"],
        params: z.object({
          shortUrl: z
            .string()
            .min(4)
            .max(15)
            .transform((val) => val.toLowerCase()),
        }),
        response: {
          302: z.any(),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params;

      const [urlData, getUrlError] = await getUrl([
        eq(urls.shortUrl, shortUrl),
      ]);

      if (!urlData) {
        throw new ResourceNotFoundError("URL not found");
      }

      if (getUrlError) {
        throw new UnexpectedError();
      }

      const [incrementResult, incrementError] = await incrementVisitCount(
        urlData.shortUrl
      );

      if (incrementError || !incrementResult?.[0]) {
        throw new UnexpectedError();
      }

      return reply.redirect(urlData.originalUrl);
    }
  );
};
