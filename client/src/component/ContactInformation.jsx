export default function ContactInformation() {
    const contacts = [
        {icon:"/src/assets/address.svg",contact:"Address",info:"Villa Dago Tol C26, Pamulang, South Tangerang"},
        {icon:"/src/assets/phone.svg",contact: "Phone",info:"0881 2345 6789"},
        {icon:"/src/assets/email.svg",contact: "Email",info:"sustainejkt@gmail.com"},
    ]
    return (
        <div
            className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 ">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 ">Latest Customers</h5>
            </div>
            <div className="flow-root">
                <ul role="list" className="">
                    {contacts.map((item, index) => (
                        <li className="py-3 sm:py-4" key={index}>
                            <div className="flex items-center ">
                                <div className="shrink-0">
                                    <img className="w-[40px] h-[40px] rounded-full" src={item.icon}
                                         alt=""/>
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate ">
                                        {item.contact}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate ">
                                        {item.info}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <p className="font-semibold">Follow Us</p>
            </div>
            <div className="flex items-center gap-[16px] mb-[32px] mt-[16px]">
                <img src="/src/assets/twitter.svg" alt=""/>
                <img src="/src/assets/linkedin.svg" alt=""/>
                <img src="/src/assets/pinterest.svg" alt=""/>
            </div>
        </div>

    )
}