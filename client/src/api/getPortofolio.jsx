import axiosInstance from "./axios.jsx";
import { useQuery } from "@tanstack/react-query";

export const usePortfolio = () => {
    return useQuery({
        queryKey: ["portfolio"],
        queryFn: async () => {
            const res = await axiosInstance.get("/portfolio"); // axiosInstance sudah handle Authorization header
            return res.data.data; // ambil array portfolio dari response { message, data }
        },
        staleTime: 5 * 60 * 1000, // cache 5 menit
        refetchOnWindowFocus: false, // tidak auto refetch saat tab kembali aktif
    });
};
