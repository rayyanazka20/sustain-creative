import { usePortfolio } from "../api/getPortofolio.jsx";
import { useState } from "react";
import PortfolioDetailModal from "@/component/portfolioForm.jsx";
import ViewPortfolio from "@/component/viewPortfolio.jsx";
import DeletePortfolio from "@/component/DeletePortfolio.jsx";
import EditPortfolioModal from "@/component/EditPortfolioModal.jsx";


export default function FilteringPortfolio() {
    const { data: portfolios, isLoading, isError } = usePortfolio();
    const [showModal, setShowModal] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);

    const [portfolioData, setPortfolioData] = useState({
        view: false,
        edit: false,
        delete: false,
    });

    const openPortfolioModal = (action, item) => {
        switch (action) {
            case "view":
                setSelectedPortfolio(item);
                setPortfolioData({ view: true, edit: false, delete: false });
                break;

            case "edit":
                setSelectedPortfolio(item);
                setPortfolioData({ view: false, edit: true, delete: false });
                break;

            case "delete":
                setSelectedPortfolio(item);
                setPortfolioData({ view: false, edit: false, delete: true });
                break;

            default:
                setPortfolioData({ view: false, edit: false, delete: false });
                break;
        }
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // const closeAllModals = () => {
    //     setPortfolioData({ view: false, edit: false, delete: false });
    //     setSelectedPortfolio(null);
    // };

    if (isError)
        return (
            <div className="mt-6 relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase border-b-2 border-blue-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Project Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Client
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Action
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td
                            colSpan="8"
                            className="text-center py-8 text-gray-500 italic"
                        >
                            Terjadi kesalahan dalam memuat data
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );

    return (
        <div className="my-6">
            {/* Filter Section (sama seperti kode kamu) */}
            {/* ... */}

            {/* Add Portfolio Button */}
            <div className="flex justify-end pt-5 px-3">
                <button
                    onClick={openModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-md transition-all"
                >
                    + Add portfolio
                </button>
            </div>

            {/* Table */}
            <div className="mt-6 relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase border-b-2 border-blue-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Project Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Client
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Action
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="8" className="text-center p-8">
                                Loading...
                            </td>
                        </tr>
                    ) : portfolios && portfolios.length > 0 ? (
                        portfolios.map((item, index) => (
                            <tr
                                key={item.id || index}
                                className="border-b border-blue-200 hover:bg-blue-50 transition-colors"
                            >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {item.portfolioName}
                                </td>
                                <td className="px-6 py-4">{item.companyName}</td>
                                <td className="px-6 py-4">{item.Category?.name || "-"}</td>
                                <td className="px-6 py-4">{item.description}</td>
                                <td className="px-6 py-4">{item.eventDate}</td>
                                <td className="px-6 py-4">
                                    <img
                                        className="w-20 h-14 object-cover rounded-md"
                                        src={item.image}
                                        alt={item.portfolioName}
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => openPortfolioModal("view", item)}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => openPortfolioModal("edit", item)}
                                            className="text-green-600 hover:text-green-800 font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openPortfolioModal("delete", item)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="8"
                                className="text-center py-8 text-gray-500 italic"
                            >
                                Belum ada data portfolio.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* 🧩 Modal */}
            {showModal && <PortfolioDetailModal onClose={closeModal} />}

            {/* ✅ View Portfolio Modal */}
            {portfolioData.view && selectedPortfolio && (
                <ViewPortfolio
                    data={selectedPortfolio}
                    onClose={() =>
                        setPortfolioData({ view: false, edit: false, delete: false })
                    }
                />
            )}

            {/* 🔹 Modal edit Portfolio */}
            {portfolioData.edit && selectedPortfolio && (
                <EditPortfolioModal
                    onClose={() =>
                        setPortfolioData({ view: false, edit: false, delete: false })
                    }
                    data={selectedPortfolio}

                />
            )}



            {/* 🔹 Modal Delete Portfolio */}
            {portfolioData.delete && selectedPortfolio && (
                <DeletePortfolio
                    id={selectedPortfolio.id}
                    portfolio={selectedPortfolio}
                    onClose={() =>
                        setPortfolioData({ view: false, edit: false, delete: false })
                    }                />
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-[111px] gap-3">
                <button>Previous</button>
                <p>1</p>
                <button>Next</button>
            </div>
        </div>
    );
}
