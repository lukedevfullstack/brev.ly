import { errorHandler } from "@/shared/error-handler";
import { fastifyCors } from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createUrlRoute } from "./routes/create-url";
import { deleteUrlRoute } from "./routes/delete-url";
import { exportUrlsRoute } from "./routes/export-urls";
import { getUrlByShortRoute } from "./routes/get-url-by-short";
import { getUrlsRoute } from "./routes/get-urls";
import { visitUrlRoute } from "./routes/visit-url";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, _, reply) => errorHandler(reply, error));

server.register(fastifyCors, { origin: "*" });

server.register(rateLimit, {
  max: 120,
  timeWindow: "1 minute",
  errorResponseBuilder: () => ({
    statusCode: 429,
    error: "Too Many Requests",
    message:
      "You have exceeded the allowed request limit. Please try again later.",
  }),
});

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brevly Server",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(createUrlRoute);
server.register(getUrlsRoute);
server.register(getUrlByShortRoute);
server.register(deleteUrlRoute);
server.register(visitUrlRoute);
server.register(exportUrlsRoute);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP Server running!!");
});
