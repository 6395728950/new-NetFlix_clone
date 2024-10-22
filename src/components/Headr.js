import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utls/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utls/userSlice';
import {  User_Avatar ,SUPPORTED_LANG, LOGO} from '../utls/constant';
import { togglegptsearchview } from '../utls/gptslice';
import { changelang } from '../utls/configSlice';

const Headr = () => {
  const showgptsearch = useSelector((store)=>store.gpt.showgptsearch);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handlelangchange =(e)=>{
    dispatch(changelang(e.target.value));
  }
  
  const handleGptSearch = () => {
  
    dispatch(togglegptsearchview());
  };
   console.log("clicked sign out");
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      // Optionally: Show user a notification or message about the error
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate('/Browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className=' w-screen px-8 py-2 bg-gradient-to-r from-black flex justify-between'>
      <img src={LOGO} alt="Logo" className='w-44' />
      {user && (
        <div className=' flex p-2 items-center'>
       {showgptsearch && <select className='rounded-sm' onChange={handlelangchange}>
          {
              SUPPORTED_LANG.map((lang)=>(
                <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                </option>
              ))
          }
          
        </select>
      }
          <button
            className="px-4 py-2 my-2 mx-4 bg-purple-800 text-white rounded-lg hover:bg-opacity-50"
            onClick={handleGptSearch}
            aria-label="Toggle GPT Search View"
          >
            {
              showgptsearch ?"Home Page":"Gpt Search"
            }
          </button>
          <img
            alt="User profile"
            src={User_Avatar}
            className='w-12 h-12 rounded-full'
          />
          <button
            className='text-white font-bold ml-4'
            onClick={handleSignOut}
            aria-label="Sign Out"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Headr;
