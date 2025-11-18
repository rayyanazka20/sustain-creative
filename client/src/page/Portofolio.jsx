import CardPorto from "../component/CardPorto.jsx";
import { useState } from "react";
import { useGetGlobalPortfolio, useSearchGlobalPortfolio } from "@/api/getPortofolio.jsx";

export default function PortoPage() {
    const [active, setActive] = useState("all project");

    // Ambil all portfolio (default)
    const { data: allPortfolio, isLoading: loadingAll } = useGetGlobalPortfolio();

    // Jika bukan "all project", ambil berdasarkan category
    const categoryName =
        active === "all project" ? null : active.toLowerCase();

    const {
        data: filteredPortfolio,
        isLoading: loadingFiltered,
    } = useSearchGlobalPortfolio(categoryName);

    // Data yang akan ditampilkan
    const dataToShow = active === "all project" ? allPortfolio : filteredPortfolio;

    const catalog = ["all project", "event", "multimedia", "production"];

    return (
        <section id="about">
            <div className="flex flex-col items-center text-center my-20">
                <h1 className="text-[46px] leading-[72px] font-bold mt-[80px] mb-[24px]">
                    Our Portfolio
                </h1>

                <div className="w-full max-w-[976px] mb-16">
                    <p className="text-[20px] leading-relaxed text-gray-700">
                        Comprehensive event solutions tailored to bring your vision to life
                        with precision and creativity.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-row items-center gap-[16px] justify-center w-full mb-[56px]">
                    {catalog.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActive(item)}
                            className={`px-[26px] py-[14px] font-semibold rounded-full border-2 transition-all duration-200 ${
                                active === item
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "text-black border-gray-400 hover:bg-gray-100"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Portfolio List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center text-left gap-[48px] mb-20">
                    {(dataToShow || []).map((item, index) => (
                        <CardPorto
                            key={index}
                            img_url={item.image}
                            sub={item.portfolioName}
                            caption={item.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
