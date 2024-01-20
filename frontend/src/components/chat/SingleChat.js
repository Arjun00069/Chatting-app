import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { server } from '../../Redux/store';
import {toast } from "react-hot-toast";
import './Singlechat.css'
import ScrolableChat from './ScrolableChat';
const SingleChat = () => {
    const [message,setMessage] =useState([]);
    const [loading,setLoading] =useState(false);
    const [newMessage,setNewMessage]=useState();
    const {selectedChat,chats} = useSelector(state=>state.Chat)
    const fetchMessage =async ()=>{
        if(!selectedChat) return;
        try {
            const user = JSON.parse(localStorage.getItem("userInfo"));
            const config = {
             
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            setLoading(true);
            const {data } =await axios.get(`${server}/api/message/${selectedChat._id}`,config);
            setMessage(data);
             setLoading(false);
             console.log(data);
        } catch (error) {
            toast.error("Failed to load the message");
        }
    }
    const sendMessage = async (e)=>{
    e.preventDefault();
    try {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
         
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        const {data} =await axios.post(`${server}/api/message`,{
            content:newMessage,
            chatId:selectedChat._id
        },config);
        setNewMessage("");
        setMessage([...message,data]);
        console.log(data);

    } catch (error) {
        toast.error("Failed to send message");
    }
       
       
    }
    const typingHandler =(e)=>{
        setNewMessage(e.target.value);
        //Typing indicator logic
    }

    useEffect(()=>{
     fetchMessage();
    },[selectedChat])




  return (
      <main className='singlechat'>

    <ScrolableChat message={message}/>
  
     <footer>
      <form  onSubmit={sendMessage} >
        <input type="text"  placeholder='Enter Message' onChange={typingHandler} value={newMessage} />

      </form>
     </footer>
      </main>
     
  )
}

export default SingleChat
