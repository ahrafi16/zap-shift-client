import { useForm } from "react-hook-form";
import { useState } from "react";
import districts from "../../data/districts";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const generateTrackingId = () => {
    const timestampPart = Date.now().toString().slice(-6); // last 6 digits
    const randomPart = Math.floor(1000 + Math.random() * 9000); // 4 random digits
    return `TRK-${timestampPart}-${randomPart}`;
};


const ParcelForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const parcelType = watch("type");
    const weight = watch("weight");
    const senderService = watch("senderServiceCenter");


    const [calculatedCost, setCalculatedCost] = useState(null);

    const calculateCost = (data) => {
        const isWithinCity =
            data.senderServiceCenter === data.receiverServiceCenter;

        const weight = parseFloat(data.weight) || 0;

        let baseCost = 0;
        let extraKg = 0;
        let extraCharge = 0;
        let outsideExtra = 0;

        if (data.type === "document") {
            baseCost = isWithinCity ? 60 : 80;
        }

        if (data.type === "non-document") {
            if (weight <= 3) {
                baseCost = isWithinCity ? 110 : 150;
            } else {
                baseCost = isWithinCity ? 110 : 150;
                extraKg = Math.ceil(weight - 3);
                extraCharge = extraKg * 40;

                if (!isWithinCity) {
                    outsideExtra = 40;
                }
            }
        }

        const total = baseCost + extraCharge + outsideExtra;

        return {
            baseCost,
            extraKg,
            extraCharge,
            outsideExtra,
            total,
            isWithinCity,
        };
    };

    const onSubmit = (data) => {
        const pricing = calculateCost(data);

        Swal.fire({
            title: "Confirm Your Parcel Booking",
            html: `
            <div style="text-align:left;font-size:15px">
                <p><strong>Parcel Type:</strong> ${data.type}</p>
                <p><strong>Delivery Zone:</strong> ${pricing.isWithinCity ? "Within City" : "Outside City/District"
                }</p>
                <hr/>
                <p>Base Cost: ৳${pricing.baseCost}</p>
                ${pricing.extraKg > 0
                    ? `<p>Extra Weight (${pricing.extraKg}kg × ৳40): ৳${pricing.extraCharge}</p>`
                    : ""
                }
                ${pricing.outsideExtra > 0
                    ? `<p>Outside Extra Charge: ৳${pricing.outsideExtra}</p>`
                    : ""
                }
                <hr/>
                <h2 style="color:green">
                    Total Cost: ৳${pricing.total}
                </h2>
            </div>
        `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Proceed to Payment",
            cancelButtonText: "Edit Information",
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                saveParcel(data, pricing.total);
            }
        });
    };



    const saveParcel = (data, cost) => {
        const parcelData = {
            ...data,
            user_email: user?.email || "unknown",
            delivery_cost: cost,

            // For database & tracking
            tracking_id: generateTrackingId(),
            creation_timestamp: new Date().toISOString(),  // ISO format (best practice)
            creation_unix: Date.now(),                     // optional but useful
            delivery_status: "not_collected",
            payment_status: "unpaid",
        };

        console.log("Saved to DB:", parcelData);
        axiosSecure.post('/parcels', parcelData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire("Success!", "Parcel Saved Successfully!", "success");
                }
            })



        reset();
    };

    const regions = [...new Set(districts.map(d => d.region))];

    const getServiceCentersByRegion = (region) => {
        return districts.filter(d => d.region === region);
    };

    return (
        <div className="mx-auto my-16">

            {/* Heading */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold">Send A Parcel</h1>
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
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-400 pb-2">
                        Parcel Info
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Type */}
                        <div>
                            <label className="block mb-2 font-medium">Type *</label>

                            <div className="flex gap-6">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="document"
                                        {...register("type", { required: "Type is required" })}
                                    />
                                    Document
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="non-document"
                                        {...register("type", { required: "Type is required" })}
                                    />
                                    Non-Document
                                </label>
                            </div>

                            {errors.type && (
                                <p className="text-red-500 text-sm">{errors.type.message}</p>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block mb-1">Parcel Name *</label>
                            <input
                                {...register("title", { required: "Title is required" })}
                                className="w-full border border-gray-400  p-2 rounded"
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
                                Parcel Weight (kg) {parcelType === "non-document" && "*"}
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                {...register("weight", {
                                    required:
                                        parcelType === "non-document"
                                            ? "Weight is required"
                                            : false,
                                    min: {
                                        value: 0,
                                        message: "Weight cannot be negative"
                                    }
                                })}
                                className="w-full border border-gray-400 p-2 rounded"
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
                    <h2 className="text-xl font-semibold mb-6 border-b border-gray-400 pb-2">
                        Sender & Receiver Info
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* ================= Sender Info ================= */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-blue-600">
                                Sender Info
                            </h3>

                            <input
                                defaultValue="Sender Name"
                                {...register("senderName", { required: true })}
                                className="border border-gray-400 p-2 rounded w-full"
                                placeholder="Sender Name"
                            />

                            <input
                                {...register("senderContact", { required: true })}
                                className="border border-gray-400 p-2 rounded w-full"
                                placeholder="Contact"
                            />

                            <select
                                {...register("senderRegion", { required: true })}
                                className="border border-gray-400 p-2 rounded w-full"
                            >
                                <option value="">Select Region</option>
                                {regions.map(region => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>

                            <select
                                {...register("senderServiceCenter", { required: true })}
                                className="border border-gray-400 p-2 rounded w-full"
                            >
                                <option value="">Select Service Center</option>
                                {getServiceCentersByRegion(watch("senderRegion")).map(d => (
                                    <option key={d.district} value={d.district}>
                                        {d.district}
                                    </option>
                                ))}
                            </select>

                            <input
                                {...register("senderAddress", { required: true })}
                                className="border border-gray-400 p-2 rounded w-full"
                                placeholder="Address"
                            />

                            <textarea
                                {...register("pickupInstruction", { required: true })}
                                className="border border-gray-400 p-2 rounded w-full"
                                placeholder="Pickup Instruction"
                                rows={3}
                            />
                        </div>


                        {/* ================= Receiver Info ================= */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-green-600">
                                Receiver Info
                            </h3>

                            <input
                                {...register("receiverName", { required: true })}
                                className="border border-gray-400 p-2 rounded w-full"
                                placeholder="Receiver Name"
                            />

                            <input
                                {...register("receiverContact", { required: true })}
                                className="border border-gray-400 p-2 rounded w-full"
                                placeholder="Contact"
                            />

                            <select
                                {...register("receiverRegion", { required: true })}
                                className="border border-gray-400 p-2 rounded w-full"
                            >
                                <option value="">Select Region</option>
                                {regions.map(region => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>

                            <select
                                {...register("receiverServiceCenter", { required: true })}
                                className="border border-gray-400 p-2 rounded w-full"
                            >
                                <option value="">Select Service Center</option>
                                {getServiceCentersByRegion(watch("receiverRegion")).map(d => (
                                    <option key={d.district} value={d.district}>
                                        {d.district}
                                    </option>
                                ))}
                            </select>

                            <input
                                {...register("receiverAddress", { required: true })}
                                className="border border-gray-400 p-2 rounded w-full"
                                placeholder="Address"
                            />

                            <textarea
                                {...register("deliveryInstruction", { required: true })}
                                className="border border-gray-400 p-2 rounded w-full"
                                placeholder="Delivery Instruction"
                                rows={3}
                            />
                        </div>

                    </div>
                </section>

                <p>* PickUp Time 4pm-7pm Approx.</p>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-primary font-semibold text-black px-6 py-2 rounded-lg cursor-pointer"
                    >
                        Proceed to Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ParcelForm;