import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useAuth();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(res => {
                console.log(res.user)
            }).catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="flex items-center w-full justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Create an Account
                </h1>

                <p className="text-gray-500 mt-2 mb-6">
                    Register with ZapShift
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
                        />
                        {
                            errors.name &&
                            <p className="text-red-500">Name is required</p>
                        }
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
                        />
                        {
                            errors.email?.type === "required" &&
                            <p className="text-red-500">Email is required</p>
                        }
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
                            errors.password?.type === "required" &&
                            <p className="text-red-500">Password is required</p>
                        }
                        {
                            errors.password?.type === "minLength" &&
                            <p className="text-red-500">Password must be at least 6 characters</p>
                        }
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-md bg-[#CAEB66] text-black font-medium hover:opacity-90 transition cursor-pointer"
                    >
                        Register
                    </button>
                </form>

                {/* Login Redirect */}
                <p className="text-center text-sm text-gray-500 mt-5">
                    Already have an account?{" "}
                    <span className="text-[#CAEB66] font-medium cursor-pointer hover:underline">
                        Login
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
                    className="w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                >
                    <FcGoogle size={20} />
                    <span className="text-sm font-medium text-gray-700">
                        Register with google
                    </span>
                </button>

            </div>
        </div>
    );
};

export default Register;