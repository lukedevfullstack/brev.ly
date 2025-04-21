export const validateShortUrl = (input: string): string | null => {
  const reserved = ["home", "redirect", "admin", "login", "export"];

  if (input.length < 4 || input.length > 15) {
    return "O link encurtado deve ter entre 4 e 15 caracteres.";
  }

  const allowedCharsPattern = /^[a-z0-9._-]+$/;
  if (!allowedCharsPattern.test(input)) {
    return "O link encurtado deve conter apenas letras minúsculas, números, '.' (ponto), '-' (hífen) ou '_' (sublinhado).";
  }

  if (/^[-_.]|[-_.]$/.test(input)) {
    return "O link encurtado não pode começar ou terminar com '.', '-', ou '_'.";
  }

  if (/[-_.]{2,}/.test(input)) {
    return "O link encurtado não pode conter caracteres especiais repetidos ou misturados (ex: '--', '__', '..', '-_', '_.' etc).";
  }

  if (reserved.includes(input)) {
    return "Este link encurtado é reservado.";
  }

  return null;
};
