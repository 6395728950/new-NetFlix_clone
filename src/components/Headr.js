import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

import { auth } from '../utls/firebase';
import { addUser, removeUser } from '../utls/userSlice';
import { User_Avatar, SUPPORTED_LANG, LOGO } from '../utls/constant';
import { togglegptsearchview } from '../utls/gptslice';
import { changelang } from '../utls/configSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Headr = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showgptsearch);

  const handleLangChange = (e) => {
    dispatch(changelang(e.target.value));
  };

  const handleGptSearchToggle = () => {
    dispatch(togglegptsearchview());
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      toast.success('Signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out!');
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
    <div className='relative w-screen px-8 py-2 bg-gradient-to-r from-black flex flex-col md:flex-row justify-between'>
      <img src={LOGO} alt="Logo" className='w-44 mx-auto md:mx-0' />

      {user?.email && (
        <div className='flex p-2 items-center'>
          {showGptSearch && (
            <select className='rounded-sm px-2 py-1' onChange={handleLangChange}>
              {SUPPORTED_LANG.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className='px-4 py-2 my-2 mx-4 bg-purple-800 text-white rounded-lg hover:bg-opacity-50'
            onClick={handleGptSearchToggle}
          >
            {showGptSearch ? 'Home Page' : 'GPT Search'}
          </button>

          <img
            alt="User profile"
            src={User_Avatar}
            className='w-12 h-12 rounded-full'
          />

          <button
            className='text-white font-bold ml-4'
            onClick={handleSignOut}
          >
            Sign Out
          </button>

          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Headr;

