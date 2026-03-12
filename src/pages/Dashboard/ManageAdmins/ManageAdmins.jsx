import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiUserCheck, FiUserX } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageAdmins = () => {

    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    const { data: users = [], refetch } = useQuery({
        queryKey: ["searchUsers", query],
        enabled: !!query,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${query}`);
            return res.data;
        }
    });

    const handleRoleChange = async (user, role) => {

        const result = await Swal.fire({
            title: role === "admin" ? "Make Admin?" : "Remove Admin?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirm"
        });

        if (result.isConfirmed) {

            await axiosSecure.patch(`/users/${user._id}/role`, { role });

            Swal.fire("Success", "Role updated", "success");

            refetch();
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(search);
    };

    return (
        <div className="p-6 w-full">

            <h2 className="text-2xl font-bold mb-6">
                Manage Admins
            </h2>

            {/* Search */}
            <form
                onSubmit={handleSearch}
                className="flex gap-2 mb-6"
            >

                <input
                    type="text"
                    placeholder="Search user by email..."
                    className="border px-3 py-2 rounded w-80"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    type="submit"
                    className="border-2 flex items-center gap-2 border-primary bg-primary text-black px-5 py-2 rounded-lg text-sm font-medium text-center hover:opacity-90 transition cursor-pointer"
                >
                    <FiSearch /> Search
                </button>

            </form>

            {/* Results */}

            {users.length > 0 && (

                <table className="w-full border">

                    <thead className="bg-gray-100">

                        <tr>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Created At</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user._id} className="text-center">

                                <td className="border p-2">
                                    {user.email}
                                </td>

                                <td className="border p-2">
                                    {new Date(user.created_at).toLocaleDateString("en-GB")}
                                </td>

                                <td className="border p-2 capitalize">
                                    {user.role || "user"}
                                </td>

                                <td className="border p-2">

                                    {user.role === "admin" ? (

                                        <button
                                            onClick={() =>
                                                handleRoleChange(user, "user")
                                            }
                                            className="text-red-600 text-xl"
                                            title="Remove Admin"
                                        >
                                            <FiUserX />
                                        </button>

                                    ) : (

                                        <button
                                            onClick={() =>
                                                handleRoleChange(user, "admin")
                                            }
                                            className="text-green-600 text-xl cursor-pointer"
                                            title="Make Admin"
                                        >
                                            <FiUserCheck />
                                        </button>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>
    );
};

export default ManageAdmins;