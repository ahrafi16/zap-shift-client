import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Welcome Back
                </h1>

                <p className="text-gray-500 mt-2 mb-6">
                    Login with ZapShift
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: true, minLength: 6 })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
                        />
                        {
                            errors.password && errors.password?.type === 'required' &&
                            <p className="text-red-500">Password is required</p>
                        }
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <a
                            href="#"
                            className="text-sm text-gray-500 underline hover:text-gray-700"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-md bg-[#CAEB66] text-black font-medium hover:opacity-90 transition cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                {/* Register */}
                <p className="text-center text-sm text-gray-500 mt-5">
                    Don’t have any account?{" "}
                    <span className="text-[#CAEB66] font-medium cursor-pointer hover:underline">
                        Register
                    </span>
                </p>

                {/* Or */}
                <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-400 text-sm">Or</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Google Button */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                >
                    <FcGoogle size={20} />
                    <span className="text-sm font-medium text-gray-700 cursor-pointer">
                        Login with google
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Login;