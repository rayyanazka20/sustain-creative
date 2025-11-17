import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios.jsx";

export const useCategory = () => {
    return useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const res = await axiosInstance.get("/category");
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
