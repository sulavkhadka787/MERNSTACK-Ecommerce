import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { ORDER_CREATE_REQUEST, ORDER_CREATE_RESET } from '../constants/orderConstants';

export default function PlaceOrderScreen(props){
    const cart=useSelector(state=>state.cartRed);
    if(!cart.paymentMethod){
        props.history.push('/payment');
    }

    const orderCreate=useSelector(state=>state.orderCreateRed);
    const {loading,success,error,order}=orderCreate;

    const toPrice=(num)=>Number(num.toFixed(2)); //5.1234=>"5.12"->5.12

    cart.itemsPrice=toPrice(cart.cartItems.reduce((a,c)=>a + c.qty * c.price,0));
    cart.shippingPrice=cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice=toPrice(0.15*cart.itemsPrice);
    cart.totalPrice=cart.itemsPrice+cart.shippingPrice+cart.taxPrice;
    const dispatch=useDispatch();

    const placeOrderHandler=()=>{
        dispatch(createOrder({...cart,orderItems:cart.cartItems}))
    }

    useEffect(()=>{
        if(success){
            props.history.push(`/order/${order._id}`);
            dispatch({type:ORDER_CREATE_RESET});
        }
    },[dispatch, order,props.history,success]);

    return(
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="cart-main cart-main-order">
                <div className="cart-main-1 cart-main-order">
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                    <div><h2>Shipping Information</h2></div>
                    <div>
                        <p>
                            <strong>Name:</strong>{cart.shippingAddress.fullName} <br/>
                            <strong>Address:</strong>{cart.shippingAddress.address},{ cart.shippingAddress.city}
                                                     {cart.shippingAddress.postalCode},{cart.shippingAddress.country}                        </p>
                    </div>
                    <div><h2>Payment</h2></div>
                    <div>
                        <p>
                            <strong>Payment method:</strong>{cart.paymentMethod} <br/>
                        </p>
                    </div>
                    <div><h2>Ordered Items</h2> </div>
                    <div>
                        <ul className="cart-ul">
                                {cart.cartItems.map((item)=>(
                                    <li key={item.productId}>
                                        <div className="cart-li">
                                            <div>
                                                <img src={item.image} alt={item.image} />                                    
                                            </div>
                                            <div className="cart-item-name">
                                                <Link className="cart-font" to={`/product/${item.productId}`}>{item.name}</Link>
                                            </div>
                                            
                                            <div className="cart-font">${item.price * item.qty}</div>
                                            
                                        </div>
                                    </li>
                                ))}
                            
                            </ul>
                    </div>
                </div>
                
                <div className="cart-main-2 cart-main-order">
                    <div>
                        <ul>
                            <li>
                                <h2><u>Order Summary</u></h2>
                            </li>
                            <li>
                                <div>Price:</div>
                                <div>${cart.itemsPrice}</div>
                            </li>
                            <li>
                                <div>Shipping:</div>
                                <div>${cart.shippingPrice}</div>
                            </li>
                            <li>
                                <div>Tax:</div>
                                <div>${cart.taxPrice}</div>
                            </li>
                            <li>
                                <div><strong>Order Total:</strong></div>
                                <div><b>{cart.totalPrice}</b></div>
                            </li>
                            <li>
                                <button 
                                    type="button" 
                                    onClick={placeOrderHandler}
                                    className="primary"
                                    disabled={cart.cartItems.length===0}
                                    >
                                        Place Order
                                </button>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    )
}