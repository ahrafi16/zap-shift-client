import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
    HiOutlineHome,
    HiOutlineArchiveBox,
    HiOutlineCreditCard,
    HiOutlineMagnifyingGlass,
    HiOutlineUserCircle,
    HiOutlineCog6Tooth,
    HiOutlineUserGroup,
    HiOutlineClock
} from "react-icons/hi2";
import useUserRole from "../hooks/useUserRole";

/* ───────── Icons ───────── */

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

/* ───────── Layout ───────── */

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { roleLoading, role } = useUserRole();

    return (
        <div className="relative flex min-h-screen bg-gray-50">

            {/* ───────── Sidebar ───────── */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-80 transform bg-white p-6 shadow-lg
                    transition-transform duration-300 ease-in-out
                    lg:static lg:translate-x-0 lg:shadow-none
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex flex-col gap-6 h-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-end gap-1">
                        <img src="/assets/logo.png" alt="ZapShift logo" className="h-8 w-auto" />
                        <span className="text-2xl font-extrabold leading-none">ZapShift</span>
                    </Link>

                    <ul className="space-y-2">

                        <li>
                            <NavLink
                                to="/"
                                className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                <HiOutlineHome size={20} />
                                Dashboard Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/myParcels"
                                className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                <HiOutlineArchiveBox size={20} />
                                My Parcels
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/paymentHistory"
                                className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                <HiOutlineCreditCard size={20} />
                                Payment History
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/trackParcel"
                                className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                <HiOutlineMagnifyingGlass size={20} />
                                Track a Package
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/updateProfile"
                                className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                <HiOutlineUserCircle size={20} />
                                Update Profile
                            </NavLink>
                        </li>
                        {!roleLoading && role === 'admin' &&
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/activeRiders"
                                        className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <HiOutlineUserGroup size={20} />
                                        Active Riders
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/pendingRiders"
                                        className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <HiOutlineClock size={20} />
                                        Pending Riders
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/manageAdmins"
                                        className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <HiOutlineUserGroup size={20} />
                                        Manage Admins
                                    </NavLink>
                                </li>
                            </>
                        }

                        <li>
                            <a
                                className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                <HiOutlineCog6Tooth size={20} />
                                Settings
                            </a>
                        </li>

                    </ul>
                </div>
            </aside>

            {/* ───────── Overlay (Mobile) ───────── */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* ───────── Main Content ───────── */}
            <div className="flex flex-1 flex-col">

                {/* ───────── Mobile Header ───────── */}
                <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:hidden">
                    <h1 className="text-lg font-semibold">Dashboard</h1>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-md p-2 text-gray-700 hover:bg-gray-200 transition"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    </button>
                </header>

                {/* ───────── Page Content ───────── */}
                <main className="flex flex-1 p-6">
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;