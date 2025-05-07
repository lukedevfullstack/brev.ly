export const validateShortUrl = (input: string): string | null => {
  const reserved = ["home", "redirect", "admin", "login", "export"];

  if (input.length < 4 || input.length > 15) {
    return "Short URL must be 4–15 characters long.";
  }

  const allowedCharsPattern = /^[a-z0-9._-]+$/;
  if (!allowedCharsPattern.test(input)) {
    return "Short URL may only contain lowercase letters, numbers, '.', '-' or '_'.";
  }

  if (/^[-_.]|[-_.]$/.test(input)) {
    return "Short URL cannot start or end with '-', '_' or '.'.";
  }

  if (/[-_.]{2,}/.test(input)) {
    return "Short URL cannot contain repeated or mixed special characters (e.g. '--', '__', '..', '-_', '_.' etc).";
  }

  if (reserved.includes(input)) {
    return "This short URL is reserved.";
  }

  return null;
};
