    import LoginForm from "../../component/LoginForm.jsx";

    export default function LoginPage() {

        return (
            <section className="bg-gray-50 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        <img className="w-[372px] h-[163px] mr-2" src="/src/assets/logos.svg"
                             alt="logo"/>
                    </a>
                    <div
                        className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
                            </h1>
                            <LoginForm />
                        </div>
                    </div>
                    <div className="mt-[32px] text-gray-500">
                        <p>© 2025 Sustaine Creative. All rights reserved.</p>
                    </div>
                </div>
            </section>
        )
    }