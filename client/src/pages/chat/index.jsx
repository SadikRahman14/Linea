import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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
    <div>Chat
      <div>{userInfo.email}</div>
    </div>
  )
}

export default Chat