import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiUserX } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/loading/Loading";

const ActiveRiders = () => {

    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");

    const { data: riders = [], refetch, isLoading } = useQuery({
        queryKey: ["activeRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/active");
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    // Client-side search
    const filteredRiders = riders.filter((rider) =>
        rider.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeactivate = async (rider) => {

        const result = await Swal.fire({
            title: "Deactivate Rider?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Deactivate"
        });

        if (result.isConfirmed) {

            await axiosSecure.patch(`/riders/${rider._id}/status`, {
                status: "inactive"
            });

            Swal.fire("Done!", "Rider deactivated.", "success");

            refetch();
        }
    };

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold mb-6">
                Active Riders
            </h2>

            {/* Search */}
            <div className="flex items-center gap-2 mb-6 border px-3 py-2 w-72 rounded">

                <FiSearch />

                <input
                    type="text"
                    placeholder="Search rider by name"
                    className="outline-none w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {/* Table */}

            <div className="overflow-x-auto">

                <table className="w-full border">

                    <thead className="bg-gray-100">

                        <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Phone</th>
                            <th className="p-2 border">Region</th>
                            <th className="p-2 border">District</th>
                            <th className="p-2 border">Bike</th>
                            <th className="p-2 border">Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredRiders.map((rider, index) => (

                            <tr key={rider._id} className="text-center">

                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{rider.name}</td>
                                <td className="border p-2">{rider.phone}</td>
                                <td className="border p-2">{rider.region}</td>
                                <td className="border p-2">{rider.district}</td>
                                <td className="border p-2">{rider.bikeBrand}</td>

                                <td className="border p-2">

                                    <button
                                        onClick={() => handleDeactivate(rider)}
                                        className="text-red-600 text-xl hover:text-red-800"
                                        title="Deactivate Rider"
                                    >
                                        <FiUserX />
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default ActiveRiders;