import { normalizeUrl } from "./normalize-url";

export const validateLongUrl = (input: string): string | null => {
  if (!input || input.trim() === "") {
    return "field_is_required";
  }

  const normalized = normalizeUrl(input);

  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    return "invalid_url";
  }

  const isLocalhost = url.hostname === "localhost";

  if (!isLocalhost && !url.hostname.includes(".")) {
    return "invalid_domain";
  }

  if (!isLocalhost && url.hostname.endsWith(".")) {
    return "invalid_last_char";
  }

  return null;
};