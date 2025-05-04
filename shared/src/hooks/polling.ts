import { useEffect, useState } from "react";
import { GettablePaths, TypedAxiosInstance } from "../api/type-wrapper";
import { APIRoutes } from "../api/types";

export type Transformer<T extends GettablePaths> = (
  data: APIRoutes[T]["GET"]["response"]
) => number;

const usePolling = <T extends GettablePaths>(
  api: TypedAxiosInstance,
  endpoint: T,
  transformer: Transformer<T>,
  interval: number = 5000
) => {
  const [data, setData] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isLoading = data === null && error === null;

  useEffect(() => {
    let isCancelled = false;

    const fetchData = () => {
      api
        .get(endpoint)
        .then((response) => {
          if (!isCancelled) {
            setData(transformer(response.data));
          }
        })
        .catch((err: { error: string }) => {
          if (!isCancelled) {
            setError(err.error);
          }
        });
    };

    fetchData();
    const id = setInterval(fetchData, interval);

    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [api, endpoint, transformer, interval]);

  return { data, error, isLoading };
};

export default usePolling;
