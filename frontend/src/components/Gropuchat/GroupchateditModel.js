import React, { useState } from 'react'
import './groupchateditmodel.css'
import me from "../../Assets/madra.jpeg"
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { server } from '../../Redux/store';
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';

const GroupchateditModel = ({closeGroupModel,setFetchAgain,fetchAgain}) => {
    const dispatch =useDispatch();
    const {chats,selectedChat} =useSelector(state=>state.Chat);
    const [groupchatName,setGroupchatName] =useState();
    const [selectedUsers,setSelectedUser] =useState([]);
    const [search,setSearch] =useState("");
    const [searchResult,setSearchResult] =useState([]);
    const [loading,setLoading] =useState(false);
    const [renameLoading,setRenameLoading] =useState(false);


    const handleSearch = async(query)=>{
       setSearch(query);
      if(!query) {return;}
      try {
        console.log(search)
        setLoading(true)
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const config ={
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
          const  {data}  = await axios.get(`${server}/api/user?search=${query}`, config);
         
          console.log(data);
          setLoading(false);
          setSearchResult(data);
 
      } catch (error) {
        
      }
    }
    const handleAddUser = async (user1)=>{

    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!groupchatName||!selectedUsers){
            toast.error("Enter all details")
            return
        }
        try {
            const user = JSON.parse(localStorage.getItem("userInfo"));
        const config ={
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
          const {data} = await axios.post(`${server}/api/chat/group`,{
            name:groupchatName,
            users:JSON.stringify(selectedUsers.map(u=>u._id))
          },
          config
          );
          if(data!=null){dispatch({type:"setChats",payload:[data,...chats]})
          closeGroupModel();
          toast.success("New Group Created!")};
            
        } catch (error) {
          
            if(error.response.data){
                toast.error(error.response.data.message)
            }
        }
    }
    const handleGroup =(userToAdd)=>{
       if(selectedUsers.includes(userToAdd)){
        toast.error('User already added')
        return;
       }
       setSelectedUser([...selectedUsers,userToAdd]);
    
    }
    const handleDelete=(user)=>{
          setSelectedUser(selectedUsers.filter(sel=>sel._id!==user._id))
    }
    const handleRename= async ()=>{
        if(!groupchatName) return;
        try {
            setRenameLoading(true);
            const user = JSON.parse(localStorage.getItem("userInfo"));
            const config ={
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
              }
              const {data} = await axios.put(`${server}/api/chat/rename`,{
                chatId:selectedChat._id,
                chatName:groupchatName
              },config)
            //   console.log(data);
              dispatch({type:'setSelectedChats',payload:data})
                setFetchAgain(!fetchAgain);
              setRenameLoading(false);
              closeGroupModel();

        } catch (error) {
          if(error.response)  toast.error(error.response.data.message)
          else toast.error('Error in updating')
        }
        setGroupchatName();
    }

  return (
    <div className='profilemodel2'>
        <header>
             <RxCross2 onClick={closeGroupModel}/>
        
            <span>{selectedChat.chatName}</span>
            </header>
            <div>
                <form >

                    <input type="text" placeholder='Group name'   value={groupchatName} onChange={(e)=>setGroupchatName(e.target.value)}/>
                    <input type="text" placeholder='Add user' value={search} onChange={(e)=>handleSearch(e.target.value)}/>
                    <div className='userselected' > 
                   {selectedUsers.map((user)=>(
                                   <span key={user._id}>{user.name} <span  id='closeuser'  onClick={()=>handleDelete(user)}><RxCross2 /></span></span>
                   ))}
                         </div>
                    <div id='usercontainer1'>
                        {
                            searchResult.map((user)=>(
                                <div className='usersearch' key={user._id} onClick={()=>handleGroup(user)}>
                                <div><img src={user.pic} alt="" /></div>
                                <section>
                                  <span>{user.name}</span>
                                  <span style={{fontSize:"10px"}}><span style={{fontWeight:"900",fontSize:"12px"}}> Email:</span>{user.email}</span>
                                </section>
                              </div>
                            ))
                        }
                    {/* <div className='usersearch1'>
            <div><img src={me} alt="" /></div>
            <section>
              <span>Arjun</span>
              <span style={{fontSize:"10px"}}><span style={{fontWeight:"900",fontSize:"12px"}}> Email:</span>em@gmail.com</span>
            </section>
          </div> */}
          </div>
                </form>
                <div className='btncontainer'>
                    <button id='leavegroup'>Leave Group</button>
               <button id = { groupchatName?'updatebtn':'disable'  } onClick={handleRename}>Update</button>
                    </div>
                
            </div>   
            
        
     
    </div>
  )
}

export default GroupchateditModel;
