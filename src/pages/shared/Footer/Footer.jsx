import React from "react";
import { Link } from "react-router";

// ─── Nav Links Data ───────────────────────────────────────────────────────────
const navLinks = [
    { name: "Services", path: "/services" },
    { name: "Coverage", path: "/coverage" },
    { name: "About Us", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
];

// ─── Social Links Data ────────────────────────────────────────────────────────
const socialLinks = [
    {
        name: "LinkedIn",
        href: "https://linkedin.com",
        bgColor: "bg-[#0A66C2]",
        icon: (
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M20.45 20.45h-3.554v-5.57c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.667H9.352V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: "X",
        href: "https://x.com",
        bgColor: "bg-black border border-white/30",
        icon: (
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        name: "Facebook",
        href: "https://facebook.com",
        bgColor: "bg-[#1877F2]",
        icon: (
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
            </svg>
        ),
    },
    {
        name: "YouTube",
        href: "https://youtube.com",
        bgColor: "bg-[#FF0000]",
        icon: (
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
    },
];

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
    return (
        <div className="my-9">
            <footer className=" bg-[#111111] rounded-2xl px-8 py-12 flex flex-col items-center gap-6 text-white">

                {/* Logo */}
                <Link to="/" className="flex items-end gap-1">
                    <img src="/assets/logo.png" alt="ZapShift logo" className="h-8 w-auto" />
                    <span className="text-2xl font-extrabold leading-none">ZapShift</span>
                </Link>

                {/* Tagline */}
                <p className="text-gray-400 text-sm text-center max-w-md leading-relaxed">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                {/* Divider */}
                <div className="w-full border-t border-dashed border-gray-700" />

                {/* Nav Links */}
                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-300">
                    {navLinks.map(({ name, path }) => (
                        <Link
                            key={name}
                            to={path}
                            className="hover:text-white transition-colors"
                        >
                            {name}
                        </Link>
                    ))}
                </nav>

                {/* Divider */}
                <div className="w-full border-t border-dashed border-gray-700" />

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                    {socialLinks.map(({ name, href, bgColor, icon }) => (
                        <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={name}
                            className={`w-9 h-9 rounded-full flex items-center justify-center ${bgColor} hover:scale-110 transition-transform`}
                        >
                            {icon}
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <p className="text-gray-600 text-xs mt-2">
                    © {new Date().getFullYear()} ZapShift. All rights reserved.
                </p>

            </footer>
        </div>
    );
};

export default Footer;