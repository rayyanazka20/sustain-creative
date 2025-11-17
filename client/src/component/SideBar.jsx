import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logout} from "../app/slice/authSlice";
import axiosInstance from "../api/axios.jsx";
import {useState} from "react"; // pastikan path-nya benar

export default function SideBar() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        setLoading(true);
        setError("");
        try {
            // POST logout, dengan credentials di config, bukan body
            await axiosInstance.post("/logout", null, { withCredentials: true });

            // Hapus user & token dari redux
            dispatch(logout());

            alert("Logout berhasil!");
            navigate("/admin/login"); // arahkan ke halaman login
        } catch (err) {
            console.error("Logout gagal:", err);
            setError(err.response?.data?.message || "Terjadi kesalahan saat logout.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-full w-full max-w-[20rem] flex-col rounded-xl bg-white p-4 text-gray-700 shadow-xl">
            {/* Header */}
            <div className="p-4 mb-4 flex flex-col items-center">
                <img src="/src/assets/logos.svg" alt="logo" className="mb-2" />
                <h1 className="text-[14px] font-semibold text-blue-gray-900">
                    Admin Dashboard
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 text-base text-blue-gray-700">
                {/* Dashboard */}
                <button
                    onClick={() => navigate("/admin/dashboard")}
                    className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition-all ${
                        isActive("/admin/dashboard")
                            ? "bg-blue-100 text-blue-600 font-semibold"
                            : "hover:bg-blue-gray-50"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-5 h-5 ${
                            isActive("/admin/dashboard") ? "text-blue-600" : "text-blue-gray-700"
                        }`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h12a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zM9 9.75a.75.75 0 011.5 0V15a.75.75 0 01-1.5 0V9.75zm4.5 0a.75.75 0 011.5 0V15a.75.75 0 01-1.5 0V9.75z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>Dashboard</span>
                </button>

                {/* Profile Management */}
                <button
                    onClick={() => navigate("/admin/profile")}
                    className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition-all ${
                        isActive("/admin/profile")
                            ? "bg-blue-100 text-blue-600 font-semibold"
                            : "hover:bg-blue-gray-50"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-5 h-5 ${
                            isActive("/admin/profile") ? "text-blue-600" : "text-blue-gray-700"
                        }`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zM12 15a7.486 7.486 0 00-5.855 2.812A8.224 8.224 0 0012 20.25a8.224 8.224 0 005.855-2.438A7.486 7.486 0 0012 15zm3.75-6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>Profile Management</span>
                </button>

                {/* Logout */}
                <button
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-all w-full text-left"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                    />
                </svg>
                <span>{loading ? "Logging out..." : "Logout"}</span>
            </button>

                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </nav>
        </div>
    );
}
