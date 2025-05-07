import { env } from "@/env";
import { FastifyCorsOptions } from "@fastify/cors";

const allowedOrigins = env.ALLOWED_ORIGINS.split(",");

export const corsOptions: FastifyCorsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
};
