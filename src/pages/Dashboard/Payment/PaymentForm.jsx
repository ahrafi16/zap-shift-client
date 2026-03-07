import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../../src/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../shared/loading/Loading";
import useAuth from '../../../../src/hooks/useAuth';
import Swal from "sweetalert2";


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

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
    const amount = parcelInfo?.delivery_cost || 0;
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
                    name: user.displayName,
                    email: user.email
                }
            }
        });

        if (result.error) {
            setError(result.error.message);
        } else {
            setError('');
            if (result.paymentIntent.status === 'succeeded') {
                const transactionId = result.paymentIntent.id;
                const paymentData = {
                    parcelId,
                    email: user.email,
                    amount,
                    transactionId: transactionId,
                    paymentMethod: result.paymentIntent.payment_method_types
                }

                const paymentRes = await axiosSecure.post('/payments', paymentData);
                if (paymentRes.data.insertedId) {
                    console.log("Payment succeed");


                    // Clear the card form
                    const cardElement = elements.getElement(CardElement);
                    if (cardElement) {
                        cardElement.clear();
                    }

                    await Swal.fire({
                        icon: "success",
                        title: "Payment Successful!",
                        text: "Your payment has been completed successfully.",
                        confirmButtonText: "OK",
                        showConfirmButton: false,
                        timer: 2000
                    });

                    navigate('/dashboard/myParcels');

                }
            }
        }
    }


    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className="p-2 border rounded">

                </CardElement>
                <button className="border-2 border-primary bg-primary text-black px-5 py-2 rounded-lg  font-bold hover:opacity-90 transition cursor-pointer w-full" type="submit" disabled={!stripe || !elements}>
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