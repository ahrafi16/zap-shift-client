import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["my-parcels", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
    });

    // ── Delete Mutation ───────────────────────────────────────────────────────
    const { mutate: deleteParcel } = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/parcels/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["my-parcels", user?.email]);
            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Your parcel has been successfully deleted.",
                confirmButtonColor: "#2563eb",
            });
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Something went wrong. Please try again.",
                confirmButtonColor: "#dc2626",
            });
        },
    });

    // ── Delete Handler ────────────────────────────────────────────────────────
    const handleDelete = (parcel) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Delete "${parcel.title}"? This action cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteParcel(parcel._id);
            }
        });
    };

    // for pay button
    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`)
    }

    // ── Format Date ───────────────────────────────────────────────────────────
    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("en-BD", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <span className="loading loading-spinner loading-md"></span>
            </div>
        );
    }

    return (
        <div className="bg-white w-full rounded-2xl p-6">
            {/* Title */}
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                My Parcels
            </h2>

            {parcels.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">No parcels found 📦</p>
                </div>
            ) : (
                <div className="overflow-x-auto text-center">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-gray-600 text-sm">
                                <th>#</th>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Created</th>
                                <th>Cost</th>
                                <th>Payment</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr
                                    key={parcel._id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td>{index + 1}</td>

                                    {/* Type */}
                                    <td className="font-semibold capitalize">
                                        {parcel.type}
                                    </td>

                                    {/* Title */}
                                    <td className="font-semibold capitalize">
                                        {parcel.title}
                                    </td>

                                    {/* Date */}
                                    <td className="text-gray-500">
                                        {formatDate(parcel.creation_timestamp)}
                                    </td>

                                    {/* Cost */}
                                    <td className="font-medium">
                                        ৳ {parcel.delivery_cost}
                                    </td>

                                    {/* Payment Status */}
                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${parcel.payment_status === "paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {parcel.payment_status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            <button className="px-3 py-1 text-xs rounded-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer">
                                                View
                                            </button>

                                            {parcel.payment_status === "unpaid" ? (
                                                <button onClick={handlePay(parcel._id)} className="px-3 py-1 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer">
                                                    Pay
                                                </button>
                                            ) : (
                                                <button className="px-3 py-1 text-xs rounded-lg bg-green-600 text-white transition cursor-default">
                                                    Paid
                                                </button>
                                            )}

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(parcel)}
                                                className="px-3 py-1 text-xs rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyParcels;