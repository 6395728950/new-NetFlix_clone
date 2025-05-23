import React from 'react'
import Gptsearchbar from './Gptsearchbar'
import Gptmoviesuggestion from './Gptmoviesuggestion'
import { BG_URL } from '../utls/constant'

const Gptsearch = () => {
  return (
    <div className='  h-screen overflow-y-hidden'>
    <div className=' h-full '>
      <img src={BG_URL} alt="background" className="-z-10 h-screen object-cover w-screen  "></img>
      </div>
        <Gptsearchbar>

        </Gptsearchbar>
        <Gptmoviesuggestion/>
    </div>
  )
}

export default Gptsearch