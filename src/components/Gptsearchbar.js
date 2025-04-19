import React, { useRef } from 'react'
import lang from '../utls/langconstant'
import { useSelector } from 'react-redux'
import client from "../utls/OpenAi";


const Gptsearchbar = () => {
  const searchtext = useRef(null);
  const langkey = useSelector((store)=>store.config.lang);
  const handlegptsearchclick = async()=>{
      console.log(searchtext.current.value);
      // make an api call to gpt api and movie result
      const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : "+ searchtext.current.value+". only give me a names of 5 Movies,Comma seperated like  the example result given ahead. Example Result: Gadar,sholay,Jawan,Dhoom,Genius"

   const gptresult  =    await client.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });
      console.log(gptresult.choices);
  }
  return (
    <div className='   md:ml-[35rem]   -mt-[30rem] z-10 '>
           <form className='grid grid-cols-6 w-[430px]:grid-cols-10 md:grid-cols-12  rounded-md absolute' onSubmit={(e)=>e.preventDefault()}>
            <input ref = {searchtext} type = "text" className=' py-2 md:py-4 m-4  text-center text-sm md:text-xl  col-span-4 w-[430px]:col-span-8 md:col-span-10 rounded-full hover:border-blue-800' placeholder={lang[langkey].gptSearchPlaceholder}></input>
            <button className=' w-[70px] md:px-5 rounded-full bg-red-700 text-white col-span-1 md:col-span-2 text-center' onClick={handlegptsearchclick}>{lang[langkey].search}</button>
           </form>
    </div>

  )
}

export default Gptsearchbar