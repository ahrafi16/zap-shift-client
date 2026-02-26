import { useState } from "react";


const faqs = [
    {
        id: 1,
        question: "How does this posture corrector work?",
        answer:
            "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
        defaultOpen: true,
    },
    {
        id: 2,
        question: "Is it suitable for all ages and body types?",
        answer:
            "Yes! Our posture corrector is designed with adjustable straps and flexible materials to accommodate a wide range of body types and sizes. Whether you're a teenager developing healthy habits or an adult correcting years of poor posture, it can be comfortably tailored to fit your unique frame. We recommend consulting a physician if you have a pre-existing medical condition.",
        defaultOpen: false,
    },
    {
        id: 3,
        question: "Does it really help with back pain and posture improvement?",
        answer:
            "Absolutely. Clinical studies and user feedback confirm that consistent use of a posture corrector can significantly reduce upper and lower back pain by realigning the spine and relieving pressure on muscles. Most users report noticeable improvements within 2–4 weeks of daily use. For best results, pair it with stretching exercises and ergonomic workspace adjustments.",
        defaultOpen: false,
    },
    {
        id: 4,
        question: "Does it have smart features like vibration alerts?",
        answer:
            "Yes — our Posture Pro model includes a built-in smart sensor that monitors your posture in real time. When it detects slouching beyond a set threshold, it gently vibrates to remind you to straighten up. You can customize sensitivity levels and alert frequency through the companion mobile app, making it a truly intelligent posture coaching experience.",
        defaultOpen: false,
    },
    {
        id: 5,
        question: "How will I be notified when the product is back in stock?",
        answer:
            'Simply click the "Notify Me" button on the product page and enter your email address. You\'ll receive an automated email the moment the item is restocked. We also recommend following our social media channels for real-time updates on inventory, flash sales, and exclusive early-access drops for subscribers.',
        defaultOpen: false,
    },
];

function FAQItem({ faq, isOpen, onToggle, isHighlighted }) {
    return (
        <div
            className={`rounded-xl border overflow-hidden transition-all duration-300 ${isHighlighted
                    ? "border-[#067A87] bg-[#C3DFE2]/40"
                    : "border-gray-200 bg-white"
                }`}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-6 py-4 text-left group focus:outline-none"
                aria-expanded={isOpen}
            >
                <span
                    className={`text-sm font-semibold transition-colors duration-200 ${isHighlighted
                            ? "text-[#034F57]"
                            : "text-gray-800 group-hover:text-[#067A87]"
                        }`}
                >
                    {faq.question}
                </span>

                {/* Chevron icon */}
                <span
                    className={`ml-4 shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ${isHighlighted ? "bg-[#067A87]/10" : "bg-gray-100"
                        } ${isOpen ? "rotate-180" : "rotate-0"}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 transition-colors duration-200 ${isHighlighted ? "text-[#067A87]" : "text-gray-500"
                            }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            {/* Animated answer panel */}
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div className="overflow-hidden">
                    <p
                        className={`px-6 pb-5 text-sm leading-relaxed transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                            } ${isHighlighted ? "text-[#034F57]/80" : "text-gray-500"}`}
                    >
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FAQSection() {
    const [openId, setOpenId] = useState(1);

    const toggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className=" bg-[#EEF4F5] py-16 px-4 flex flex-col items-center">
            {/* Header */}
            <div className="text-center max-w-2xl mb-10">
                <h2 className="text-3xl font-bold text-[#034F57] mb-3">
                    Frequently Asked Question (FAQ)
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                    Enhance posture, mobility, and well-being effortlessly with Posture
                    Pro. Achieve proper alignment, reduce pain, and strengthen your body
                    with ease!
                </p>
            </div>

            {/* FAQ List */}
            <div className="w-full max-w-5xl flex flex-col gap-3">
                {faqs.map((faq) => (
                    <FAQItem
                        key={faq.id}
                        faq={faq}
                        isOpen={openId === faq.id}
                        onToggle={() => toggle(faq.id)}
                        isHighlighted={faq.id === 1 && openId === 1}
                    />
                ))}
            </div>

            {/* CTA Button */}
            <div className="mt-10 flex items-center gap-3">
                <a
                    href="/"
                    className="flex items-center gap-3 bg-[#CAEB66] text-[#1a1a1a] font-semibold text-sm px-6 py-3 rounded-2xl shadow hover:brightness-105 hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                    See More FAQ's
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1a1a1a] text-[#CAEB66]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 17L17 7M7 7h10v10"
                            />
                        </svg>
                    </span>
                </a>
            </div>
        </section>
    );
}