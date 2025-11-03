import CardAbout from "../component/CardAbout.jsx";

export default function ServicePage() {
    const card = [
        {img_url:"/src/assets/production.svg",sub :"Event Handling",caption:"We're seasoned event organizers, excelling in seamless planning and execution for diverse occasions. "},
        {img_url:"/src/assets/production.svg",sub :"Production",caption:"We are your go-to event production experts, specializing in captivating booth, stage, backdrop, etc and offering top-tier rentals for videotron, sound systems, and lighting.\n"},
        {img_url:"/src/assets/production.svg",sub :"Manpower",caption:"We specialize in providing professional manpower services for events, offering skilled crews, organized logistics, floor crew, visual jockeys, camera person, expert production teams, etc.\n"},
        {img_url:"/src/assets/production.svg",sub :"Live Streaming",caption:"We provide live broadcasting services or what is often called live streaming with experienced manpower and professional equipment."},
        {img_url:"/src/assets/production.svg",sub :"Show Management",caption:"We also have experience in managing how a show can run according to its flow."},
        {img_url:"/src/assets/production.svg",sub :"Multimedia Production",caption:"We can also create multimedia content while providing manpower and multimedia support equipment."},
    ]


    return (
        <section id="services">
            <div className= " flex flex-col items-center text-center my-20">
                <h1 className="text-[46px] leading-[72px] font-bold mt-[80px] mb-[24px]">
                    Our Services
                </h1>

                <div className="w-full max-w-[976px] mb-16">
                    <p className="text-[20px] leading-relaxed text-gray-700">
                        Comprehensive event solutions tailored to bring your vision to life with precision
                        and creativity.
                    </p>
                </div>

                {/* Grid container dengan jarak antar card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-[48px] mb-20">
                    {card.map((item, index) => (
                        <CardAbout
                            key={index}
                            image_url={item.img_url}
                            sub={item.sub}
                            caption={item.caption}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}


