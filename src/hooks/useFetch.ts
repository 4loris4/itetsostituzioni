import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export default function useFetch<T extends z.ZodTypeAny>(url: string, schema?: T) {
  const query = useQuery<z.infer<T>>({
    queryKey: [url],
    networkMode: "offlineFirst",
    queryFn: () => fetch(url).then(response => response.json()).then((schema ?? z.any()).parse),
  });

  return {
    when: <U, V, W>({ data, loading, error, showWhileFetching = true }: {
      data: (data: z.infer<T>) => U,
      loading: () => V,
      error: (error: Error) => W,
      showWhileFetching?: boolean,
    }) => {
      if (query.isPending || (!showWhileFetching && query.isFetching)) return loading();
      if (query.isError) return error(query.error);
      return data(query.data);
    },
    ...query
  };
}