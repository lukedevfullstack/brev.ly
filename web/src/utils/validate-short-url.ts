export const validateShortUrl = (input: string): string | null => {
  const reserved = ["home", "redirect", "admin", "login", "export"];

  if (input.length < 4 || input.length > 15) {
    return "invalid_length";
  }

  const allowedCharsPattern = /^[a-z0-9._-]+$/;
  if (!allowedCharsPattern.test(input)) {
    return "invalid_format";
  }

  if (/^[-_.]|[-_.]$/.test(input)) {
    return "invalid_edges";
  }

  if (/[-_.]{2,}/.test(input)) {
    return "invalid_sequence";
  }

  if (reserved.includes(input)) {
    return "reserved_url";
  }

  return null;
};
