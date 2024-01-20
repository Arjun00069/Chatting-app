import React ,{useState,useEffect}from 'react'
import './sidedrawer.css'
import me from "../../Assets/madra.jpeg"
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast"
import { useDispatch ,useSelector} from "react-redux"
import { getSearchResult } from '../../Redux/Action/Chat.js';
import { server } from '../../Redux/store.js';
import axios from "axios"
const SideDrawer = ({slideClose}) => {
  const [loadingChat, setLoadingChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const dispatch =useDispatch();
  const [search,setSearch]=useState();
  const {chats} = useSelector(state=>state.Chat)
  const handelSearch = async ()=>{
         if(!search){
          toast.error("Enter Name or Email")
          return;
         }
         setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
         
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const  {data}  = await axios.get(`${server}/api/user?search=${search}`, config);
        // console.log(data);
        setLoading(false);
        setSearchResult(data);
     
      } catch (error) {
        toast.error(error.message)
      }

  }
 const accessChat =async (userId)=>{
     try {
      setLoadingChat(true);
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const config ={
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
      const {data} =await axios.post(`${server}/api/chat/`,{userId},config);
      console.log(data);
       if(!chats.find((c)=>c._id===data._id)){
        dispatch({type:'setChats',payload:[data,...chats]})
       }
      
     } catch (error) {
        toast.error(error.message);
     }
 }
  return (

    <div className="sidedrawer">
      
     <span><h3>Search User</h3> <RxCross2 onClick={slideClose} /></span> 
      <div className='searchbar'>
        <input type="text" placeholder='Name or Email' 
        value={search}
        onChange={e=>setSearch(e.target.value)}
        />
        <button onClick={handelSearch}>Go</button>
      </div>
      <div className="searchresult">
        {
          searchResult.map((user)=>(
            <div key={user._id} onClick={() => accessChat(user, user._id)}>
            <div><img src={user.pic} alt="" /></div>
            <section>
              <span>{user.name}</span>
              <span style={{fontSize:"10px"}}><span style={{fontWeight:"900",fontSize:"12px"}}> Email:</span>{user.email}</span>
            </section>
          </div>
          ))
        }
        <div>
          <div><img src={me} alt="" /></div>
          <section>
            <span>Name</span>
            <span style={{fontSize:"10px"}}> <span style={{fontWeight:"900",fontSize:"12px"}}> Email:</span>sam@gmaildfdwwe.com</span>
          </section>
        </div>

      </div>
       
    </div>
 
  )
}

export default SideDrawer
