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



export const useSearchPortfolio = (filters) => {
    return useQuery({
        queryKey: ["portfolioSearch", filters],
        queryFn: async ({ queryKey }) => {
            const [, filters] = queryKey;

            const params = {};

            if (filters?.portfolioName) params.portfolioName = filters.portfolioName;
            if (filters?.category) params.categoryId = filters.category;
            if (filters?.startDate) params.startDate = filters.startDate;
            if (filters?.endDate) params.endDate = filters.endDate;

            const res = await axiosInstance.get("/portfolio/search", { params });

            return res.data.data || [];
        },
        enabled: !!filters,          // ⬅ hanya fetch saat user klik “Find”
        keepPreviousData: true,
    });
};

export const useGetGlobalPortfolio = () => {
    return useQuery({
        queryKey: ["portfolioGlobal"],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get("/portfolio/global");
                return res.data.data || [];
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    return [];
                }
                throw err;
            }
        },
    });
}

export const useSearchGlobalPortfolio = (category) => {
    return useQuery({
        queryKey: ["portfolioGlobal", category],
        queryFn: async () => {
            const res = await axiosInstance.get(`/portfolio/global/${category}`, {
                params: { category }
            });
            return res.data.data || [];
        },
    });
};





