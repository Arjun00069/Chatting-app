import React, { useEffect, useRef } from 'react'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/Chatlogics'
import './scrolablechat.css'



const ScrolableChat = ({message}) => {
    const scrolableChatRef = useRef(null);
    useEffect(() => {
        // Scroll to the bottom of the chat when the component renders
        if (scrolableChatRef.current) {
          scrolableChatRef.current.scrollTop = scrolableChatRef.current.scrollHeight;
        }
      }, [message]);
    const user = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className='scrolablechat' ref={scrolableChatRef} >
      {message.map((m,i)=>(
        <div style={{  marginTop: isSameUser(message,m,i,user._id)?"1rem" :"2rem",
        justifyContent:isSameSenderMargin(m,user._id),
        marginLeft:`${(isSameSender(message, m, i, user._id) ||
            isLastMessage(message, i, user._id))?0:1}rem`
        
        }}>
             {(isSameSender(message, m, i, user._id) ||
              isLastMessage(message, i, user._id)) && <img style={{height:"20px",width:"20px",marginLeft:"0.3rem",marginRight:"0",borderRadius:"10px"}} src={m.sender.pic} alt="" />}
       <span key={m._id} style={{
            backgroundColor: `${
                m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
              }`,
            
        }}
        > {m.content}</span>
        </div>
      ))}
  
      
    </div>
  )
}

export default ScrolableChat
