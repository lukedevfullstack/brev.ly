export const normalizeUrl = (input: string): string => {
  return /^(http?:\/\/)/i.test(input) ? input : `https://${input}`;
};
