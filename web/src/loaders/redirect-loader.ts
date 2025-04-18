import type { LoaderFunctionArgs } from "react-router";

export const redirectLoader = async ({ params }: LoaderFunctionArgs) => {
  const url = params.url;

  if (!url) {
    throw new Error("URL parameter is missing");
  }

  const res = await fetch(`/api/visit/${url}`);

  if (!res.ok) throw new Error("URL not found");

  const data = await res.json();

  return Response.redirect(data.originalUrl, 302);
};
