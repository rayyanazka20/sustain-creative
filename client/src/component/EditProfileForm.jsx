import React, { useState, useEffect } from "react";


import {useGetUserProfile,useUpdateProfile} from "@/api/userProfile.jsx";

export default function EditProfileForm({ onClose }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const { data, isLoading } = useGetUserProfile(userId);
    const { mutate, isPending } = useUpdateProfile(userId);

    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [imageProfile, setImageProfile] = useState(null);

    useEffect(() => {
        if (data) {
            setUsername(data.username || "");
            setPhoneNumber(data.phoneNumber || "");
            setAddress(data.address || "");
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("phoneNumber", phoneNumber);
        formData.append("address", address);
        if (imageProfile) {
            formData.append("image", imageProfile);
        }

        mutate(formData);
        onClose();
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <section className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg relative">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-2xl font-bold"
                >
                    ×
                </button>

                <h1 className="text-xl font-bold mb-6">Edit Profile</h1>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 gap-4">

                        <div>
                            <label className="block">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block">Phone Number</label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block">Profile Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageProfile(e.target.files[0])}
                            />

                            {data?.image && !imageProfile && (
                                <img
                                    src={data.image}
                                    alt="current"
                                    className="mt-3 w-28 h-28 rounded object-cover"
                                />
                            )}

                            {imageProfile && (
                                <p className="text-green-600 mt-2">
                                    File selected: {imageProfile.name}
                                </p>
                            )}
                        </div>

                    </div>

                    <div className="flex justify-end mt-6 gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Close
                        </button>

                        <button
                            disabled={isPending}
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {isPending ? "Updating..." : "Save Changes"}
                        </button>

                    </div>
                </form>
            </section>
        </div>
    );
}
