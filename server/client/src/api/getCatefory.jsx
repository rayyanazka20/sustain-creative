import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios.jsx";

export const useCategory = () => {
    return useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const res = await axiosInstance.get("/category");
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 🕒 5 menit cache
        keepPreviousData: true,   // ✅ Data lama tidak hilang saat modal muncul
        refetchOnWindowFocus: false, // ❌ Jangan refetch saat tab di-focus
        refetchOnMount: false,       // ❌ Jangan refetch saat modal mount ulang
    });
};
