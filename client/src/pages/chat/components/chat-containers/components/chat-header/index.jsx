import { useAppStore } from '@/store'
import React from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { HOST } from '@/utils/constants'
import { getColor } from '@/lib/utils'

function ChatHeader() {

    const { closeChat, selectedChatData, selectedChatType } = useAppStore()

  return (
    <div className='h-[10vh] border-b-2 border-[#25203b] flex items-center justify-between px-20 '>
        <div className="flex gap-5 items-center w-full justify-between">
            <div className="flex items-center justify-center gap-5">
                <div className='w-12 h-12 relative selectedChatType' > 
                    <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                        {selectedChatData.image ? (
                    <AvatarImage
                        src={`${HOST}/${selectedChatData.image}`}
                        alt="Profile"
                        className="rounded-full object-cover w-full h-full bg-black"
                        
                    /> 
                    ) : 
                    (
                        <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full
                        ${getColor(selectedChatData.color)}`}>
                        {
                            selectedChatData.firstName ? selectedChatData.firstName.split("").shift()
                            : selectedChatData.email.split("").shift()
                        }
                        </div>
                    )
                    }
                    </Avatar>
                    
                </div>
                <div>
                    {selectedChatType === "contact" && 
                        `${selectedChatData.firstName} ${selectedChatData.lastName}`
                    }
                </div>
            </div>
            
            <div className="flex items-center justify-center gap-5">
                <button className='to-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300
                transition-all'
                onClick={closeChat}>
                    <RiCloseFill className='txt-3xl'/>
                </button>
            </div>

        </div>    
    </div>
  )
}

export default ChatHeader