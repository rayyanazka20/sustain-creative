import { useState } from "react";
import formatDate from "@/utils/getdate.js";
import EditProfileForm from "@/component/EditProfileForm.jsx";
import {useGetUserProfile} from "@/api/userProfile.jsx";



export default function AdminProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const lastLogin = localStorage.getItem("lastLogin");

    const [editMode, setEditMode] = useState(false);

    const { data: profile, isLoading, isError } = useGetUserProfile(user?.id);

    if (!user?.id) return <p>User belum login...</p>;
    if (isLoading) return <p>Loading profile...</p>;
    if (isError) return <p>Error loading profile</p>;

    return (
        <>
            {/* === MODAL EDIT PROFILE === */}
            {editMode && (
                <EditProfileForm
                    onClose={() => setEditMode(false)}
                />
            )}

            {/* === HALAMAN PROFIL === */}
            <section className="mt-6 bg-white py-8 dark:bg-gray-900 rounded-lg">
                <div className="mx-auto max-w-screen-lg px-6">
                    <div className="py-4 md:py-8">

                        {/* FOTO PROFILE */}
                        <div className="mb-8 flex items-center gap-6">
                            <img
                                className="h-20 w-20 rounded-lg object-cover"
                                src={
                                    profile?.imageProfile ||
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                                }
                                alt="avatar"
                            />

                            <div>
                                <span className="mb-2 inline-block rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                                    Admin
                                </span>

                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {profile?.username}
                                </h2>
                            </div>

                            {/* BUTTON EDIT */}
                            <button
                                onClick={() => setEditMode(true)}
                                className="ml-auto bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-700"
                            >
                                Edit Profile
                            </button>
                        </div>

                        {/* DETAIL PROFIL */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6">

                            {/* KIRI */}
                            <div className="space-y-4">
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="font-semibold">Email Address</dt>
                                    <dd>{profile.email}</dd>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="font-semibold">Phone Number</dt>
                                    <dd>{profile.phoneNumber}</dd>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="font-semibold">Address</dt>
                                    <dd>{profile.address}</dd>
                                </div>
                            </div>

                            {/* KANAN */}
                            <div className="space-y-4">
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="font-semibold">Last Login</dt>
                                    <dd>{formatDate(lastLogin)}</dd>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="font-semibold">Date Of Joining</dt>
                                    <dd>{profile.createdAt}</dd>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="font-semibold">Account Status</dt>
                                    <dd className="text-green-600 font-medium">Active</dd>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
