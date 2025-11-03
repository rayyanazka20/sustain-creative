import { usePortfolio } from "../api/getPortofolio.jsx";

export default function FilteringPortfolio() {
    const { data: portfolios, isLoading, isError } = usePortfolio();

    if (isLoading)
        return <p className="text-center mt-10">Loading portfolio...</p>;
    if (isError)
        return <p className="text-center mt-10 text-red-500">Error saat mengambil portfolio</p>;

    return (
        <div className="my-6">
            {/* 🔍 Filter & Search Section */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-md">
                {/* Search */}
                <form className="flex-1 min-w-[250px] max-w-sm relative">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <input
                        type="search"
                        id="search"
                        className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search projects..."
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                </form>

                {/* Category Filter */}
                <div className="min-w-[180px]">
                    <select
                        id="category"
                        className="block w-full py-2.5 text-sm text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
                    >
                        <option>All Categories</option>
                        <option>Web Design</option>
                        <option>Mobile App</option>
                        <option>Illustration</option>
                        <option>Branding</option>
                    </select>
                </div>

                {/* Status Filter */}
                <div className="min-w-[150px]">
                    <select
                        id="status"
                        className="block w-full py-2.5 text-sm text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
                    >
                        <option>All Status</option>
                        <option>Completed</option>
                        <option>In Progress</option>
                        <option>Pending</option>
                    </select>
                </div>

                {/* Find Project Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-md transition-all">
                    Find Project
                </button>
            </div>

            <div className="flex justify-end pt-5 px-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-md transition-all">
                    + Add portfolio
                </button>
            </div>

            {/* 🧾 Table Section */}
            <div className="mt-6 relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase border-b-2 border-blue-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">No</th>
                        <th scope="col" className="px-6 py-3">Project Name</th>
                        <th scope="col" className="px-6 py-3">Client</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3 text-center">Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {portfolios.map((item, index) => (
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
                            <td className="px-6 py-4">{item.eventDate}</td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex justify-center gap-2">
                                    <button className="w-[32px] h-[32px] flex items-center justify-center text-black rounded-lg hover:bg-gray-200">
                                        View
                                    </button>
                                    <button className="w-[32px] h-[32px] flex items-center justify-center text-black rounded-lg hover:bg-gray-200">
                                        Edit
                                    </button>
                                    <button className="w-[32px] h-[32px] flex items-center justify-center text-red-500 rounded-lg hover:bg-gray-200">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-[111px] gap-3">
                <button>Previous</button>
                <p>1</p>
                <button>Next</button>
            </div>
        </div>
    );
}
