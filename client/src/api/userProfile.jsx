import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import axiosInstance from "@/api/axios.jsx";
import {logout} from "@/app/slice/authSlice.jsx";
import {useDispatch} from "react-redux";

export const useGetUserProfile = (id) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/profile/${id}`);
            return res.data.data;
        },
        enabled: !!id,
    });
};

export const useUpdateProfile = (id) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (formData) => {
            const res = await axiosInstance.put(`/profile/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["portfolio"]);
            alert("Portfolio berhasil diperbarui!");
            navigate("/admin/profile");


        },
        onError: (error) => {
            console.error("Gagal mengupdate portfolio:", error);
            alert(error.response?.data?.message || "Gagal mengupdate portfolio");
        },
    });
};

export const useUpdatePassword = (id) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (formData) => {
            const res = await axiosInstance.put(`/password/${id}`, formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            return res.data;
        },
        onSuccess: async () => {
            alert("Password updated successfully!");
            await axiosInstance.post("/logout", null, {withCredentials: true});

            dispatch(logout());
            navigate("/admin/login");
        },
        onError: (error) => {
            console.error("Gagal mengupdate password:", error);
            alert(error.response?.data?.message || "Gagal mengupdate password");
        }
    })
}
