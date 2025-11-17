import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/slice/authSlice.jsx";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios.jsx";

export default function LoginForm() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axiosInstance.post("/login", formData, { withCredentials: true });

            // Simpan data ke Redux
            dispatch(
                login({
                    user: res.data.user,
                    token: res.data.accessToken,
                })
            );

            alert("Login berhasil!");
            navigate("/admin/dashboard");
        } catch (err) {
            console.error("Login gagal:", err);
            setError(err.response?.data?.message || "Terjadi kesalahan saat login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="name@company.com"
                        className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-[#0957C3] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                {loading ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
}
