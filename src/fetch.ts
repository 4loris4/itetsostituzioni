import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export function useFetch<T extends z.ZodTypeAny>(url: string, schema?: T) {
  const query = useQuery<z.infer<T>>({
    queryKey: [url],
    queryFn: () => fetch(url).then(response => response.json()).then((schema ?? z.any()).parse),
  });

  return {
    when: (returns: {
      data: (data: z.infer<T>) => React.ReactNode,
      loading: () => React.ReactNode,
      error: (error: Error) => React.ReactNode;
    }): React.ReactNode => {
      if (query.isPending) return returns.loading();
      if (query.isError) return returns.error(query.error);
      return returns.data(query.data);
    },
    ...query
  };
}