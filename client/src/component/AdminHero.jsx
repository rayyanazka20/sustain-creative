import { useSelector } from "react-redux";

export default function AdminHero() {
    // Ambil user dari Redux store
    const userFromRedux = useSelector((state) => state.auth.user);

    // Kalau Redux kosong (misalnya user refresh halaman), ambil dari localStorage
    const storedUser = localStorage.getItem("user");
    const user =
        userFromRedux || (storedUser ? JSON.parse(storedUser) : null);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="flex justify-between p-6 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] mt-[17px] rounded-xl">
            <div className="text-white">
                <h1 className="font-bold text-[30px]">
                    Welcome back {user ? user.name : "User"}!
                </h1>
                <p className="text-[18px]">
                    Manage your creative portfolios efficiently
                </p>
                <p className="text-[14px]">{formattedDate}</p>
            </div>

            {/* SVG icon */}
            <div>
                <svg
                    width="76"
                    height="76"
                    viewBox="0 0 76 76"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M66 34H10M66 34C68.1217 34 70.1566 34.8429 71.6569 36.3431C73.1571 37.8434 74 39.8783 74 42V66C74 68.1217 73.1571 70.1566 71.6569 71.6569C70.1566 73.1571 68.1217 74 66 74H10C7.87827 74 5.84344 73.1571 4.34315 71.6569C2.84285 70.1566 2 68.1217 2 66V42C2 39.8783 2.84285 37.8434 4.34315 36.3431C5.84344 34.8429 7.87827 34 10 34M66 34V26C66 23.8783 65.1571 21.8434 63.6569 20.3431C62.1566 18.8429 60.1217 18 58 18M10 34V26C10 23.8783 10.8429 21.8434 12.3431 20.3431C13.8434 18.8429 15.8783 18 18 18M58 18V10C58 7.87827 57.1571 5.84344 55.6569 4.34315C54.1566 2.84285 52.1217 2 50 2H26C23.8783 2 21.8434 2.84285 20.3431 4.34315C18.8429 5.84344 18 7.87827 18 10V18M58 18H18"
                        stroke="#BFDBFE"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
}
