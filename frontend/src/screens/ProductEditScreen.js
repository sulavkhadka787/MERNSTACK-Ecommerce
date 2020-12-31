import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props){
    const productId=props.match.params.id;
    
    const [name,setName]=useState();
    const [price, setPrice]=useState();
    const [image,setImage]=useState();
    const [category,setCategory]=useState();
    const [countInStock,setCountInStock]=useState();
    const [brand, setBrand]=useState();
    const [description,setDescription]=useState();

    const productDetails=useSelector(state=>state.productDetailsRed);
    const {loading,error,product}=productDetails;

    const productUpdate=useSelector(state=>state.productUpdateRed);
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=productUpdate;

    const dispatch=useDispatch();
    useEffect(()=>{
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET});
            props.history.push('/productlist');
        }
        if(!product || product._id !== productId || successUpdate){
            dispatch(detailsProduct(productId));
        }else{
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
        }
        
    },[product,dispatch,productId,successUpdate,props.history]);

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            category,
            brand,
            countInStock,
            description
        }))
    }

    const [loadingUpload,setLoadingUpload]=useState(false);
    const [errorUpload,setErrorUpload]=useState('');

    const userSignin=useSelector(state=>state.userSigninRed);
    const {userInfo}=userSignin;

    const uploadFileHandler=async (e)=>{
        const file=e.target.files[0];
        const bodyFormData=new FormData();
        bodyFormData.append('image',file);
        setLoadingUpload(true);
        try{
            const {data}=await Axios.post(
                        '/api/uploads',
                        bodyFormData,
                        {headers:{'Content-Type':'multipart/form-data',Authorization:`Bearer ${userInfo.token}`}})
            setImage(data);
            setLoadingUpload(false);
        }catch(error){
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }
    return(
            <div className="login-page product-edit-page">
                <form className="form" onSubmit={submitHandler}>
                    <div>
                        <h1>Edit Product: {productId} </h1>
                    </div>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                        :
                        <>
                            <div className="avatar-div">
                                 <img className="avatar-img" src="/images/avatar.png" alt=""/>
                            </div>
                            <div className="input-type-div">
                                <label htmlFor="name">Product Name</label>
                                <input 
                                    className="input-type" 
                                    type="text" id="name" 
                                    placeholder="Please Enter Product Name" 
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    />
                            </div>
                            <div className="input-type-div">
                                <label htmlFor="price">Product Price:</label>
                                <input 
                                    className="input-type" 
                                    type="text" id="price" 
                                    placeholder="Please Enter price of the Product" 
                                    value={price}
                                    onChange={(e)=>setPrice(e.target.value)}
                                    />
                            </div>
                            <div className="input-type-div">
                                <label htmlFor="image">Product Image</label>
                                <input 
                                    className="input-type" 
                                    type="text" id="image" 
                                    placeholder="Upload Image here"
                                    value={image}
                                    onChange={(e)=>setImage(e.target.value)} />
                            </div>
                            <div>
                                <label htnlFor="imageFile">Image File</label>
                                <input type="file" id="imageFile" label="Choose Image" onChange={uploadFileHandler}/>
                            </div>
                            {loadingUpload && <LoadingBox></LoadingBox>}
                            {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                            
                            <div className="input-type-div">
                                <label htmlFor="category">Product Category</label>
                                <input 
                                    className="input-type" 
                                    type="text" id="catetory" 
                                    placeholder="Enter product category here"
                                    value={category}
                                    onChange={(e)=>setCategory(e.target.value)} />
                            </div>
                            <div className="input-type-div">
                                <label htmlFor="brand">Product Brand</label>
                                <input 
                                    className="input-type" 
                                    type="text" id="brand" 
                                    placeholder="Enter product brand here"
                                    value={brand}
                                    onChange={(e)=>setBrand(e.target.value)} />
                            </div>
                            <div className="input-type-div">
                                <label htmlFor="countInStock">Count-In-Stock</label>
                                <input 
                                    className="input-type" 
                                    type="text" id="countInStock" 
                                    placeholder="Enter count in stock here"
                                    value={countInStock}
                                    onChange={(e)=>setCountInStock(e.target.value)} />
                            </div>
                            <div className="input-type-div">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    rows="3"
                                    className="input-type" 
                                    type="text" id="description" 
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e)=>setDescription(e.target.value)} />
                            </div>
                            <div>
                                <button className="signin-btn" type="submit">Edit Product</button>
                            </div>
                           
                        </>
                    }
            
                    
            
                </form>
            </div>
     )
}