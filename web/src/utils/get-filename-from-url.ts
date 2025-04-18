/**
 * Extracts the filename from the end of the given URL path.
 *
 * @param {string} url - The full URL from which to extract the filename.
 * @returns {string} - The extracted filename.
 * @throws {Error} - If no valid filename is found in the URL.
 */
export const getFilenameFromUrl = (url: string): string => {
  const pathname = new URL(url).pathname;
  const segments = pathname.split("/").filter(Boolean);
  const filename = segments.at(-1);
  if (!filename) {
    throw new Error("URL does not contain a valid filename");
  }
  return filename;
};
