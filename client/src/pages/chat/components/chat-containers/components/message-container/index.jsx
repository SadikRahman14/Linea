import { useAppStore } from '@/store';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import moment from 'moment';
import { apiClient } from '@/lib/api-client';
import { GET_ALL_MESSAGES, HOST } from '@/utils/constants';
import { MdOutlineFolderZip } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

function MessageContainer() {

  const scrollRef = useRef();
  const { 
    selectedChatType, 
    selectedChatData, 
    userInfo, 
    selectedChatMessages, 
    setSelectedChatMessages,
    setIsDownloading,
    setFileDownloadProgress
  } = useAppStore();

  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);



  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(GET_ALL_MESSAGES, 
          { id: selectedChatData._id},
          { withCredentials: true }
        );

        if(response.data.data.messages){
          setSelectedChatMessages(response.data.data.messages);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    if(selectedChatData._id){
      if(selectedChatType === "contact") getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages])

  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  },[selectedChatMessages])

const renderMessages = () => {
  let lastDate = null;
  return selectedChatMessages.map((message) => {
    const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
    const showDate = messageDate !== lastDate;
    lastDate = messageDate;

    return (
      <div key={message._id}>
        {showDate && (
          <div className='text-center text-gray-500 my-2 text-xs'>
            {moment(message.timeStamp).format("LL")}
          </div>
        )}
        {selectedChatType === "contact" && renderDMMessages(message)}
      </div>
    );
  });
};

  const checkIfImage = (filePath) => {
    return /\.(jpe?g|png|gif|bmp|webp|svg)$/i.test(filePath);
  };
  
  const downloadFile = async (url) => { 
    setIsDownloading(true);
    setFileDownloadProgress(0);
    const response = await apiClient.get(`${HOST}/${url}`, {
      responseType: "blob",
      onDownloadProgress: (ProgressEvent) => { 
        const { loaded, total } = ProgressEvent;
        const percentCompleted = Math.round((loaded * 100) / total);
        setFileDownloadProgress(percentCompleted);
      }
    });

    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob)
    setIsDownloading(false);
    setFileDownloadProgress(0);
  }


const renderDMMessages = (message) => {
  const isSender = userInfo?._id === message.sender;

  return (
    <div className={isSender ? "text-right" : "text-left"}>
      {message.messageType === "text" && (
        <div
          className={`${
            isSender
              ? "bg-[#6d0202] text-white/90 border-black/50"
              : "bg-gray-800 text-white/80 border-[#ffffff]/20"
          } border inline-block p-3 rounded-xl my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      {message.messageType === "file" && (
        <div
          className={`${
            isSender
              ? "bg-black text-white/90 border-black/50"
              : "bg-gray-800 text-white/80 border-[#ffffff]/20"
          } border inline-block p-2 rounded-xl my-1 max-w-[50%] break-words`}
        >
          {checkIfImage(message.fileURL) ? (
            <div
              className='cursor-pointer'
              onClick={() => { 
                setShowImage(true);
                setImageURL(message.fileURL)
              }}
            >
              <img
                src={`${HOST}/${message.fileURL}`}
                className="max-w-full h-auto rounded"
                alt="uploaded"
              />
            </div>
          ) : (
            <div className='flex flex-wrap items-center justify-center gap-3'>
              <span className='text-white/80 text-2xl bg-black rounded-full p-2'>
                <MdOutlineFolderZip />
              </span>
              <span className='truncate max-w-[60%] text-sm sm:text-base'>
                {message.fileURL.split("/").pop()}
              </span>
              <span
                className='bg-black/20 p-2 text-xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'
                onClick={() => downloadFile(message.fileURL)}
                title="Download file"
              >
                <FaCloudDownloadAlt />
              </span>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-gray-600">
        {moment(message.timeStamp).format("LT")}
      </div>
    </div>
  );
};

  return (
    <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full'>
      {renderMessages()}
      <div ref={scrollRef} />
     {showImage && (
  <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex flex-col items-center justify-center backdrop-blur-lg px-4 md:px-0">
    <div className="max-w-[90vw] md:max-w-[80vw] max-h-[80vh]">
      <img
        src={`${HOST}/${imageURL}`} alt=""
        className='h-full w-full object-contain rounded-md'
      />
    </div>

    <div className="flex gap-3 md:gap-5 fixed top-4 right-4 md:top-5 md:right-5 bg-black/30 rounded-full p-1 md:p-3">
      <button
        className='bg-black/20 p-2 md:p-3 text-xl md:text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'
        onClick={() => downloadFile(imageURL)}
        aria-label="Download"
      >
        <FaCloudDownloadAlt />
      </button>

      <div className="w-[1px] bg-black/60"></div> {/* Divider */}

      <button
        className='bg-black/20 p-2 md:p-3 text-xl md:text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'
        onClick={() => { 
          setImageURL(null);
          setShowImage(false);
        }}
        aria-label="Close"
      >
        <IoMdCloseCircle />
      </button>
    </div>
  </div>
)}

    </div>
  )
}

export default MessageContainer