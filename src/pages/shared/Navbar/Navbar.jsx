import React, { useState } from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const HamburgerIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );

    const CloseIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    const navLinks = ["Services", "Coverage", "About Us", "Pricing", "Be a Rider"];
    const SunIcon = () => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
                stroke="#353535"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
            <header className="flex items-center justify-between px-6 py-3 md:py-4 shadow max-w-5xl rounded-2xl mx-auto w-full bg-white relative">
                {/* Logo */}
                <Link to="/" className='flex items-end'>
                    <img
                        src="/assets/logo.png"
                    />
                    <h2 className='text-2xl font-bold'>ZapShift</h2>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-gray-900 text-sm font-normal">
                    {navLinks.map((link) => (
                        <a key={link} className="hover:text-primary transition-colors" href="#">
                            {link}
                        </a>
                    ))}
                </nav>

                {/* Right side actions */}
                <div className="flex items-center space-x-4">
                    <Link to="/"
                        className="hidden md:flex border-2 border-gray-600 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium  transition"
                    >
                        Sign In
                    </Link>
                    <Link to="/"
                        className="hidden md:flex border-2 border-primary bg-primary px-5 py-2 rounded-lg text-sm font-medium  transition"
                    >
                        Be a rider
                    </Link>
                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-gray-600"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        {HamburgerIcon}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`md:hidden fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-8 transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        }`}
                >
                    {/* Close button */}
                    <button
                        className="absolute top-6 right-6 text-gray-600"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        {CloseIcon}
                    </button>

                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="text-gray-900 text-2xl font-medium hover:text-indigo-600 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link}
                        </a>
                    ))}

                    <a
                        href="#"
                        className="mt-4 bg-indigo-600 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-indigo-700 transition"
                        onClick={() => setMenuOpen(false)}
                    >
                        Be a rider
                    </a>
                </div>
            </header>
        </div>
    );
};

export default Navbar;