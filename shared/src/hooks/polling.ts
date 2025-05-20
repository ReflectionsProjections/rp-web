import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchData = () => {
      api
        .get(endpoint)
        .then((response) => {
          setData(response.data);
        })
        .catch((err: { error: string }) => {
          setError(err.error);
        });
    };

    fetchData();
    const id = setInterval(fetchData, interval);

    return () => clearInterval(id);
  }, [api, endpoint, interval]);

  return { data, error, isLoading, setData };
};

export default usePolling;
