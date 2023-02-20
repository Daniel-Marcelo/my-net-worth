import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useMyQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = unknown[]
>(
  options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "initialData"> & {
    initialData?: () => undefined;
  }
): UseQueryResult<TData, TError> & { isInFlight: boolean } => {
  const query = useQuery({
    ...options,
  });

  return {
    ...query,
    isInFlight: query.fetchStatus === "fetching" && query.status === "loading",
  };
};
