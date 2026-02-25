import React from "react";
import BenefitCard from "./BenefitCard";

const benefitsData = [
    {
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        icon: "/assets/location-merchant.png",
    },
    {
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        icon: "/assets/safe-delivery.png",
    },
    {
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        icon: "/assets/customer-top.png",
    },
];

const Benefits = () => {
    return (
        <section className="py-16 border-y-2 my-9 border-dashed border-gray-300">
            <div className="space-y-6">
                {benefitsData.map((benefit, index) => (
                    <BenefitCard
                        key={index}
                        icon={benefit.icon}
                        title={benefit.title}
                        description={benefit.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default Benefits;