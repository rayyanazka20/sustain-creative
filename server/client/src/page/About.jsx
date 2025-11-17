import CardAbout from "../component/CardAbout.jsx";

export default function AboutPage() {
    const card = [
        {
            img_url: "/src/assets/production.svg",
            sub: "Build an Idea",
            caption:
                "Creating a creative idea that is oriented to client needs by prioritizing client satisfaction.",
        },
        {
            img_url: "/src/assets/implement the concept.svg",
            sub: "Implement the Concept",
            caption:
                "Implement a concept from an idea that has been designed to be executed in a project.",
        },
        {
            img_url: "/src/assets/do a magic.svg",
            sub: "Do a Magic",
            caption:
                "Execute all ideas and concepts that have been designed, whether in the form of events, productions, live streaming, multimedia, etc.",
        },
    ];

    return (
        <section id="about">
            <div className= " flex flex-col items-center text-center my-20">
                <h1 className="text-[46px] leading-[72px] font-bold mt-[80px] mb-[24px]">
                    About Sustaine Creative
                </h1>

                <div className="w-full max-w-[976px] mb-16">
                    <p className="text-[20px] leading-relaxed text-gray-700">
                        Sustaine Creative is an agency based in Jakarta. Sustaine was formed
                        by 2 people who share the same vision, namely exploring the
                        potential around them who actually have great talents but are not
                        visible. Sustaine was born in 2021, a year when several companies
                        were actually affected by the pandemic, but we preferred to build
                        Sustaine at that time. Because we believe that the entertainment and
                        creativity business always has a way of staying alive.
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
