import React from 'react'
import { FaEye } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { IoArrowBackCircleOutline } from "react-icons/io5";

import SingleChat from './SingleChat'
import './chatbox.css'
const ChatBox = ({fetchAgain,setFetchAgain,openGroupModel,chatListOpen}) => {
  const {selectedChat} =useSelector(state=>state.Chat)
  return (
    <div className='chattingbox'>
    <body>
    {selectedChat?( <>  <header><span className='backbtn' style={{marginLeft:"14px"}} onClick={chatListOpen}><IoArrowBackCircleOutline /></span>
   {selectedChat.isGroupChat?<> <span id='headding'>{selectedChat.chatName}</span>  <span id='eyebtn' onClick={openGroupModel}><FaEye /></span> </>:<></>}  
      </header>
   
      <SingleChat/>
       </>):<div className={'initialchat'}>
        <span>Select User to display chats</span>
        </div>} 
    </body>
    </div>
  )
}

export default ChatBox
