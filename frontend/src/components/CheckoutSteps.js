import React from 'react';

export default function CheckoutSteps(props){
    return(
        <div className="checkout-steps">
            <div className={props.step1 ? 'active' : ''}><span>Sign-In</span></div>
            <div className={props.step2 ? 'active' : ''}><span>Shipping</span></div>
            <div className={props.step3 ? 'active' : ''}><span>Payment</span></div>
            <div className={props.step4 ? 'active' : ''}><span>Place Order</span></div>
        </div>
    )
}