import React, { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

// ─── Nav Links Data ──────────────────────────────────────────────────────────
const navLinks = [
    { name: "Services", path: "/services" },
    { name: "Coverage", path: "/coverage" },
    { name: "About Us", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
];

// ─── Icons ───────────────────────────────────────────────────────────────────
const HamburgerIcon = () => (
    <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useAuth();

    return (
        <header className="sticky md:top-7 z-40 w-full ">
            <div className="flex items-center justify-between px-6 py-3 shadow-sm rounded-2xl bg-white">

                {/* Logo */}
                <Link to="/" className="flex items-end gap-1">
                    <img src="/assets/logo.png" alt="ZapShift logo" className="h-8 w-auto" />
                    <span className="text-2xl font-extrabold leading-none">ZapShift</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-700">
                    {navLinks.map(({ name, path }) => (
                        <Link
                            key={name}
                            to={path}
                            className="hover:text-primary transition-colors"
                        >
                            {name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3">
                    {
                        user ?
                            <button
                                className="border-2 hover:border-red-900 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition cursor-pointer"
                            >
                                Sign Out
                            </button> :
                            <Link
                                to="/login"
                                className="border-2 border-gray-500 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                            >
                                Sign In
                            </Link>
                    }
                    <Link
                        to="/rider"
                        className="border-2 border-primary bg-primary text-black px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
                    >
                        Be a Rider
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-gray-600"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <HamburgerIcon />
                </button>
            </div>

            {/* ── Mobile Drawer ─────────────────────────────────────────────────── */}
            {/* Backdrop */}
            <div
                className={`md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <div
                className={`md:hidden fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl flex flex-col p-8 gap-6 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close Button */}
                <button
                    className="self-end text-gray-500 hover:text-gray-800"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                >
                    <CloseIcon />
                </button>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-5">
                    {navLinks.map(({ name, path }) => (
                        <Link
                            key={name}
                            to={path}
                            className="text-gray-800 text-lg font-medium hover:text-primary transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            {name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Actions */}
                <div className="flex flex-col gap-3 mt-auto">
                    <Link
                        to="/signin"
                        className="border-2 border-gray-500 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium text-center hover:bg-gray-50 transition"
                        onClick={() => setMenuOpen(false)}
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/rider"
                        className="border-2 border-primary bg-primary text-black px-5 py-2 rounded-lg text-sm font-medium text-center hover:opacity-90 transition"
                        onClick={() => setMenuOpen(false)}
                    >
                        Be a Rider
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;