export default function CardPorto({ img_url, sub, caption }) {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
            <a href="#">
                <img className="rounded-t-lg" src={img_url} alt={sub} />
            </a>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {sub}
                </h5>
                <p className="mb-3 font-normal text-gray-700 ">
                    {caption}
                </p>
            </div>
        </div>
    );
}
