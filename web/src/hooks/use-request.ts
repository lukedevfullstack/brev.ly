import { env } from "@/env";
import { useCallback, useEffect, useRef, useState } from "react";
interface RequestOptions<TBody, TParams, TData, TError> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: TBody;
  params?: TParams;
  headers?: Record<string, string>;
  mode?: RequestMode;
  onSuccess?: (data: TData, response: Response) => void;
  onError?: (error: TError, response?: Response) => void;
}

interface UseRequestReturn<TData, TError, TBody, TParams> {
  data: TData | null;
  error: TError | null;
  loading: boolean;
  sendRequest: (
    url: string,
    options?: RequestOptions<TBody, TParams, TData, TError>,
  ) => void;
  abortRequest: () => void;
}

export const useRequest = <
  TData = unknown,
  TError = unknown,
  TBody = unknown,
  TParams = Record<string, string>,
>(): UseRequestReturn<TData, TError, TBody, TParams> => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendRequest = useCallback(
    (path: string, options?: RequestOptions<TBody, TParams, TData, TError>) => {
      setData(null);
      setError(null);
      setLoading(true);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const fetchOptions: RequestInit = {
        method: options?.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        },
        signal: abortController.signal,
        mode: options?.mode,
      };

      if (options?.body) {
        fetchOptions.body = JSON.stringify(options.body);
      }
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;
      const query = options?.params
        ? `?${new URLSearchParams(options.params)}`
        : "";
      const url = `${env.VITE_API_BASE_URL}${normalizedPath}${query}`;
      fetch(
        url + "?" + new URLSearchParams(options?.params ?? {}).toString(),
        fetchOptions,
      )
        .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const typedError = errorData as TError;
            throw { error: typedError, response };
          }

          const contentType = response.headers.get("content-type");
          const isJson = contentType?.includes("application/json");

          const responseData: TData = isJson
            ? await response.json()
            : (undefined as TData);

          setData(responseData);
          options?.onSuccess?.(responseData, response);
        })
        .catch((err) => {
          if (abortController.signal.aborted) {
            console.log("Request aborted");
            return;
          }

          const extractedError = (
            err && "error" in err ? err.error : err
          ) as TError;
          const response =
            err && "response" in err ? (err.response as Response) : undefined;

          setError(extractedError);
          options?.onError?.(extractedError, response);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [],
  );

  const abortRequest = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return { data, error, loading, sendRequest, abortRequest };
};
