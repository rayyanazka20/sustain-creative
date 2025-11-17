// PortoPage.jsx
import CardPorto from "../component/CardPorto.jsx";
import sampleImage from "../assets/sample.jpg";
import {useState} from "react";

export default function PortoPage() {
    const [active, setActive] = useState("all project"); //

    const porto = [
        {
            image: sampleImage,
            sub: "Production",
            caption:
                "We are your go-to event experts, specializing in captivating booth, stage, backdrop, etc.",
        },
        {
            image: sampleImage,
            sub: "Manpower",
            caption:
                "We specialize in providing professional manpower services for events...",
        },
        {
            image: sampleImage,
            sub: "Live Streaming",
            caption:
                "We provide live broadcasting services or what is often called live streaming...",
        },
        {
            image: sampleImage,
            sub: "Live Streaming",
            caption:
                "We provide live broadcasting services or what is often called live streaming...",
        },
        {
            image: sampleImage,
            sub: "Live Streaming",
            caption:
                "We provide live broadcasting services or what is often called live streaming...",
        },
        {
            image: sampleImage,
            sub: "Live Streaming",
            caption:
                "We provide live broadcasting services or what is often called live streaming...",
        },
    ];

    const catalog =["all project","event","multimedia","production"]


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
                {/* Grid container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center text-left gap-[48px] mb-20">
                    {porto.map((item, index) => (
                        <CardPorto
                            key={index}
                            img_url={item.image} // ✅ gunakan nama yang benar
                            sub={item.sub}
                            caption={item.caption}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
