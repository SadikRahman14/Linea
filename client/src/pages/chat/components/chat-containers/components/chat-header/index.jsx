import React from 'react'
import { RiCloseFill } from 'react-icons/ri'



function ChatHeader() {
  return (
    <div className='h-[10vh] border-b-2 border-[#25203b] flex items-center justify-between px-20'>
        <div className="flex gap-5 items-center">
            <div className="flex items-center justify-center gap-5"></div>
            <div className="flex items-center justify-center gap-5">
                <button className='to-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300
                transition-all'>
                    <RiCloseFill className='txt-3xl'/>
                </button>
            </div>

        </div>    
    </div>
  )
}

export default ChatHeader