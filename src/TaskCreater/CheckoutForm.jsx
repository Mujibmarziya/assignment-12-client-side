// import { CardElement } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useCart from "../../../hooks/useCart";
// import useAuth from "../../../hooks/useAuth";
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { axiosCommon } from "../Hooks/useAxiosCommon";
import { AuthContext } from "../Authprovider/Authprovider";
import toast from "react-hot-toast";


const CheckoutForm = () => {
    const [error, setError] = useState('');
    
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    // const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    // const [cart, refetch] = useCart();
    const navigate = useNavigate();
    const [coin, setCoin] = useState(0);
    const [dollar, setDollar] = useState(0);
   
//   console.log(stripe,elements);
const handleamount = (coinn, dollarr) => {
    setCoin(coinn);
    setDollar(dollarr);
    // console.log('Updated coin:', coinn);
    // console.log('Updated dollar:', dollarr);
}
console.log(' coin:', coin,dollar);
// console.log(' dollar:', dollar);

    // const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
       
        if (dollar > 0) {
            axiosCommon.post('/create-payment-intent', { price: dollar })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [ coin,dollar])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const card = elements.getElement(CardElement)
        console.log(card);
        const currentDate = new Date();
        const dateTime = currentDate.toLocaleString();
        const notiData = {
            message: `you have purchased ${coin} for ${dollar}`,
            ToEmail: `${user?.email}`,
            Time: dateTime
            }
         if (card === null) {
             return
         }
        if (!stripe || !elements) {
            console.log('stripe elemet nai');
            return
        }

      

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    displayName:user.displayName,
                    price: dollar,
                    coinGiven:coin,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    status: 'pending'
                }

                const res = await axiosCommon.post('/payments', payment);
                console.log('payment saved', res.data);
                // refetch();
                if (res.data?.insertedId) {
                    fetch("https://assignment-12-server-beige-five.vercel.app/notifications", {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({message:'items added '})})
                    // Update user's coin balance
                await axiosCommon.post('/users', {
                    email: user.email,
                    coins: coin
                });
                toast.success("payment done and coin added")

                // const notisResponse = await notis.json();
                // if(notisResponse){
                //  toast.success('Notification created successfully');
                // }

               
                    navigate('/dashboard/Purchase-History')
                }

            }
        }

    }

    return (
       <div>
        <div className="flex gap-5 mb-6 flex-col lg:flex-row">
            <h1 className="btn btn-secondary bg-indigo-950 text-white border-transparent" onClick={()=>handleamount(10,1)}>10 coins = 1 dollar.</h1>
            <h1 className="btn btn-secondary bg-indigo-950 text-white border-transparent" onClick={()=>handleamount(100,9)}>100 coins = 9 dollar.</h1>
            <h1 className="btn btn-secondary bg-indigo-950 text-white border-transparent" onClick={()=>handleamount(500,19)}>500 coins = 19 dollar.</h1>
            <h1 className="btn btn-secondary bg-indigo-950 text-white border-transparent" onClick={()=>handleamount(1000,39)}>1000 coins = 39 dollar.</h1>
        </div>



        <form onSubmit={handleSubmit}>
        <CardElement
            options={{
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}
        />
        <button className="btn btn-sm btn-primary bg-blue-900 my-4" type="submit" disabled={!stripe || !clientSecret}>
            Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
    </form>
       </div>
    );
};

export default CheckoutForm;