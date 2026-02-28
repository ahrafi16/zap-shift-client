import { Link } from "react-router";


const ErrorPage = () => {
    return (
        <div className="flex min-h-screen flex-col justify-center items-center">
            <img className="w-96" src="/assets/error.png" alt="" />
            <Link
                to="/"
                className="border-2 border-primary bg-primary  px-5 py-2 rounded-lg text-sm font-medium transition"
            >
                Go Home
            </Link>
        </div>
    );
};

export default ErrorPage;