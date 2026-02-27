import { Link, Outlet } from "react-router";


const AuthLayout = () => {
    return (
        <div className="min-h-screen py-9 flex flex-col gap-10">
            <div>
                {/* Logo */}
                <Link to="/" className="flex items-end gap-1">
                    <img src="/assets/logo.png" alt="ZapShift logo" className="h-8 w-auto" />
                    <span className="text-2xl font-extrabold leading-none">ZapShift</span>
                </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-10 md:gap-0 items-center">
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
                <div className="flex-1 h-full bg-[#FAFDF0]">
                    <img src="/assets/authImage.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;