import React,{useState,useEffect} from 'react'
import ChatBox from '../components/chat/ChatBox'
import Header from '../components/chat/Header'
import Mychats from '../components/chat/Mychats'
import Groupchatmodel from '../components/Gropuchat/Groupchatmodel'
import ProfileModel from '../components/chat/ProfileModel'
import GroupchateditModel from '../components/Gropuchat/GroupchateditModel'

import './chatpage.css'
import { useDispatch, useSelector } from 'react-redux'
const ChatPage = () => {
    const [isProfileModelOpen, setIsProfileModelOpen] = useState(false);
    const [isSlideBarOpen, setIsSlideBarOpen] = useState(false);
    const [isGroupEditOpen, setIsGroupEditOpen] = useState(false);
    const [isBackBtn,setIsBackBtn]=useState(false);
      const [fetchAgain,setFetchAgain] =useState(false);
      const {selectedChat} = useSelector(state=>state.Chat)
      const dispatch =useDispatch();
   const chatListOpen =()=>{
    setIsBackBtn(true);
    dispatch({type:'setSelectedChats',payload:null})
   }
   const chatListClose =()=>{
    setIsBackBtn(false);
    // dispatch({type:'setSelectedChats',payload:null})
   }
const slideOpenbar =()=>{
  setIsSlideBarOpen(true);
}

const slideClosebar =()=>{
  setIsSlideBarOpen(false);
}
  const openProfileModel = () => {
    setIsProfileModelOpen(true);
  };

  const closeProfileModel = () => {
    setIsProfileModelOpen(false);
  };

  const openGroupModel=()=>{
    setIsGroupEditOpen(true);
  }
  const closeGroupModel=()=>{
    setIsGroupEditOpen(false);
  }
  return (
    <div className={`chatpage ${(isProfileModelOpen||isGroupEditOpen) ? 'disable' : ''}`} 
     >
    <Header onOpen={openProfileModel } slideOpen={slideOpenbar}  slideClose={slideClosebar} isSlideOpen={isSlideBarOpen} />
    <div className ={`chatbox ${(isProfileModelOpen||isGroupEditOpen) ? 'disable' : ''}  ${isBackBtn?'showlist':''} ${selectedChat?'showchats':'showList'}`  } 
      
    >
      <Mychats  onOpen={openProfileModel }    fetchAgain={fetchAgain}   />
      <ChatBox  fetchAgain={fetchAgain}setFetchAgain={setFetchAgain} openGroupModel={openGroupModel} chatListOpen={chatListOpen} />
    </div>
    {(isProfileModelOpen||isGroupEditOpen) && <div className="overlay" onClick={closeProfileModel}></div>}
    {isProfileModelOpen &&<ProfileModel  onClose={closeProfileModel} />}
       {isGroupEditOpen&&  <GroupchateditModel closeGroupModel={closeGroupModel} setFetchAgain={setFetchAgain} fetchAgain={fetchAgain}/>}   
     {/* {isProfileModelOpen &&  <Groupchatmodel  onClose={closeProfileModel} />} */}
  
  </div>
  )
}

export default ChatPage
