import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import {Link} from 'react-router-dom';

export default function CartScreen(props){
    const productId=props.match.params.id;
    const qty=props.location.search
                ? Number(props.location.search.split('=')[1])
                :1;
    const cart=useSelector(state=>state.cartRed);
    const {cartItems}=cart;
    const dispatch=useDispatch();

    useEffect(()=>{
        if(productId){
            console.log('xxx',props.location.search.split('=')[1]);
            console.log('xxx',props.location.search.split('=')[0]);
            console.log('yyy',props.location.search);
            dispatch(addToCart(productId,qty));
            }
        },[dispatch,productId,qty])


    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id));
    }

    const checkoutHandler=()=>{
       props.history.push('/signin?redirect=shipping');
    }

    return(
        <div>
            <h1>Shopping Cart</h1>
            <div className="cart-main">
                <div className="cart-main-1">
                    {cartItems.length===0 ? (<MessageBox>
                        Cart is Empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>):(
                        <ul className="cart-ul">
                            {cartItems.map((item)=>(
                                <li key={item.productId}>
                                    <div className="cart-li">
                                        <div>
                                            <img src={item.image} alt={item.image} />                                    
                                        </div>
                                        <div className="cart-item-name">
                                            <Link className="cart-font" to={`/product/${item.productId}`}>{item.name}</Link>
                                        </div>
                                        <div className="cart-li-select">
                                            <select 
                                                value={item.qty}
                                                onChange={(e)=>dispatch(addToCart(item.productId,Number(e.target.value)))}
                                                >
                                                    {[...Array(item.countInStock).keys()].map((x)=>(
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))}
                                                
                                            </select>
                                        </div>
                                        <div className="cart-font">${item.price * item.qty}</div>
                                        <div>
                                            <button type="button" className="btn-delete" onClick={()=>{removeFromCartHandler(item.productId)}}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        
                        </ul>
                    )}
                    
                </div>
                <div className="cart-main-2">
                    <div>
                        <ul>
                            <li>
                                <h2>
                                    Sub-Total:({cartItems.reduce((a,c)=>a+c.qty,0)} items): $
                                    {cartItems.reduce((a,c)=>a+c.price * c.qty,0)}
                                </h2>
                            </li>
                            <li>
                                <button 
                                    type="button" 
                                    onClick={checkoutHandler}
                                    className="primary"
                                    disabled={cartItems.length===0}
                                    >
                                        Proceed to CheckOut
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

