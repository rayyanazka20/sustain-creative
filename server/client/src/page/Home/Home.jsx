import { useRef } from "react";
import Navbar from "../../component/Navbar.jsx";
import Hero from "../../component/Hero.jsx";
import ServicePage from "../Service.jsx";
import AboutPage from "../About.jsx";
import PortoPage from "../Portofolio.jsx";
import ContactPage from "../ContactPage.jsx";

export default function HomePage() {
    const homeRef = useRef(null);
    const servicesRef = useRef(null);
    const portfolioRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);

    const handleNavigate = (sectionId) => {
        const sectionMap = {
            home: homeRef,
            services: servicesRef,
            portfolio: portfolioRef,
            about: aboutRef,
            contactpage: contactRef,
        };

        sectionMap[sectionId]?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };


    return (
        <>
            <Navbar onNavigate={handleNavigate} />

            <section ref={homeRef} id="home">
                <Hero />
            </section>

            <section ref={aboutRef} id="about">
                <AboutPage />
            </section>

            <section ref={servicesRef} id="services">
                <ServicePage />
            </section>

            <section ref={portfolioRef} id="portfolio">
                <PortoPage />
            </section>

            <section ref={contactRef} id="contactpage">
                <ContactPage />
            </section>
        </>
    );
}
