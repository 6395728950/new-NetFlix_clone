import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div  className='pt-[15%] px-20 absolute text-white bg-gradient-to-r from-black w-screen aspect-video'>
          <h1 className='mt-2 text-2xl md:text-5xl font-bold'>{title}</h1>
        <p className=' hidden md:inline-block text-md py-6 w-[35%] '>{overview}</p>
        <div className='mt-6  md:mt-0'>
            <button className='text-black bg-white md:p-3 px-15 p-2 text-[11px] md:text-xl rounded-lg hover:bg-opacity-80 hover:transition-all'> ▶ Play</button>
            <button className= 'text-black bg-white md:p-3 px-15  p-2  text-[11px] md:text-xl rounded-lg mx-2 hover:bg-opacity-80 '>More Info</button>
        </div>
    </div>
  )
};

export default VideoTitle