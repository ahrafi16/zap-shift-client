import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../src/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../shared/loading/Loading";


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');

    const { data: parcelInfo = {}, isPending } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    if (isPending) {
        return <Loading></Loading>
    }

    console.log(parcelInfo);
    const amount = parcelInfo.delivery_cost;
    const amountInCents = amount * 100;
    console.log(amountInCents)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)
        } else {
            setError('');
            console.log('Payment method:', paymentMethod)
        }

        // create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            parcelId
        })
        const clientSecret = res.data.clientSecret;
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "Jenny"
                }
            }
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log("Payment Succeeded!");
            }
        }
    }


    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className="p-2 border rounded">

                </CardElement>
                <button className="border-2 border-primary bg-primary text-black px-5 py-2 rounded-lg  font-bold hover:opacity-90 transition cursor-pointer w-full" type="submit" disabled={!stripe}>
                    Pay  ৳{amount}
                </button>
                {
                    error && <p className="text-red-500">{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;