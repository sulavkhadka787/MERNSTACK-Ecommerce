import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function ProductScreen(props){
    const dispatch=useDispatch();
    const productId=props.match.params.id;
    const [qty,setQty]=useState(1);
    const productDetails=useSelector(state=>state.productDetailsRed);
    const {loading,error,product}=productDetails;
    
    useEffect(()=>{
        dispatch(detailsProduct(productId))
    },[dispatch,productId])

    const addToCartHandler=()=>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }
    return(

        <div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ): error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ):(
            
            <div>
                <Link to="/" className="back-to">Back to results</Link>
                <div className="product-grid-container">
                <div className="product-grid">
                    <img src={product.image} alt="#" />
                </div>
                <div className="product-grid">
                <ul>
                    <li>
                       <u><h1>{product.name}</h1></u> 
                    </li>
                    <li>
                        <Rating
                            rating={product.rating}
                            numReviews={product.numReviews}
                        ></Rating>
                    </li>
                    <li>
                        Price :${product.price}
                    </li>
                    <li>
                        Description:{product.description}
                    </li>
                </ul> 
                </div>
                <div className="product-grid side">
                <ul>
                        <li>
                            <div className="row">
                                <div>Price : </div>
                                <div>${product.price}</div>
                            </div>
                        </li>
                        <li>
                            
                                <div class="row">
                                    <div>Status : </div>
                                    <div>
                                    {product.countInStock > 0 ? (
                                        <span className="success">In Stock</span>
                                    ) : (
                                        <span className="danger">Unavailable</span>
                                    )}
                                
                                    </div>
                               
                                    
                                </div>
                        </li>
                        {
                                product.countInStock > 0 && (
                                    <>
                                    <li>
                                        <div className="row">
                                            <div>Qty</div>
                                            <div>
                                                <select value={qty} onChange={(e)=>setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(
                                                            (x)=>(
                                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                
                            
                        <li>
                            <button 
                            onClick={addToCartHandler}
                            className="primary">Add to Cart</button>
                        </li>
                        </>
                                )}
                    </ul>
                </div>
            </div>
            </div>
         
          )}
          
          </div>
    );
            
}