import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

type MyQueryResult<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData> = {
  isInFlight: boolean;
} & UseQueryResult<TData, TError>;

export const useMyQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = unknown[]
>(
  options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "initialData"> & {
    initialData?: () => undefined;
  }
): MyQueryResult<TQueryFnData, TError, TData> => {
  const query = useQuery({
    ...options,
  });

  const myQuery = query as MyQueryResult<TQueryFnData, TError, TData>;
  myQuery.isInFlight = query.fetchStatus === "fetching" && query.status === "loading";
  return myQuery;
};
