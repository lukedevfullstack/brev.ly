/**
 * Triggers a browser download for a given Blob and filename.
 *
 * @param {Blob} blob - The file data to be downloaded.
 * @param {string} filename - The name the downloaded file should have.
 */
export const triggerDownloadFromBlob = (blob: Blob, filename: string) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
