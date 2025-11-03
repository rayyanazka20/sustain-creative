import SideBar from "../../component/SideBar.jsx";
import AdminHero from "../../component/AdminHero.jsx";
import FilteringPortfolio from "../../component/FilteringPortofolio.jsx";

export default function Dashboard() {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <div className="w-64">
                <SideBar />
            </div>

            {/* Konten utama */}
            <div className="flex-1 p-6 ">
                <AdminHero/>
                <FilteringPortfolio/>
            </div>
        </div>
    );
}
