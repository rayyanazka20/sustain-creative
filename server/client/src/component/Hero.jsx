export default function Hero() {
    return (
        <section
            id="home"
            className="mt-18 bg-gradient-to-b from-blue-600 to-white flex items-center pt-24"
        >
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-[72px] leading-[72px] font-extrabold mb-4 animate-fade-in">
                        <span className=" text-white">Elevating Your</span>
                        <br />
                        <span className=" text-blue-600">Event Experience</span>
                    </h1>
                    <p className="text-white text-[24px] md:text-2xl text-muted-foreground mb-8 animate-fade-in">
                        All you need is for your creative project
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                        <button className="text-white px-5 py-4 bg-gradient-to-r from-blue-600 to-blue-700  border-blue-700 rounded-full font-semibold border-1">Explore Portfolio</button>
                        <button className="text-blue-700 px-5 py-4 bg-none  border-blue-700 rounded-full font-semibold border-2">Contact us</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
