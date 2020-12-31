import Axios from "axios";
import {PayPalButton} from 'react-paypal-button-v2';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../constants/orderConstants";

export default function OrderScreen(props){

    const orderId=props.match.params.id;

    const [sdkReady,setSdkReady]=useState(false);

    const orderDetails=useSelector(state=>state.orderDetailsRed);
    const {order,loading,error}=orderDetails;

    const userSignin=useSelector(state=>state.userSigninRed);
    const {userInfo}=userSignin;

    const orderPay=useSelector(state=>state.orderPayRed);
    const {loading:loadingPay,error:errorPay,success:successPay}=orderPay;

    const orderDeliver=useSelector(state=>state.orderDeliverRed);
    const {loading:loadingDeliver,error:errorDeliver,success:successDeliver}=orderDeliver;

    const dispatch=useDispatch();

    useEffect(()=>{
        const addPayPalScript=async ()=>{
            const {data}=await Axios.get('/api/config/paypal');
            const script=document.createElement('script');
            script.type="text/javascript";
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async=true;
            script.onload=()=>{
                setSdkReady(true);
            }
            document.body.appendChild(script);
        };
        if(!order ||successPay||successDeliver||(order && order._id !==orderId)){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(detailsOrder(orderId));
        }else{
            if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript();
                }else{
                    setSdkReady(true);
                }
            }
        }
        
    },[dispatch,order,orderId,sdkReady,successPay,successDeliver]);

    const successPaymentHandler=(paymentResult)=>{
        dispatch(payOrder(order,paymentResult));
    }

    const deliverHandler=()=>{
        dispatch(deliverOrder(order._id));
    }
    return loading ? (<LoadingBox></LoadingBox>):
        error ? (<MessageBox variant="danger">{error}</MessageBox>
        ):(
            <div>
                
                <div className="cart-main cart-main-order">
                
                        <div className="cart-main-1 cart-main-order">
                            
                            <div><h1>Order Number: {order._id}</h1></div>
                        
                            <div><h2>Shipping Information</h2></div>
                            
                            <div>
                                <p>
                                    <strong>Name:</strong>{order.shippingAddress.fullName} <br/>
                                    <strong>Address:</strong>{order.shippingAddress.address},{ order.shippingAddress.city}
                                                            {order.shippingAddress.postalCode},{order.shippingAddress.country}    
                                </p>
                                   
                                <div>
                                <p>
                                    {order.isDelivered ? <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                                                        :<MessageBox variant="danger">Not Delivered</MessageBox> }
                                    </p><br/><br/>
                                </div>
                                
                            </div>
                            <div><h2>Payment</h2></div>
                            <div>
                                <p>
                                    <strong>Payment method:</strong>{order.paymentMethod} <br/>
                                    
                                </p>
                                {order.isPaid ? <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                                    :<MessageBox variant="danger">Not Paid</MessageBox>    
                            }<br/><br/>
                            </div>
                            <div><h2>Ordered Items</h2> </div>
                            
                            
                            
                            
                            <div>
                                <ul className="cart-ul">
                                        {order.orderItems.map((item)=>(
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
                                        <div>${order.itemsPrice}</div>
                                    </li>
                                    <li>
                                        <div>Shipping:</div>
                                        <div>${order.shippingPrice}</div>
                                    </li>
                                    <li>
                                        <div>Tax:</div>
                                        <div>${order.taxPrice}</div>
                                    </li>
                                    <li>
                                        <div><strong>Order Total:</strong></div>
                                        <div><b>{order.totalPrice}</b></div>
                                    </li>
                                    
                                    {
                                        !order.isPaid && (
                                            <div>
                                                {!sdkReady ? (
                                                    <LoadingBox></LoadingBox>
                                                ) : (
                                                    <PayPalButton className="paypalbtn"
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                        >

                                                    </PayPalButton>
                                                )}
                                            </div>
                                        )
                                    }
                                    {errorPay && (
                                        <MessageBox variant="danger">{errorPay}</MessageBox>
                                    )}
                                    {loadingPay && <LoadingBox></LoadingBox>}

                                    {
                                        userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                            
                                            <div>
                                                {loadingDeliver  && <LoadingBox> </LoadingBox> }
                                                {errorDeliver && <MessageBox variant="danger">{errorDeliver}</MessageBox>}
                                                <button type="button" className="primary" onClick={deliverHandler}>Deliver Order</button>
                                            </div>
                                            
                                        )
                                    }
                                </ul>
                                
                            </div>
                        </div>
                </div>
            
            </div>
        );


}