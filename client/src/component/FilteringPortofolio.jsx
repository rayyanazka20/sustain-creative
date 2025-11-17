import { usePortfolio, useSearchPortfolio } from "../api/getPortofolio.jsx";
import { useState } from "react";
import PortfolioDetailModal from "@/component/portfolioForm.jsx";
import ViewPortfolio from "@/component/viewPortfolio.jsx";
import DeletePortfolio from "@/component/DeletePortfolio.jsx";
import EditPortfolioModal from "@/component/EditPortfolioModal.jsx";
import PortfolioFilterModal from "@/component/portfolioFilterModal.jsx";

export default function FilteringPortfolio() {

    // FILTER STATE
    const [filters, setFilters] = useState(null);

    // Default data (tanpa filter)
    const { data: defaultPortfolio, isLoading: loadingDefault } = usePortfolio();

    // Filtered data (pakai query search)
    const { data: filteredPortfolio, isLoading: loadingFiltered } = useSearchPortfolio(filters);

    // Tentukan mana yang dipakai
    const portfolios = filters ? filteredPortfolio : defaultPortfolio;
    const isLoading = filters ? loadingFiltered : loadingDefault;

    // MODAL STATES
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
                    {isLoading ? (
                        <tr>
                            <td colSpan="8" className="text-center p-8">Loading...</td>
                        </tr>
                    ) : portfolios && portfolios.length > 0 ? (
                        portfolios.map((item, index) => (
                            <tr key={item.id} className="border-b border-blue-200 hover:bg-blue-50">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{item.portfolioName}</td>
                                <td className="px-6 py-4">{item.companyName}</td>
                                <td className="px-6 py-4">{item.Category?.name || "-"}</td>
                                <td className="px-6 py-4">{item.description}</td>
                                <td className="px-6 py-4">{item.eventDate}</td>
                                <td className="px-6 py-4">
                                    <img src={item.image} className="w-20 h-14 object-cover rounded-md" />
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

            {/* MODALS */}
            {showModal && <PortfolioDetailModal onClose={() => setShowModal(false)} />}
            {showFilter && (
                <PortfolioFilterModal
                    onClose={() => setShowFilter(false)}
                    onApply={setFilters}
                />
            )}

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
