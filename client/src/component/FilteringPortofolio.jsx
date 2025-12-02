import { usePortfolio, useSearchPortfolio } from "../api/getPortofolio.jsx";
import { useState } from "react";
// ... (import komponen lain)
import PortfolioDetailModal from "@/component/portfolioForm.jsx";
import ViewPortfolio from "@/component/viewPortfolio.jsx";
import DeletePortfolio from "@/component/DeletePortfolio.jsx";
import EditPortfolioModal from "@/component/EditPortfolioModal.jsx";
import PortfolioFilterModal from "@/component/portfolioFilterModal.jsx";

// Komponen Pagination Sederhana (Anda mungkin perlu membuat komponen terpisah yang lebih kompleks)
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    // Membuat array untuk nomor halaman yang akan ditampilkan
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center items-center my-4 gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
                Previous
            </button>

            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${
                        number === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'
                    }`}
                >
                    {number}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};


export default function FilteringPortfolio() {

    // --- PAGINATION STATES ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Tetapkan jumlah item per halaman
    // -------------------------

    // FILTER STATE
    const [filters, setFilters] = useState(null);

    // Default data (tanpa filter, dengan PAGINATION)
    // Asumsi: usePortfolio(page, limit) mengembalikan { data: [...], meta: {...} }
    const {
        data: defaultResponse,
        isLoading: loadingDefault,
        isFetching: isFetchingDefault // Tambahkan isFetching untuk UX yang lebih baik
    } = usePortfolio(currentPage, itemsPerPage);

    // Filtered data (pakai query search) - Di sini kita asumsikan untuk sementara
    // 'useSearchPortfolio' akan menangani pagination juga (idealnya)
    const {
        data: filteredResponse,
        isLoading: loadingFiltered,
        isFetching: isFetchingFiltered
    } = useSearchPortfolio(filters, currentPage, itemsPerPage);

    // Tentukan mana yang dipakai
    const currentResponse = filters ? filteredResponse : defaultResponse;
    const portfolios = currentResponse?.data || []; // Ambil data array
    const meta = currentResponse?.meta || {};      // Ambil metadata
    const isLoading = filters ? loadingFiltered : loadingDefault;
    const isFetching = filters ? isFetchingFiltered : isFetchingDefault;

    // ... (MODAL STATES dan openPortfolioModal tetap sama)
    const [showModal, setShowModal] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [showFilter, setShowFilter] = useState(false);

    const [portfolioData, setPortfolioData] = useState({
        view: false,
        edit: false,
        delete: false,
    });

    const openPortfolioModal = (action, item) => {
        setSelectedPortfolio(item);

        setPortfolioData({
            view: action === "view",
            edit: action === "edit",
            delete: action === "delete",
        });
    };

    // Handler untuk mengubah halaman
    const handlePageChange = (page) => {
        if (page > 0 && page <= meta.totalPages) {
            setCurrentPage(page);
        }
    };

    // Ketika filter diterapkan, set filters dan reset ke halaman 1
    const handleApplyFilters = (newFilters) => {
        setCurrentPage(1); // Reset ke halaman 1 saat filter baru diterapkan
        setFilters(newFilters);
    };


    return (
        <div className="my-6">

            {/* BUTTONS */}
            <div className="flex justify-end pt-5 px-3 gap-[30px]">
                <button
                    onClick={() => setShowFilter(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
                >
                    Find Portfolio
                </button>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
                >
                    + Add portfolio
                </button>
            </div>

            {/* TABLE */}
            <div className="mt-6 relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase border-b-2 border-blue-400">
                    <tr>
                        <th className="px-6 py-3">No</th>
                        <th className="px-6 py-3">Project Name</th>
                        <th className="px-6 py-3">Client</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Image</th>
                        <th className="px-6 py-3 text-center">Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {/* Tampilkan Indikator Loading Global dan Fetching */}
                    {isLoading || isFetching ? (
                        <tr>
                            <td colSpan="8" className="text-center p-8">
                                {isFetching ? "Mengambil data baru..." : "Memuat data awal..."}
                            </td>
                        </tr>
                    ) : portfolios && portfolios.length > 0 ? (
                        portfolios.map((item, index) => (
                            <tr key={item.id} className="border-b border-blue-200 hover:bg-blue-50">
                                {/* Hitung nomor urut yang benar */}
                                <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td className="px-6 py-4">{item.portfolioName}</td>
                                <td className="px-6 py-4">{item.companyName}</td>
                                <td className="px-6 py-4">{item.Category?.name || "-"}</td>
                                <td className="px-6 py-4">{item.description}</td>
                                <td className="px-6 py-4">{item.eventDate}</td>
                                <td className="px-6 py-4">
                                    <img src={item.image} className="w-20 h-14 object-cover rounded-md" alt={item.portfolioName} />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => openPortfolioModal("view", item)} className="text-blue-600">View</button>
                                        <button onClick={() => openPortfolioModal("edit", item)} className="text-green-600">Edit</button>
                                        <button onClick={() => openPortfolioModal("delete", item)} className="text-red-600">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-8 text-gray-500 italic">
                                Belum ada data portfolio
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION CONTROLS */}
            {meta.totalPages > 1 && !isLoading && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={meta.totalPages}
                    onPageChange={handlePageChange}
                />
            )}


            {/* MODALS */}
            {showModal && <PortfolioDetailModal onClose={() => setShowModal(false)} />}
            {showFilter && (
                <PortfolioFilterModal
                    onClose={() => setShowFilter(false)}
                    onApply={handleApplyFilters} // Gunakan handler baru
                />
            )}

            {/* ... (Modal View, Edit, Delete tetap sama) */}
            {portfolioData.view && selectedPortfolio && (
                <ViewPortfolio
                    data={selectedPortfolio}
                    onClose={() => setPortfolioData({ view: false, edit: false, delete: false })}
                />
            )}

            {portfolioData.edit && selectedPortfolio && (
                <EditPortfolioModal
                    data={selectedPortfolio}
                    onClose={() => setPortfolioData({ view: false, edit: false, delete: false })}
                />
            )}

            {portfolioData.delete && selectedPortfolio && (
                <DeletePortfolio
                    id={selectedPortfolio.id}
                    portfolio={selectedPortfolio}
                    onClose={() => setPortfolioData({ view: false, edit: false, delete: false })}
                />
            )}
        </div>
    );
}