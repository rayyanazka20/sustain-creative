import { useState } from "react";
import { useCategory } from "@/api/getCatefory.jsx";

export default function PortfolioFilterModal({ onClose, onApply }) {
    const [filters, setFilters] = useState({
        portfolioName: "",
        category: "",
        startDate: "",
        endDate: "",
    });

    const { data: categories, isLoading, isError } = useCategory();

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-xl font-semibold mb-4">Find Portfolio</h2>

                <input
                    placeholder="Portfolio Name"
                    className="w-full border p-2 mb-3 rounded"
                    value={filters.portfolioName}
                    onChange={(e) =>
                        setFilters({ ...filters, portfolioName: e.target.value })
                    }
                />

                <select
                    className="w-full border p-2 mb-3 rounded"
                    value={filters.category}
                    onChange={(e) =>
                        setFilters({ ...filters, category: e.target.value })
                    }
                >
                    <option value="">All Category</option>

                    {!isLoading && !isError && categories ? (
                        categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))
                    ) : (
                        <option disabled>Loading...</option>
                    )}
                </select>

                <label className="text-sm font-medium">Start Date</label>
                <input
                    type="date"
                    className="w-full border p-2 mb-3 rounded"
                    value={filters.startDate}
                    onChange={(e) =>
                        setFilters({ ...filters, startDate: e.target.value })
                    }
                />

                <label className="text-sm font-medium">End Date</label>
                <input
                    type="date"
                    className="w-full border p-2 mb-3 rounded"
                    value={filters.endDate}
                    onChange={(e) =>
                        setFilters({ ...filters, endDate: e.target.value })
                    }
                />

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                        onClick={() => {
                            setFilters({ portfolioName: "", category: "", startDate: "", endDate: "" }); // reset state lokal
                            onApply(null); // kirim null supaya FE pakai default semua data
                            onClose();
                        }}
                    >
                        Reset
                    </button>

                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={() => {
                            onApply(filters);
                            onClose();
                        }}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}
