import { useState } from 'react';

const DashboardLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex min-h-screen">
            {/* Sidebar (Drawer-side) */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-50 w-80 transform bg-slate-100 p-4 transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">Sidebar</h2>
                    <ul className="space-y-2">
                        <li><a className="block rounded p-2 hover:bg-slate-200">Sidebar Item 1</a></li>
                        <li><a className="block rounded p-2 hover:bg-slate-200">Sidebar Item 2</a></li>
                    </ul>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Main Content (Drawer-content) */}
            <div className="flex flex-1 flex-col">
                {/* Navbar-style header for the mobile button */}
                <header className="flex h-16 items-center border-b px-4 lg:hidden">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="rounded-md bg-blue-600 px-4 py-2 text-white"
                    >
                        Open drawer
                    </button>
                </header>

                <main className="flex flex-1 items-center justify-center p-6">
                    {children || <p>Page content here</p>}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;