import { normalizeUrl } from "./normalize-url";

export const validateLongUrl = (input: string): string | null => {
  if (!input || input.trim() === "") {
    return "O link original é obrigatório.";
  }

  const normalized = normalizeUrl(input);

  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    return "Insira um link válido.";
  }

  if (!url.hostname.includes(".")) {
    return "O link deve conter um domínio válido (ex: '.com').";
  }

  if (url.hostname.endsWith(".")) {
    return "O domínio não pode terminar com um ponto.";
  }

  return null;
};
