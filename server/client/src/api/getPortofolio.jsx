import axiosInstance from "./axios.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";


export const usePortfolio = () => {
    return useQuery({
        queryKey: ["portfolio"],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get("/portfolio");
                return res.data.data || [];
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    return [];
                }
                throw err;
            }
        },
    });
};

export const usePortfolioById = (id) => {
    return useQuery({
        queryKey: ["portfolio", id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/portfolio/${id}`);
            return res.data.data;
        },
        enabled: !!id,
    });
};

export const useCreatePortfolio = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();


    return useMutation({
        mutationFn: async (formData) => {
            const res = await axiosInstance.post("/portfolio", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["portfolio"]);
            alert("Portfolio berhasil dibuat!");
            navigate("/admin/dashboard");
        },
        onError: (error) => {
            console.error("Gagal menambah portfolio:", error);
            alert(error.response?.data?.message || "Gagal menambah portfolio");
        },
    });
};

export const useDeletePortfolio = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const res = await axiosInstance.delete(`/portfolio/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["portfolio"]);
        },
        onError: (error) => {
            console.error("Gagal menghapus portfolio:", error);
            alert(error.response?.data?.message || "Gagal menghapus portfolio");
        },
    });
};


export const useUpdatePortfolio = (id) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (formData) => {
            const res = await axiosInstance.put(`/portfolio/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["portfolio"]);
            alert("Portfolio berhasil diperbarui!");
            navigate("/admin/dashboard");


        },
        onError: (error) => {
            console.error("Gagal mengupdate portfolio:", error);
            alert(error.response?.data?.message || "Gagal mengupdate portfolio");
        },
    });
};

