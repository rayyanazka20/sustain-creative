import CardAbout from "../component/CardAbout.jsx";
import Form from "../component/Form.jsx";
import ContactInformation from "../component/ContactInformation.jsx";

export default function ContactPage() {

    return (
        <section id="contactpage" className="bg-gray-50">
            <div className= " flex flex-col items-center text-center my-20">
                <h1 className="text-[46px] leading-[72px] font-bold mt-[80px] mb-[24px]">
                    Let’s Collaborate!
                </h1>
                <div className="w-full max-w-[976px] mb-16">
                    <p className="text-[20px] leading-relaxed text-gray-700">
                        Ready to create something extraordinary? Let's discuss your next event and
                        bring your vision to life.
                    </p>
                </div>
                <div className="text-left flex justify-center gap-[64px]">
                    <Form/>
                    <ContactInformation/>
                </div>
            </div>
        </section>
    );
}
