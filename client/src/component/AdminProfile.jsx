export default function AdminProfile() {
    return (
        <section className="mt-6 bg-white py-8 antialiased dark:bg-gray-900 md:py-8 rounded-lg">
            <div className="mx-auto max-w-screen-lg px-6">
                <div className="py-4 md:py-8">
                    {/* === Header Profile === */}
                    <div className="mb-8 flex items-center gap-6">
                        <img
                            className="h-20 w-20 rounded-lg object-cover"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                            alt="Helene avatar"
                        />
                        <div>
                            <span className="mb-2 inline-block rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                Admin
                            </span>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Helene Engels
                            </h2>
                        </div>
                    </div>

                    {/* === GRID DETAIL === */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6">
                        {/* Kolom kiri */}
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                <dt className="font-semibold text-gray-900 dark:text-white">
                                    Email Address
                                </dt>
                                <dd className="text-gray-500 dark:text-gray-400">
                                    helene@example.com
                                </dd>
                            </div>

                            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                <dt className="font-semibold text-gray-900 dark:text-white">
                                    Phone Numbers
                                </dt>
                                <dd className="text-gray-500 dark:text-gray-400">
                                    081213111131
                                </dd>
                            </div>

                            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                <dt className="font-semibold text-gray-900 dark:text-white">
                                    Address
                                </dt>
                                <dd className="text-gray-500 dark:text-gray-400 text-right">
                                    9th St. PATH Station, New York, USA
                                </dd>
                            </div>
                        </div>

                        {/* Kolom kanan */}
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                <dt className="font-semibold text-gray-900 dark:text-white">
                                    Last Login
                                </dt>
                                <dd className="text-gray-500 dark:text-gray-400">
                                    +1234 567 890 / +12 345 678
                                </dd>
                            </div>

                            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                <dt className="font-semibold text-gray-900 dark:text-white">
                                    Date Of Joining
                                </dt>
                                <dd className="text-gray-500 dark:text-gray-400">
                                    1 October 2020
                                </dd>
                            </div>

                            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                <dt className="font-semibold text-gray-900 dark:text-white">
                                    Account Status
                                </dt>
                                <dd className="text-green-600 dark:text-green-400 font-medium">
                                    Active
                                </dd>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Edit */}
                    <div className="mt-8 flex justify-end">
                        <button
                            type="button"
                            data-modal-target="accountInformationModal2"
                            data-modal-toggle="accountInformationModal2"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            <svg
                                className="h-4 w-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                                />
                            </svg>
                            Edit your data
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
