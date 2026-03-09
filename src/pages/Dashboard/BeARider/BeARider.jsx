import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import districtsData from "../../../../src/data/districts";

const BeARider = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm();

    const [selectedRegion, setSelectedRegion] = useState("");

    const regions = [...new Set(districtsData.map(d => d.region))];

    const filteredDistricts = districtsData.filter(
        d => d.region === selectedRegion
    );

    const onSubmit = async (data) => {

        const riderData = {
            ...data,
            name: user?.displayName,
            email: user?.email,
            status: "pending"
        };

        const res = await axiosSecure.post("/riders", riderData);

        if (res.data.insertedId) {
            Swal.fire({
                icon: "success",
                title: "Application Submitted",
                text: "Your rider application is pending approval.",
                timer: 2000,
                showConfirmButton: false
            });

            reset();
            setSelectedRegion("");
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow my-16">

            <h2 className="text-3xl font-bold mb-2">Be a Rider</h2>

            <div className="grid md:grid-cols-2 gap-10">

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label>Your Name</label>
                        <input
                            value={user?.displayName || ""}
                            readOnly
                            className="border-2 border-gray-300 rounded p-2 w-full bg-gray-100"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label>Your Email</label>
                        <input
                            value={user?.email || ""}
                            readOnly
                            className="border-2 border-gray-300 rounded p-2 w-full bg-gray-100"
                        />
                    </div>

                    {/* Driving License */}
                    <div>
                        <label>Driving License Number</label>
                        <input
                            {...register("drivingLicense", { required: true })}
                            className="border-2 border-gray-300 rounded p-2 w-full"
                        />
                    </div>

                    {/* Region */}
                    <div>
                        <label>Your Region</label>
                        <select
                            {...register("region", { required: true })}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="border-2 border-gray-300 rounded p-2 w-full"
                        >
                            <option value="">Select Region</option>
                            {regions.map(region => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* District */}
                    <div>
                        <label>Your District</label>
                        <select
                            {...register("district", { required: true })}
                            disabled={!selectedRegion}
                            className="border-2 border-gray-300 rounded p-2 w-full"
                        >
                            <option value="">Select District</option>
                            {filteredDistricts.map(d => (
                                <option key={d.district} value={d.district}>
                                    {d.district}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* NID */}
                    <div>
                        <label>NID No.</label>
                        <input
                            {...register("nid", { required: true })}
                            className="border-2 border-gray-300 rounded p-2 w-full"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label>Phone Number</label>
                        <input
                            {...register("phone", { required: true })}
                            className="border-2 border-gray-300 rounded p-2 w-full"
                        />
                    </div>

                    {/* Bike Brand */}
                    <div>
                        <label>Bike Brand</label>
                        <input
                            {...register("bikeBrand", { required: true })}
                            className="border-2 border-gray-300 rounded p-2 w-full"
                        />
                    </div>

                    {/* Bike Registration */}
                    <div>
                        <label>Bike Registration Number</label>
                        <input
                            {...register("bikeRegistration", { required: true })}
                            className="border-2 border-gray-300 rounded p-2 w-full"
                        />
                    </div>

                    {/* About */}
                    <div>
                        <label>Tell Us About Yourself</label>
                        <textarea
                            {...register("about")}
                            className="border-2 border-gray-300 rounded p-2 w-full"
                        />
                    </div>

                    <button className="bg-primary w-full font-semibold text-black px-6 py-2 rounded-lg cursor-pointer">
                        Submit
                    </button>

                </form>

                <div className="flex justify-center items-center">
                    <img
                        src="/assets/agent-pending.png"
                        alt="rider"
                        className="max-w-sm"
                    />
                </div>

            </div>

        </div>
    );
};

export default BeARider;