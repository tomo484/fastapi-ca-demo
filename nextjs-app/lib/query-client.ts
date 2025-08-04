import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 3,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 3,
            onError: (error) => {
                console.error("Mutation Error:", error);
            },
        },
    },
});