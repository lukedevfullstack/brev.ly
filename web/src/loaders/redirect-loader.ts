import type { LoaderFunctionArgs } from "react-router";

export const redirectLoader = async ({ params }: LoaderFunctionArgs) => {
  const url = params.url;

  if (!url) {
    throw new Error("URL parameter is missing");
  }
  
  const res = await fetch(`/api/urls/${url}`);

  if (!res) {
    throw new Error("Failed to fetch the URL data");
  }

  return res.json();
};
