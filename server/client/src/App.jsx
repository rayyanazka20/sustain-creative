import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./component/ProtectedRoute.jsx";

// Lazy load semua halaman
const HomePage = lazy(() => import("./page/Home/Home.jsx"));
const LoginPage = lazy(() => import("./page/Admin/LoginPage.jsx"));
const Dashboard = lazy(() => import("./page/Admin/PortofolioDashboard.jsx"));
const ProfileManagement = lazy(() => import("./page/Admin/ProfileManagement.jsx"));

// Buat query client
const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
                <Routes>
                    {/* Halaman publik */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/admin/login" element={<LoginPage />} />

                    {/* Halaman admin (protected) */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/profile"
                        element={
                            <ProtectedRoute>
                                <ProfileManagement />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </QueryClientProvider>
    );
}
