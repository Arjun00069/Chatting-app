import React, { useState } from 'react'
import './groupchatmodel.css'
import me from "../../Assets/madra.jpeg"
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { server } from '../../Redux/store';
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
// import { RxCross2 } from "react-icons/rx";
const Groupchatmodel = ({onClose}) => {
    const dispatch =useDispatch();
    const {chats} =useSelector(state=>state.Chat);
    const [groupchatName,setGroupchatName] =useState();
    const [selectedUsers,setSelectedUser] =useState([]);
    const [search,setSearch] =useState("");
    const [searchResult,setSearchResult] =useState([]);
    const [loading,setLoading] =useState(false);

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
          onClose();
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

  return (
    <div className='profilemodel1'>
        <header>
             <RxCross2 onClick={onClose}/>
        
            <span>Create Group Chat</span>
            </header>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Group name'   value={groupchatName} onChange={(e)=>setGroupchatName(e.target.value)}/>
                    <input type="text" placeholder='Add user' value={search} onChange={(e)=>handleSearch(e.target.value)}/>
                    <div className='userselected' > 
                   {selectedUsers.map((user)=>(
                                   <span key={user._id}>{user.name} <span  id='closeuser'  onClick={()=>handleDelete(user)}><RxCross2 /></span></span>
                   ))}
                       <span>Arjun  </span>  </div>
                    <div id='usercontainer'>
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
                    <div className='usersearch'>
            <div><img src={me} alt="" /></div>
            <section>
              <span>Arjun</span>
              <span style={{fontSize:"10px"}}><span style={{fontWeight:"900",fontSize:"12px"}}> Email:</span>em@gmail.com</span>
            </section>
          </div>
          </div>
          
                    <input type="submit" id='submitbtn' />
                </form>
                
            </div>   
            
        
     
    </div>
  )
}

export default Groupchatmodel;
