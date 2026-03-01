import { useState } from "react";
import BangladeshMap from "./BangladeshMap";
import districts from "../../data/districts";
import { CiSearch } from "react-icons/ci";


const Coverage = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const handleSearch = () => {
        const found = districts.find((d) =>
            d.district.toLowerCase().includes(searchText.toLowerCase())
        );

        if (found) {
            setSelectedDistrict(found);
        } else {
            alert("District not found");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
                We are available in 64 districts
            </h1>

            {/* 🔍 SEARCH BOX (Styled Like Your Image) */}
            <div className="max-w-2xl mx-auto flex items-center bg-gray-200 rounded-full p-2 shadow-sm mb-8">

                <input
                    type="text"
                    placeholder="Search here"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-2 outline-none text-gray-700"
                />

                <button
                    onClick={handleSearch}
                    className="bg-lime-400 cursor-pointer hover:bg-lime-500 px-6 py-2 rounded-full font-semibold"
                >
                    Search
                </button>

            </div>

            {/* Map */}
            <div className=" mx-auto h-106 rounded-xl overflow-hidden shadow-lg">
                <BangladeshMap selectedDistrict={selectedDistrict} />
            </div>

        </div>
    );
};

export default Coverage;