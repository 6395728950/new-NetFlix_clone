import React from 'react'
import lang from '../utls/langconstant'
import { useSelector } from 'react-redux'


const Gptsearchbar = () => {
  const langkey = useSelector((store)=>store.config.lang);
  return (
    <div className=' ml-[35rem]   -mt-[30rem]'>
           <form className='grid grid-cols-12  rounded-md absolute'>
            <input type = "text" className='p-4 m-4 col-span-10 rounded-full hover:border-blue-800' placeholder={lang[langkey].gptSearchPlaceholder}></input>
            <button className='px-5 rounded-full bg-red-700 text-white  col-span-2'>{lang[langkey].search}</button>
           </form>
    </div>

  )
}

export default Gptsearchbar