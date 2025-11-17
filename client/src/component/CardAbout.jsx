export default function CardAbout({ image_url, sub, caption }) {
    return (
        <div className="w-[330px] min-h-[296px] bg-gray-50 rounded-2xl shadow-sm flex flex-col items-center text-center p-6 hover:shadow-md transition-all duration-300">
            <img src={image_url} alt={sub} className="w-14 h-14 mb-4" />
            <h3 className="text-[24px] font-bold mb-2">{sub}</h3>
            <p className="text-gray-600 text-[16px]">{caption}</p>
        </div>

    );
}
