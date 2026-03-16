import { AiOutlineStop } from "react-icons/ai";
import { useNavigate } from "react-router";


const Forbidden = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="text-center max-w-md">
                {/* Icon */}
                <div className="text-9xl mb-6 text-primary animate-bounce">
                    <AiOutlineStop className="w-full" />
                </div>

                {/* Title */}
                <h1 className="text-5xl font-bold mb-4">403</h1>

                {/* Subtitle */}
                <p className="text-xl text-red-500 mb-6">
                    Oops! You don’t have permission to access this page.
                </p>

                {/* Go Back Button */}
                <button
                    className="border-2 border-primary bg-primary text-black px-5 py-2 rounded-lg text-sm font-medium text-center hover:opacity-90 transition cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Forbidden;