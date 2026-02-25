import React from "react";

const ServiceCard = ({ service }) => {
    const { title, description, icon: Icon } = service;
    return (
        <div
            className="rounded-xl p-6 shadow-md transition duration-300 hover:scale-105 hover:bg-[#CAEB66] bg-white text-center justify-items-center"
        >
            <div className="text-4xl mb-4 text-[#03373D]">
                <Icon />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-[#03373D]">
                {title}
            </h3>

            <p className="text-gray-700 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default ServiceCard;