

const BecomeMerchant = () => {
    return (
        <section
            className="p-16 my-9 rounded-4xl bg-[#03373D] bg-no-repeat"
            style={{
                backgroundImage: "url('/assets/be-a-merchant-bg.png')",
                backgroundSize: "100%",
                backgroundPosition: "center top",

            }}
        >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                {/* Left Content */}
                <div className="text-white flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
                        Merchant and Customer Satisfaction is Our First Priority
                    </h2>

                    <p className="text-gray-200 mb-8 text-sm md:text-base leading-relaxed max-w-xl">
                        We offer the lowest delivery charge with the highest value along
                        with 100% safety of your product. Pathao courier delivers your
                        parcels in every corner of Bangladesh right on time.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Primary Button */}
                        <button className="bg-[#CAEB66] text-black px-6 py-3 rounded-full font-semibold hover:opacity-90 transition cursor-pointer">
                            Become a Merchant
                        </button>

                        {/* Secondary Button */}
                        <button className="border-2 border-[#CAEB66] text-[#CAEB66] px-6 py-3 rounded-full font-semibold hover:bg-[#CAEB66] hover:text-black transition cursor-pointer">
                            Earn with ZapShift Courier
                        </button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex-1 flex justify-center lg:justify-end">
                    <img
                        src="/assets/location-merchant.png"
                        alt="Become Merchant"
                        className="max-w-sm md:max-w-md lg:max-w-lg object-contain"
                    />
                </div>

            </div>
        </section>
    );
};

export default BecomeMerchant;