

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: "Booking Pick & Drop",
            description: "From personal packages to business shipments — we deliver on time, every time.",
            image: "/assets/bookingIcon.png"
        },
        {
            id: 2,
            title: "Cash On Delivery",
            description: "From personal packages to business shipments — we deliver on time, every time.",
            image: "/assets/bookingIcon.png"
        },
        {
            id: 3,
            title: "Delivery Hub",
            description: "From personal packages to business shipments — we deliver on time, every time.",
            image: "/assets/bookingIcon.png"
        },
        {
            id: 4,
            title: "Booking SME & Corporate",
            description: "From personal packages to business shipments — we deliver on time, every time.",
            image: "/assets/bookingIcon.png"
        },
    ]
    return (
        <div className="max-w-5xl mx-auto my-9">
            <h2 className="text-3xl font-bold mb-6">How it Works</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {
                    steps.map(step => (
                        <div className="bg-white flex flex-col gap-3 rounded-2xl p-4" key={step.id}>
                            <img className="w-14" src={step.image} alt={step.title} />
                            <h3 className="font-semibold">{step.title}</h3>
                            <p className="text-sm">{step.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default HowItWorks;