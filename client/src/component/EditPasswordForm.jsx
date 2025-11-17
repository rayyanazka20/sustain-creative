import {useUpdatePassword} from "@/api/userProfile.jsx";
import {useState} from "react";

export default function ChangePasswordForm() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const {mutate,isPending,isError} = useUpdatePassword(userId);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("oldPassword",password.oldPassword);
        formData.append("newPassword",password.newPassword);
        formData.append("confirmPassword",password.confirmPassword);
        mutate(formData)
    };

    return (
        <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm mt-8 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                Ubah Password
            </h3>

            <form className="max-w-lg space-y-6" onSubmit={handleSubmit}>
                {/* Password Lama */}
                <div>
                    <label
                        htmlFor="oldPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                    >
                        Password Lama
                    </label>
                    <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        placeholder="Masukkan password lama"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900
                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                   dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        required
                        onChange={(e)=>setPassword({...password,oldPassword: e.target.value})}
                    />
                </div>

                {/* Password Baru */}
                <div>
                    <label
                        htmlFor="newPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                    >
                        Password Baru
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="Masukkan password baru"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900
                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                   dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        required
                        onChange={(e)=>setPassword({...password,newPassword: e.target.value})}
                    />
                </div>

                {/* Konfirmasi Password */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                    >
                        Konfirmasi Password Baru
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Ulangi password baru"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900
                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                   dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        required
                        onChange={(e)=>setPassword({...password,confirmPassword: e.target.value})}
                    />
                </div>

                {/* Tombol Simpan */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full sm:w-auto rounded-lg bg-blue-700 px-6 py-2.5 text-sm font-medium text-white
                                   hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300
                                   dark:focus:ring-green-800"
                    >
                        Simpan Password
                    </button>
                </div>
            </form>
        </section>
    );
}
