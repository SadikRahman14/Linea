import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatContainer from './components/chat-containers/index.jsx';
import ContactContainer from './components/contact-containers/index.jsx';
import EmptyChatContainer from './components/empty-chat-containers/index.jsx';

function Chat() {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo.profileSetup){
      toast("Please Setup Profile to Continue!");
      navigate("/profile");
    }
  }, [userInfo, navigate])
  
  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactContainer/>
      
      {/* <EmptyChatContainer/> */}
      <ChatContainer/>
    </div>
  )
}

export default Chat