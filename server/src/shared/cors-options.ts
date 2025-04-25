import { env } from "@/env";
import { FastifyCorsOptions } from "@fastify/cors";

const allowedOrigins = env.ALLOWED_ORIGINS.split(",");

export const corsOptions: FastifyCorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
};
