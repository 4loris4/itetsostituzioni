import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export default function useFetch<T extends z.ZodTypeAny>(url: string, schema?: T) {
  const query = useQuery<z.infer<T>>({
    queryKey: [url],
    queryFn: () => {
      return fetch(url).then(response => response.json()).then((schema ?? z.any()).parse); //TODO uncomment
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fetch(url).then(response => response.json()).then((schema ?? z.any()).parse));
        }, 3000);
      });
    },
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