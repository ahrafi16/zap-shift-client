import { useForm } from "react-hook-form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ParcelForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const parcelType = watch("type");
    const weight = watch("weight");
    const senderService = watch("senderServiceCenter");

    const [calculatedCost, setCalculatedCost] = useState(null);

    // Dummy Cost Calculation Logic
    const calculateCost = (data) => {
        let base = 60;

        if (data.type === "non-document") {
            base += 40;
            if (data.weight) {
                base += data.weight * 10;
            }
        }

        // Example service center variation
        if (data.senderServiceCenter === "Dhaka") {
            base += 20;
        }

        return base;
    };

    const onSubmit = (data) => {
        const cost = calculateCost(data);
        setCalculatedCost(cost);

        toast(
            (t) => (
                <div className="p-2">
                    <p className="font-semibold">
                        Delivery Cost: ৳{cost}
                    </p>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            saveParcel(data, cost);
                        }}
                        className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                    >
                        Confirm
                    </button>
                </div>
            ),
            { duration: 8000 }
        );
    };

    const saveParcel = (data, cost) => {
        const parcelData = {
            ...data,
            delivery_cost: cost,
            creation_date: new Date(),
        };

        console.log("Saved to DB:", parcelData);

        toast.success("Parcel Saved Successfully!");
        reset();
    };

    return (
        <div className="mx-auto my-16">
            <Toaster position="top-right" />

            {/* Heading */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Create Parcel</h1>
                <p className="text-gray-500 mt-2">
                    Door to Door Delivery Service Form
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 bg-white p-6 rounded-xl shadow"
            >
                {/* ================= Parcel Info ================= */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                        Parcel Info
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Type */}
                        <div>
                            <label className="block mb-1">Type *</label>
                            <select
                                {...register("type", { required: "Type is required" })}
                                className="w-full border p-2 rounded"
                            >
                                <option value="">Select</option>
                                <option value="document">Document</option>
                                <option value="non-document">Non-Document</option>
                            </select>
                            {errors.type && (
                                <p className="text-red-500 text-sm">
                                    {errors.type.message}
                                </p>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block mb-1">Title *</label>
                            <input
                                {...register("title", { required: "Title is required" })}
                                className="w-full border p-2 rounded"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Weight */}
                        <div>
                            <label className="block mb-1">
                                Weight (kg) {parcelType === "non-document" && "*"}
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                {...register("weight", {
                                    required:
                                        parcelType === "non-document"
                                            ? "Weight is required"
                                            : false,
                                })}
                                className="w-full border p-2 rounded"
                            />
                            {errors.weight && (
                                <p className="text-red-500 text-sm">
                                    {errors.weight.message}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* ================= Sender & Receiver Info ================= */}
                <section>
                    <h2 className="text-xl font-semibold mb-6 border-b pb-2">
                        Sender & Receiver Info
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* ================= Sender Info ================= */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-blue-600">
                                Sender Info
                            </h3>

                            <input
                                defaultValue="Anjum Hossain"
                                {...register("senderName", { required: true })}
                                className="border p-2 rounded w-full"
                                placeholder="Sender Name"
                            />

                            <input
                                {...register("senderContact", { required: true })}
                                className="border p-2 rounded w-full"
                                placeholder="Contact"
                            />

                            <select
                                {...register("senderRegion", { required: true })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select Region</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chittagong">Chittagong</option>
                            </select>

                            <select
                                {...register("senderServiceCenter", { required: true })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select Service Center</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="CTG">CTG</option>
                            </select>

                            <input
                                {...register("senderAddress", { required: true })}
                                className="border p-2 rounded w-full"
                                placeholder="Address"
                            />

                            <input
                                {...register("pickupInstruction", { required: true })}
                                className="border p-2 rounded w-full"
                                placeholder="Pickup Instruction"
                            />
                        </div>


                        {/* ================= Receiver Info ================= */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-green-600">
                                Receiver Info
                            </h3>

                            <input
                                {...register("receiverName", { required: true })}
                                className="border p-2 rounded w-full"
                                placeholder="Receiver Name"
                            />

                            <input
                                {...register("receiverContact", { required: true })}
                                className="border p-2 rounded w-full"
                                placeholder="Contact"
                            />

                            <select
                                {...register("receiverRegion", { required: true })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select Region</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chittagong">Chittagong</option>
                            </select>

                            <select
                                {...register("receiverServiceCenter", { required: true })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select Service Center</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="CTG">CTG</option>
                            </select>

                            <input
                                {...register("receiverAddress", { required: true })}
                                className="border p-2 rounded w-full"
                                placeholder="Address"
                            />

                            <input
                                {...register("deliveryInstruction", { required: true })}
                                className="border p-2 rounded w-full"
                                placeholder="Delivery Instruction"
                            />
                        </div>

                    </div>
                </section>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Calculate & Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ParcelForm;