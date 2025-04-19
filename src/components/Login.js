 import React, { useRef, useState } from 'react';
import Headr from './Headr';
import { Valid} from '../utls/Valid';
import {auth} from "../utls/firebase";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile} from 'firebase/auth';
 
import { useDispatch } from 'react-redux';
import { addUser } from '../utls/userSlice';
import { BG_URL, User_Avatar } from '../utls/constant';
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
 
 const Login = () => {
  const dispatch = useDispatch();
 
  const [issignform,setIssignform] = useState(true);
  const signupform = () => {
    setIssignform(!issignform);
  }
  const email = useRef(null);
  const password= useRef(null);
  const name = useRef(null);
  const [errormessage,setErrormessage] = useState(null);
  const[isActive,setIsActive] = useState(false);

  const toggleActive = ()=>{
    setIsActive((prev)=>!prev);
  };

  const handlebuttonclick =()=>{
    
      const message = issignform?  Valid(email.current.value,password.current.value):Valid(email.current.value,password.current.value,name.current.value);
    
   
     setErrormessage(message);
     if(message)return;
     //sign in sign up logic
     if(!issignform){
      // sign up logic
      createUserWithEmailAndPassword(auth,email.current.value,password.current.value,name.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        updateProfile(user, {
          displayName: name.current.value , photoURL:User_Avatar
        }).then(() => {
          const {uid,email,displayname,photoURL} = auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayname:displayname,photoURL:photoURL}));
          
      
        }).catch((error) => {
           setErrormessage(error.message);
        });
        
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrormessage(errorCode + "-" + errorMessage);
        // ..
      });
        
     }
     else{
      // sign in logic
      signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrormessage(errorCode + "-" + errorMessage);
  });
     }

  }; 
   return (
     <div>
      <Headr></Headr>
      <div className='absolute '>
      <img src= {BG_URL}alt="background" className=" w-screen h-full object-cover md:object-none"></img>
      </div>
      <form onSubmit={(e)=>{e.preventDefault()}}
        className='relative bg-black p-4 md:p-12 w-[50%] md:w-3/12 mx-auto mt-10 left-0 right-0 text-white bg-opacity-80 rounded-lg '>
      <h1 className='font-bold text-2xl md:text-3xl py-4  '>{
        issignform ? "Sign In":"Sign Up"
 }</h1>
        {!issignform&&
        ( 
        
         <>
           <input type="text" placeholder='Enter your Name' className=' text-sm md:text-xl p-2 md:p-4 my-4 w-full bg-gray-800 rounded-md' ref={name}></input>
          <span onClick={toggleActive}  className='cursor-pointer absolute right-14 top-[340px] text-black text-xl'>
          {isActive ? <AiFillEye />: <AiFillEyeInvisible />}
        </span>
         </>

          )

        } 
        <input type="text" placeholder='Enter your email address' className=' p-2  text-sm  md:text-xl md:p-4 my-4 w-full bg-gray-800 rounded-md' ref={email}></input>
        <input type={isActive ? "text":"password"} placeholder='Password' className='text-sm md:text-xl p-2 md:p-4 my-4 w-full bg-gray-800 rounded-md' ref={password}></input>
         {
           issignform &&
           <span onClick={toggleActive}  className='cursor-pointer absolute right-14 top-[244px] text-black text-xl'>
           {isActive ? <AiFillEye />: <AiFillEyeInvisible />}
         </span>
         }
         


        {!issignform&&
          (<input type="tel" placeholder='Phone Number' className=' text-sm md:text-xl p-2 md:p-4 my-4 w-full bg-gray-800 rounded-md'></input>


          )

        }
        <p className='text-sm  p-2 text-red-600 font-bold md:text-lg'>{errormessage}</p>

        <button className='py-4 mx-auto my-6  bg-red-700 w-full font-bold rounded-lg' onClick ={handlebuttonclick}>{issignform ? "Sign In":"Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={signupform}>{issignform ? "New to Netflix ?Sign Up Now ":"Already User ?Sign In Now."} </p>
        </form>
     </div>
   )
 }
 
 export default Login