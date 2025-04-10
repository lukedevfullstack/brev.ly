export const validateShortUrl = (input: string): string | null => {
  const reserved = ["home", "redirect", "admin", "login", "export"];
  const pattern = /^[a-z0-9]{4,12}$/;

  if (!pattern.test(input)) {
    return "Short URL must be 4–12 lowercase alphanumeric characters.";
  }

  if (reserved.includes(input)) {
    return "This short URL is reserved.";
  }

  return null;
};
