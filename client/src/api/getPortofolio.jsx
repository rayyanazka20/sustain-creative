import axiosInstance from "./axios.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";



export const usePortfolio = (page = 1, limit = 10) => {

    const queryKey = ["portfolio", { page, limit }];

    return useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            try {

                const res = await axiosInstance.get(`/portfolio?page=${page}&limit=${limit}`);


                return res.data;

            } catch (err) {
                if (err.response && err.response.status === 404) {

                    return { data: [], meta: { totalPages: 0, currentPage: page, totalItems: 0, itemsPerPage: limit } };
                }
                throw err;
            }
        },

        keepPreviousData: true,
        staleTime: 5000,
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



// File: ../api/getPortofolio.jsx

export const useSearchPortfolio = (filters, page = 1, limit = 10) => {

    // 1. Tambahkan page dan limit ke queryKey
    // Ini PENTING agar TanStack Query melakukan fetch ulang saat berpindah halaman
    const queryKey = ["portfolioSearch", filters, { page, limit }];

    // 2. Gunakan queryKey baru
    return useQuery({
        queryKey: queryKey,
        queryFn: async ({ queryKey }) => {

            // Destructure filters, page, dan limit dari queryKey
            const [, filters, pagination] = queryKey;

            // Parameter untuk request Axios
            const params = {
                page: pagination.page,
                limit: pagination.limit
            };

            // Tambahkan parameter filter
            if (filters?.portfolioName) params.portfolioName = filters.portfolioName;
            if (filters?.category) params.categoryId = filters.category;
            if (filters?.startDate) params.startDate = filters.startDate;
            if (filters?.endDate) params.endDate = filters.endDate;

            const res = await axiosInstance.get("/portfolio/search", { params });

            // 3. Ubah return value: Kembalikan objek response lengkap (termasuk meta)
            // Ini agar komponen FilteringPortfolio bisa mengakses meta.totalPages
            return res.data;
        },
        // Hanya fetch jika filters sudah diisi
        enabled: !!filters,
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





