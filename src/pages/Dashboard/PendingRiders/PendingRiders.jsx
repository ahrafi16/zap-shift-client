import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEye, FiCheckCircle, FiXCircle } from "react-icons/fi";

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

    // Accept Rider
    const handleAccept = async (rider) => {

        const result = await Swal.fire({
            title: "Approve Rider?",
            text: "This rider will become active.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Accept"
        });

        if (result.isConfirmed) {

            await axiosSecure.patch(`/riders/approve/${rider._id}`);

            Swal.fire("Approved!", "Rider is now active.", "success");

            refetch();
        }
    };

    // Reject Rider
    const handleReject = async (rider) => {

        const result = await Swal.fire({
            title: "Reject Rider?",
            text: "This application will be cancelled.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Reject"
        });

        if (result.isConfirmed) {

            await axiosSecure.patch(`/riders/reject/${rider._id}`);

            Swal.fire("Rejected!", "Rider application rejected.", "success");

            refetch();
        }
    };

    if (isLoading) {
        return <p className="text-center mt-10">Loading riders...</p>;
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
                                        onClick={() => { setSelectedRider(rider)}}
                                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                                        title="View Details"
                                    >
                                        <FiEye />
                                    </button>

                                    <button
                                        onClick={() => handleAccept(rider)}
                                        className="text-green-500 cursor-pointer hover:text-green-700"
                                        title="Approve Rider"
                                    >
                                        <FiCheckCircle />
                                    </button>

                                    <button
                                        onClick={() => handleReject(rider)}
                                        className="text-red-500 cursor-pointer hover:text-red-700"
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

                <dialog id="rider_modal" className="modal modal-open">

                    <div className="modal-box">

                        <h3 className="text-lg font-bold mb-4">
                            Rider Details
                        </h3>

                        <div className="space-y-2">

                            <p><b>Name:</b> {selectedRider.name}</p>
                            <p><b>Email:</b> {selectedRider.email}</p>
                            <p><b>Phone:</b> {selectedRider.phone}</p>
                            <p><b>NID:</b> {selectedRider.nid}</p>
                            <p><b>Driving License:</b> {selectedRider.drivingLicense}</p>
                            <p><b>Region:</b> {selectedRider.region}</p>
                            <p><b>District:</b> {selectedRider.district}</p>
                            <p><b>Bike Brand:</b> {selectedRider.bikeBrand}</p>
                            <p><b>Bike Registration:</b> {selectedRider.bikeRegistration}</p>
                            <p><b>About:</b> {selectedRider.about}</p>

                        </div>

                        <div className="modal-action">

                            <button
                                onClick={() => handleAccept(selectedRider)}
                                className="btn btn-success cursor-pointer"
                            >
                                Accept
                            </button>

                            <button
                                onClick={() => handleReject(selectedRider)}
                                className="btn btn-error cursor-pointer"
                            >
                                Reject
                            </button>

                            <button
                                onClick={() => setSelectedRider(null)}
                                className="btn cursor-pointer"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </dialog>

            )}

        </div>
    );
};

export default PendingRiders;