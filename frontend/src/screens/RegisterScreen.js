import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const redirect=props.location.search ? props.location.search.split('=')[1]:'/';

    const userRegister=useSelector(state=>state.userRegisterRed);
    const {userInfo,loading,error}=userRegister;

    const dispatch=useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and confirmPassword donot match');
        }else{
            dispatch(register(name,email,password));
        }   
        
    }

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect);
        }
    },[userInfo])
    return(
        <div className="login-page">
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Please Create your account</h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div className="avatar-div">
                <img className="avatar-img" src="./images/avatar.png" alt=""/>
            </div>
            <div className="input-type-div">
                <label htmlFor="name">Fullname</label>
                <input 
                    className="input-type" 
                    type="text" id="name" 
                    placeholder="Please Enter your Email-address here" 
                    required
                    onChange={(e)=>setName(e.target.value)}
                    />
            </div>
            <div className="input-type-div">
                <label htmlFor="email">Email-address</label>
                <input 
                    className="input-type" 
                    type="email" id="email" 
                    placeholder="Please Enter your Email-address here" 
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                    />
            </div>
            <div className="input-type-div">
                <label htmlFor="password">Password</label>
                <input 
                    className="input-type" 
                    type="password" id="password" 
                    placeholder="Enter your password here"
                    required
                    onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="input-type-div">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                    className="input-type" 
                    type="password" id="confirmPassword" 
                    placeholder="Confirm your password here"
                    required
                    onChange={(e)=>setConfirmPassword(e.target.value)} />
            </div>
            <div>
                <button className="signin-btn" type="submit">Create Account</button>
            </div>
            <div className="signin-reg"><p>Already Registered ? <span><Link to={`/signin?redirect=${redirect}`}>Sign-In here</Link></span></p></div>
        </form>
    </div>
    )
}