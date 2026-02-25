import React from "react";

const CustomerReviewCard = ({ review }) => {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-md max-w-md mx-auto transition-all duration-300">

            {/* Quotes */}
            <div className="text-5xl mb-4"><img src="/assets/reviewQuote.png" alt="Quote"/></div>

            {/* Review */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                {review.review}
            </p>

            {/* Divider */}
            <div className="border-t-2 border-dashed border-gray-300 mb-6"></div>

            {/* User Info */}
            <div className="flex items-center gap-4">
                {/* Circle */}
                <div className="w-12 h-12 rounded-full bg-[#03373D]"></div>

                <div>
                    <h4 className="font-semibold text-[#03373D]">
                        {review.userName}
                    </h4>
                    <p className="text-sm text-gray-500">
                        Customer
                    </p>
                </div>
            </div>

        </div>
    );
};

export default CustomerReviewCard;