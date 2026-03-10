import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEye, FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";
import Loading from "../../shared/loading/Loading";

const PendingRiders = () => {

    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);

    const { data: riders = [], refetch, isLoading } = useQuery({
        queryKey: ["pendingRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending");
            return res.data;
        }
    });

    // approve or reject rider funciton
    const handleDecision = async (rider, status) => {

        const result = await Swal.fire({
            title: status === "approve" ? "Approve Rider?" : "Reject Rider?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirm"
        });

        if (result.isConfirmed) {

            await axiosSecure.patch(`/riders/${rider._id}/status`, {
                status
            });

            refetch();
        }
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold mb-6">
                Pending Rider Applications
            </h2>

            <div className="overflow-x-auto">

                <table className="table table-zebra">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Bike</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {riders.map((rider, index) => (

                            <tr key={rider._id}>

                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.phone}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.bikeBrand}</td>

                                <td className="flex items-center gap-4 text-xl">

                                    <button
                                        onClick={() => { setSelectedRider(rider) }}
                                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                                        title="View Details"
                                    >
                                        <FiEye />
                                    </button>

                                    <button
                                        onClick={() => handleDecision(rider, "approve")}
                                        className="text-green-500 hover:text-green-700"
                                        title="Approve Rider"
                                    >
                                        <FiCheckCircle />
                                    </button>

                                    <button
                                        onClick={() => handleDecision(rider, "reject")}
                                        className="text-red-500 hover:text-red-700"
                                        title="Reject Rider"
                                    >
                                        <FiXCircle />
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Rider Details Modal */}

            {selectedRider && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedRider(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
                        >
                            <FiX />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-center">
                            Rider Details
                        </h2>

                        <div className="grid grid-cols-2 gap-4 text-sm">

                            <p><span className="font-semibold">Name:</span> {selectedRider.name}</p>
                            <p><span className="font-semibold">Email:</span> {selectedRider.email}</p>

                            <p><span className="font-semibold">Phone:</span> {selectedRider.phone}</p>
                            <p><span className="font-semibold">NID:</span> {selectedRider.nid}</p>

                            <p><span className="font-semibold">Driving License:</span> {selectedRider.drivingLicense}</p>
                            <p><span className="font-semibold">Region:</span> {selectedRider.region}</p>

                            <p><span className="font-semibold">District:</span> {selectedRider.district}</p>
                            <p><span className="font-semibold">Bike Brand:</span> {selectedRider.bikeBrand}</p>

                            <p><span className="font-semibold">Bike Registration:</span> {selectedRider.bikeRegistration}</p>

                            <p className="col-span-2">
                                <span className="font-semibold">About:</span> {selectedRider.about}
                            </p>

                        </div>

                        <div className="flex justify-center gap-6 mt-8">

                            <button
                                onClick={() => handleDecision(selectedRider, "approve")}
                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                <FiCheckCircle /> Approve
                            </button>

                            <button
                                onClick={() => handleDecision(selectedRider, "reject")}
                                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                <FiXCircle /> Reject
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default PendingRiders;