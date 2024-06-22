import React from 'react';
// import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import {
   
    Elements
  } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const PurchaseCoin = () => {
    return (
        <div>
            <div>
                <h1 className=' text-center font-bold'>Here, You Can Purchase Your Coin Using YOUr Card</h1>
            </div>

            <div>
            
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
            
        </div>
    );
};

export default PurchaseCoin;