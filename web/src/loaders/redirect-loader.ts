import type { LoaderFunctionArgs } from "react-router";

export const redirectLoader = async ({ params }: LoaderFunctionArgs) => {
  const url = params.url;

  if (!url) {
    throw new Response("URL parameter is missing", { status: 400 });
  }

  const res = await fetch(`/api/visit/${url}`);

  if (!res.ok) {
    throw new Response("URL not found", { status: 404 });
  }

  const data = await res.json();
  return data;
};
