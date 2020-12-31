import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export default function ProfileScreen(){

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPasswrod,setConfirmPassword]=useState(''); 

    const userSignin=useSelector((state)=>state.userSigninRed);
    const {userInfo}=userSignin;
    const userDetails=useSelector(state=>state.userDetailsRed);
    const {loading,error,user}=userDetails;

    const userUpdateProfile=useSelector(state=>state.userUpdateProfileRed);
    const {success:successUpdate,error:errorUpdate,loading:loadingUpdate}=userUpdateProfile;

    const dispatch=useDispatch();

    useEffect(()=>{
        if(!user){
            dispatch({type:USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id));
        }else{
            setName(user.name);
            setEmail(user.email);
        }
        
    },[dispatch,user,userInfo._id]);

    const submitHandler=(e)=>{
        e.preventDefault();
        if(password !== confirmPasswrod){
            alert('Password and confirm password donot match');
        }else{
            dispatch(updateUserProfile({userId:user._id,name,email,password}))
        }
    }


    return(
        <div className="login-page">
      
                    <form className="form" onSubmit={submitHandler}>
                        <div>
                            <h1>User Profile</h1>
                        </div>
                        { loading ? (<LoadingBox></LoadingBox>
                        ): ( 
                            error ? ( <MessageBox variant="danger">{error}</MessageBox>
                        ):(
                            <>
                            {loadingUpdate && (<LoadingBox></LoadingBox>)}
                            {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                            {successUpdate && (<MessageBox variant="success">Profile Updated Successfully</MessageBox>)}
                                <div className="avatar-div">
                                    <img className="avatar-img" src="./images/avatar.png" alt=""/>
                                </div>
                                <div className="input-type-div">
                                    <label htmlFor="name">Fullname</label>
                                    <input 
                                        className="input-type" 
                                        type="text" id="name" 
                                        placeholder="Please Enter your full name" 
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </div>
                                <div className="input-type-div">
                                    <label htmlFor="email">Email-address</label>
                                    <input 
                                        className="input-type" 
                                        type="email" id="email" 
                                        placeholder="Please Enter your Email-address here" 
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="input-type-div">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        className="input-type" 
                                        type="password" id="password" 
                                        placeholder="Enter your password here"
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="input-type-div">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input 
                                        className="input-type" 
                                        type="password" id="confirmPassword" 
                                        placeholder="Confirm your password here"
                                        onChange={(e)=>setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <button className="signin-btn" type="submit">Update</button>
                                </div>
                            </>
                        ))}
        
                        
            
                    </form>
      
        </div>
      )
      }
