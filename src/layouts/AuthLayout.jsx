import { Link, Outlet } from "react-router";


const AuthLayout = () => {
    return (
        <div className="min-h-screen flex">

            {/* LEFT SIDE */}
            <div className="w-full md:w-1/2 flex flex-col px-16">

                {/* Logo */}
                <Link to="/" className="flex items-end gap-1 mb-10 mt-6">
                    <img src="/assets/logo.png" alt="ZapShift logo" className="h-8 w-auto" />
                    <span className="text-2xl font-extrabold leading-none">ZapShift</span>
                </Link>

                {/* Form Section */}
                <div className="flex-1 flex items-center justify-center">
                    <Outlet />
                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="hidden md:flex w-1/2 bg-[#FAFDF0] items-center justify-center absolute h-full right-0">
                <img
                    src="/assets/authImage.png"
                    alt=""
                    className="max-w-md w-full"
                />
            </div>

        </div>
    );
};

export default AuthLayout;