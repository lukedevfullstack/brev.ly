export const normalizeUrl = (input: string): string => {
  return /^(https?:\/\/)/i.test(input) ? input : `https://${input}`;
};
