import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentmethodScreen(props){

    const cart=useSelector(state=>state.cartRed);
    const {shippingAddress}=cart;

    if(!shippingAddress.address){
        props.history.push('/shipping');
    }
    const [paymentMethod,setPaymentMethod]=useState('PayPal');
    const dispatch=useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return(
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="login-page shipping-page">
                <form class="form" onSubmit={submitHandler}>
                <div><h1>Payment Method</h1></div>
                <div>
                    <input type="radio"
                            id="paypal"
                            value="PayPal"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e)=>setPaymentMethod(e.target.value)}
                    ></input>
                    <label htmlFor="paypal">PayPal</label>
                </div>
                <div>
                    <input type="radio"
                            id="stripe"
                            value="Stripe"
                            name="paymentMethod"
                            required
                            onChange={(e)=>setPaymentMethod(e.target.value)}
                    ></input>
                    <label htmlFor="stripe">Stripe</label>
                </div>
                <div>
                    <button className="signin-btn" type="submit">Continue...</button>
                </div>
            </form>
            </div>
            
        </div>
    )
}