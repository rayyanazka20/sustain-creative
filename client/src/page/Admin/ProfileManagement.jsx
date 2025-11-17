import SideBar from "../../component/SideBar.jsx";
import AdminHero from "@/component/AdminHero.jsx";
import AdminProfile from "@/component/AdminProfile.jsx";
import ChangePasswordForm from "@/component/EditPasswordForm.jsx";

export default function ProfileManagement() {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <div className="w-64">
                <SideBar />
            </div>

            {/* Konten utama */}
            <div className="flex-1 p-6 ">
                <AdminHero/>
                <AdminProfile/>
                <ChangePasswordForm/>
            </div>
        </div>

    )
}