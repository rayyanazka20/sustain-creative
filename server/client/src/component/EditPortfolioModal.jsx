import React, { useState, useEffect } from "react";
import { useUpdatePortfolio } from "@/api/getPortofolio.jsx";
import { useCategory } from "@/api/getCatefory.jsx";

export default function EditPortfolioModal({ onClose, data }) {
    const [portfolioName, setPortfolioName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const { mutate, isPending } = useUpdatePortfolio(data?.id);
    const { data: category, isLoading, isError } = useCategory();

    useEffect(() => {
        if (data) {
            setPortfolioName(data.portfolioName || "");
            setCompanyName(data.companyName || "");
            setEventDate(data.eventDate ? data.eventDate.slice(0, 10) : ""); // format yyyy-mm-dd
            setCategoryId(data.categoryId || "");
            setDescription(data.description || "");
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("portfolioName", portfolioName);
        formData.append("companyName", companyName);
        formData.append("eventDate", eventDate);
        formData.append("categoryId", categoryId);
        formData.append("description", description);
        if (image) formData.append("image", image);

        mutate(formData);

        onClose()
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <section className="max-w-4xl w-full p-6 mx-auto bg-gray-50 rounded-lg shadow-lg relative">
                {/* Tombol close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-black text-2xl font-bold hover:text-gray-400 cursor-pointer"
                >
                    ×
                </button>

                <h1 className="text-xl font-bold text-black capitalize mb-6">
                    Edit Portfolio
                </h1>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Portfolio Name */}
                        <div>
                            <label htmlFor="portfolioName" className="text-black">
                                Portfolio Name
                            </label>
                            <input
                                id="portfolioName"
                                type="text"
                                value={portfolioName}
                                onChange={(e) => setPortfolioName(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300
                                rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>

                        {/* Company Name */}
                        <div>
                            <label htmlFor="companyName" className="text-black">
                                Company Name
                            </label>
                            <input
                                id="companyName"
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300
                                rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="text-black">
                                Select Category
                            </label>
                            <select
                                id="category"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                disabled={isLoading}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300
                                rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            >
                                <option value="">
                                    {isLoading ? "Loading kategori..." : "Pilih kategori"}
                                </option>

                                {!isLoading &&
                                    !isError &&
                                    category?.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label htmlFor="date" className="text-black">
                                Date
                            </label>
                            <input
                                id="date"
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300
                                rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-2">
                            <label htmlFor="textarea" className="text-black">
                                Description
                            </label>
                            <textarea
                                id="textarea"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300
                                rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            ></textarea>
                        </div>

                        {/* Image Upload */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-black">Image</label>
                            <div className="mt-2 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-black"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172
                                            a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172
                                            a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600 justify-center">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                accept="image/*"
                                                className="sr-only"
                                                onChange={(e) => setImage(e.target.files[0])}
                                            />
                                        </label>
                                        <p className="pl-1 text-black">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-black">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                    {image ? (
                                        <p className="text-sm text-green-600 mt-2">
                                            File selected: {image.name}
                                        </p>
                                    ) : data?.image && (
                                        <img
                                            src={data.image}
                                            alt="current"
                                            className="mt-2 w-32 h-32 object-cover rounded-md"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end mt-6 gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-300 rounded-md hover:bg-gray-200"
                        >
                            Close
                        </button>

                        {isPending ? (
                            <button
                                type="button"
                                className="px-6 py-2 leading-5 text-white bg-indigo-500 rounded-md flex items-center justify-center"
                                disabled
                            >
                                <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24"></svg>
                                Updating…
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 hover:bg-blue-700 rounded-md"
                            >
                                Save Changes
                            </button>
                        )}
                    </div>
                </form>
            </section>
        </div>
    );
}
