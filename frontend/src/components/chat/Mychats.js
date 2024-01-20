import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './mychats.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../../Redux/store';
import { getSender } from '../../config/Chatlogics';

const Mychats = ({ onOpen,fetchAgain}) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.Chat);
  const [loggedUser, setLoggedUser] = useState(undefined);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!loggedUser) {
      setLoggedUser(user);
    }
    // console.log(loggedUser);
    fetchChats();
  }, [loggedUser,fetchAgain]); // Add loggedUser to the dependency array

  const handleChatClick = (chat) => {
    setSelectedChat(chat._id);
    dispatch({type:'setSelectedChats',payload:chat});
  };

  const fetchChats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${server}/api/chat`, config);
      dispatch({
        type: 'setChats',
        payload: data,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='mychats'>
      <div>
        <header>
          <span> My Chats</span>
          <aside onClick={onOpen}>New Group chat <span>+</span> </aside>
        </header>
        <footer>
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => handleChatClick(chat)}
              className={selectedChat === chat._id ? 'selectedChat' : ''}
            >
              <div>{!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}</div>
              <div>
                <span className='latestchat'>Guestuser:</span><span className='latestmsg'>Wooo</span>
              </div>
            </div>
          ))}
        </footer>
      </div>
    </div>
  );
};

export default Mychats;
