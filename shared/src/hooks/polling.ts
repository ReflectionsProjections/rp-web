import { useCallback, useEffect, useState } from "react";
import { GettablePaths, TypedAxiosInstance } from "../api/type-wrapper";
import { APIRoutes } from "../api/types";

const usePolling = <T extends GettablePaths>(
  api: TypedAxiosInstance,
  endpoint: T,
  interval: number = 30000
) => {
  const [data, setData] = useState<APIRoutes[T]["GET"]["response"] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const isLoading = data === null && error === null;

  const fetchData = useCallback(() => {
    api
      .get(endpoint)
      .then((response) => {
        setData(response.data);
      })
      .catch((err: { error: string }) => {
        setError(err.error);
      });
  }, [api, endpoint]);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, interval);

    return () => clearInterval(id);
  }, [fetchData, interval]);

  const mutate = (updater: (prev: typeof data) => typeof data) => {
    setData((prev) => updater(prev));
  };

  const update = () => {
    fetchData();
  };

  return { data, error, isLoading, mutate, update };
};

export default usePolling;
