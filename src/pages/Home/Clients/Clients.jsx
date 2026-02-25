import React from "react";
import Marquee from "react-fast-marquee";

const Clients = () => {
    const logos = [
        "/assets/brands/casio.png",
        "/assets/brands/amazon.png",
        "/assets/brands/moonstar.png",
        "/assets/brands/randstad.png",
        "/assets/brands/star.png",
        "/assets/brands/amazon_vector.png",
        "/assets/brands/start_people.png",
    ];

    return (
        <section className="py-16 my-9">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold mb-12 text-[#03373D]">
                    We've helped thousands of sales teams
                </h2>

                <Marquee
                    speed={90}
                    gradient={false}
                    pauseOnHover={true}
                >
                    {logos.map((logo, index) => (
                        <div key={index} className="mx-10">
                            <img
                                src={logo}
                                alt="client-logo"
                                className="h-6 object-contain"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default Clients;