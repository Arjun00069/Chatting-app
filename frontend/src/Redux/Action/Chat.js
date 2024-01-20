import axios from "axios"
import { server } from "../store";


// export const loadUser =



export const getSearchResult = (user,search)=> async(dispatch)=>{
    try{
     dispatch({type:'getChatSearchRequest'});
    //  console.log(user)
     const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },}
     const  {data}  = await axios.get(`${server}/api/user?search=${search}`, config);
     console.log(data);
     dispatch({type:'getChatSearchSuccess', payload:data})
    }catch(error){
        dispatch({type:'getChatSearchFail',
        payload:error})
    }
}