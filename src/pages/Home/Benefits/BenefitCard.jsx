import React from "react";

const BenefitCard = ({ icon, title, description }) => {
    return (
        <div data-aos="fade-up" className="bg-white w-full rounded-xl shadow p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">

            {/* Icon */}
            <div className="shrink-0">
                <img
                    src={icon}
                    alt={title}
                    className="w-28 h-28 object-contain"
                />
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block h-16 border-l-2 border-dashed border-gray-300"></div>

            {/* Content */}
            <div>
                <h3 className="text-xl font-semibold text-[#03373D] mb-2">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default BenefitCard;