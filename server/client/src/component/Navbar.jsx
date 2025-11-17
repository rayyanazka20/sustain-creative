import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "/src/assets/logos.svg";

const Navbar = ({ onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");

    const menuItems = [
        { label: "Home", id: "home" },
        { label: "Services", id: "services" },
        { label: "Portfolio", id: "portfolio" },
        { label: "About", id: "about" },
        { label: "Contact", id: "contactpage" },
    ];

    const handleClick = (id) => {
        setActiveLink(id);
        setIsMenuOpen(false);
        onNavigate(id); // panggil fungsi scroll dari parent
    };

    return (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="container mx-auto px-28 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img src={logo} alt="Sustaine Creative" className="h-8 md:h-10" />
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleClick(item.id)}
                                className={`relative text-l font-medium transition-colors ${
                                    activeLink === item.id
                                        ? "text-blue-600"
                                        : "text-gray-700 hover:text-blue-500"
                                }`}
                            >
                                {item.label}
                                {activeLink === item.id && (
                                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 rounded-full"></span>
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-10 pb-4 flex flex-col gap-4">
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleClick(item.id)}
                                className={`relative font-medium transition-colors ${
                                    activeLink === item.id
                                        ? "text-blue-600"
                                        : "text-gray-700 hover:text-blue-500"
                                }`}
                            >
                                {item.label}
                                {activeLink === item.id && (
                                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 rounded-full"></span>
                                )}
                            </button>
                        ))}
                    </nav>
                )}
            </div>
        </div>
    );
};

export default Navbar;
