import React from "react";
import ServiceCard from "./ServiceCard";

import {
    FaShippingFast,
    FaTruckMoving,
    FaWarehouse,
    FaMoneyBillWave,
    FaBuilding,
    FaUndoAlt,
} from "react-icons/fa";

const servicesData = [
    {
        title: "Express & Standard Delivery",
        description:
            "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: FaShippingFast,
    },
    {
        title: "Nationwide Delivery",
        description:
            "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: FaTruckMoving,
    },
    {
        title: "Fulfillment Solution",
        description:
            "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        icon: FaWarehouse,
    },
    {
        title: "Cash on Home Delivery",
        description:
            "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: FaMoneyBillWave,
    },
    {
        title: "Corporate Service / Contract In Logistics",
        description:
            "Customized corporate services which includes warehouse and inventory management support.",
        icon: FaBuilding,
    },
    {
        title: "Parcel Return",
        description:
            "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: FaUndoAlt,
    },
];

const Services = () => {
    return (
        <section className="bg-[#03373D] my-9 rounded-3xl py-16 px-8">
            <div className="max-w-7xl mx-auto text-center text-white">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Our Services
                </h2>

                {/* Subtitle */}
                <p className="max-w-3xl mx-auto text-sm md:text-base mb-12 text-gray-200">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time,
                    every time.
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {servicesData.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            highlight={index === 1} // Only 2nd card highlighted
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;