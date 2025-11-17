import {useDeletePortfolio} from "@/api/getPortofolio.jsx";

export default function DeletePortfolio({id,portfolio,onClose}) {
    const deleteMutation = useDeletePortfolio();

    const handleDelete = () => {

            deleteMutation.mutate(id, {
                onSuccess: () => {
                    onClose(); // tutup modal
                },
            });

    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl mx-6 p-10 lg:p-14 relative border border-yellow-200">

                {/* Tombol Close */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-6 text-gray-500 hover:text-gray-800 text-3xl transition-all duration-200"
                >
                    ✕
                </button>

                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Gambar */}
                    <div className="w-full lg:w-[60%] relative">
                        <div className="relative group">
                            <div className="absolute -inset-4 rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition duration-300"></div>
                            <img
                                src={portfolio.image}
                                alt={portfolio.companyName}
                                className="w-full h-[550px] object-cover rounded-3xl relative z-10 shadow-2xl group-hover:scale-[1.03] transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Detail */}
                    <div className="w-full lg:w-1/2">
                        <h1 className="font-extrabold text-3xl lg:text-4xl mb-4 text-gray-900 tracking-wide">
                            {portfolio.companyName}
                        </h1>
                        <p className=" font-semibold text-3xl mb-6 tracking-wider">
                            {portfolio.Category?.name || "-"}
                        </p>

                        <p className="text-gray-700 leading-relaxed text-base mb-10">
                            {portfolio.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium shadow-sm">
                                <span className="text-sm">📅</span>
                                <span>{portfolio.eventDate}</span>
                            </div>
                            <button
                                onClick={handleDelete}
                                disabled={deleteMutation.isPending}
                                className="bg-red-100 hover:bg-yellow-200 text-gray-900 rounded-full px-10 py-3 font-semibold shadow-md transition-transform transform hover:scale-105 active:scale-95"
                            >
                                {deleteMutation.isPending ? "Deleting..." : "Delete"}
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-red-100 hover:bg-yellow-200 text-gray-900 rounded-full px-10 py-3 font-semibold shadow-md transition-transform transform hover:scale-105 active:scale-95"
                            >
                                close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}