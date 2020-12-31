import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingAddressScreen(props){

    const userSignin=useSelector(state=>state.userSigninRed);
    const {userInfo}=userSignin;

    const cart=useSelector(state=>state.cartRed);
    const {shippingAddress}=cart;

    if(!userInfo){
        props.history.push('/signin');
    }
    const [fullName,setFullName]=useState(shippingAddress.fullName);
    const [address,setAddress]=useState(shippingAddress.address);
    const [city,setCity]=useState(shippingAddress.city);
    const [postalCode, setPostalCode]=useState(shippingAddress.postalCode);
    const [country,setCountry]=useState(shippingAddress.country);

    const dispatch=useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName,address,city,postalCode,country}));
        props.history.push('/payment');
    }
    return(
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="login-page shipping-page">
                <form className="form" onSubmit={submitHandler}>
                    <div><h1>Shipping Address</h1></div>
                    <div className="input-type-div">
                        <label htmlFor="fullName">Fullname</label>
                        <input className="input-type" type="text"
                                id="fullName"
                                placeholder="Enter Full Name"
                                value={fullName}
                                onChange={(e)=>setFullName(e.target.value)}
                                requried></input>
                    </div>
                    <div className="input-type-div">
                        <label htmlFor="address">Address</label>
                        <input className="input-type" type="text"
                                id="address"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                requried></input>
                    </div>
                    <div className="input-type-div">
                        <label htmlFor="fullName">City/Town</label>
                        <input className="input-type" type="text"
                                id="city"
                                placeholder="Enter city or town name"
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                                requried></input>
                    </div>
                    <div className="input-type-div">
                        <label htmlFor="fullName">Postal Code</label>
                        <input className="input-type" type="text"
                                id="postalCode"
                                placeholder="Enter Postal Code"
                                value={postalCode}
                                onChange={(e)=>setPostalCode(e.target.value)}
                                requried></input>
                    </div>
                    <div className="input-type-div">
                        <label htmlFor="fullName">Country</label>
                        <input className="input-type" type="text"
                                id="country"
                                placeholder="Enter Country"
                                value={country}
                                onChange={(e)=>setCountry(e.target.value)}
                                requried></input>
                    </div>
                    <div>
                <button className="signin-btn" type="submit">Continue...</button>
            </div>
                </form>
            </div>
        </div>
    )
}