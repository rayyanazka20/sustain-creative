
export default function CardService({image_url, sub,caption}) {

    return (
        <div className="w-[373px] h-[296px] bg-gray-50 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center p-6 hover:shadow-md transition-all duration-300">
            <div>
                <img alt="" src={image_url} className="" />
            </div>
            <div>
                <p className="font-bold text-[24px]">{sub}</p>
            </div>
            <div className="px-[11px]">
                <p className="text-[16px]">{caption}</p>
            </div>
        </div>
    )
}