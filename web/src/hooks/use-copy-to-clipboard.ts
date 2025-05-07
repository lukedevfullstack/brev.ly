import { useCallback } from "react";

interface CopyOptions<T> {
  data: T;
  stringify?: boolean;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useCopyToClipboard = () => {
  const copyData = useCallback(
    <T>({ data, stringify, onSuccess, onError }: CopyOptions<T>) => {
      try {
        let text: string;

        if (typeof data === "string") {
          text = data;
        } else if (stringify === false) {
          text = String(data);
        } else {
          text = JSON.stringify(data, null, 2);
        }

        navigator.clipboard
          .writeText(text)
          .then(() => onSuccess?.())
          .catch((err) => onError?.(err));
      } catch (err) {
        onError?.(err);
      }
    },
    [],
  );

  return copyData;
};
