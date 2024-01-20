import React from 'react'
import { useState ,useEffect} from 'react';
import axios from "axios"
import toast from "react-hot-toast";
import  {useNavigate}  from "react-router-dom"
import './home.css'

function RegisterForm(){
    const [name,setName] =useState()
    const [email,setEmail] =useState()
    const [confirmpassword,setConfirmpassword] =useState()
    const [password,setPassword] =useState()
    const [pic,setPic]=useState()
    const [picloading,setPicloading]=useState(false);
    const history =useNavigate();
    const submitHandler = async(e)=>{
      e.preventDefault();
      setPicloading(true);
    if (!name || !email || !password || !confirmpassword) {
      console.log("1");
      toast.error("Please Fill all the Feilds")
      setPicloading(false);
      return;
    }
    if(password!==confirmpassword){
     
      toast.error("Passwords Do Not Match")
      return;
    }
    try {
      const config ={
        headers: {
          "Content-type": "application/json",
        },
        
      }
      const { data } = await axios.post(
        "http://localhost:4000/api/user/register",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast.success("Registration Successful")
      localStorage.setItem("userInfo",JSON.stringify(data));
      setPicloading(false)
     console.log('Registered')
    } catch (error) {
      toast.error(error.response.data.message)
      setPicloading(false);
    }
    }

    const postDetails = (pics)=>{
      setPicloading(true);
      if(pics===undefined){
      console.log(1);
        toast.error("Please Select an Image!")
        return;
      }
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "dmlp0edk3");
        // console.log(data);
        fetch('https://api.cloudinary.com/v1_1/dmlp0edk3/image/upload', {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setPic(data.url.toString());
            // console.log(data.url.toString());
            setPicloading(false);
          })
          .catch((err) => {
            console.log(err);
            setPicloading(false);
          });
      } else {
     
        toast.error("Please Select an Image!")
        setPicloading(false);
        return;
      }
    };

    return(
      <form action="" id='RegisterForm' onSubmit={submitHandler}>
           
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Enter your name' id='name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <label htmlFor="email"> Email Address</label>
            <input type="text" placeholder='Enter your email' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <label htmlFor="email"> password</label>
            <input type="password" placeholder='Enter your password' id='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <label htmlFor="confirmpassword">Confirm password</label>
            <input type="password" placeholder='Confirm password' id='confirmpassword' value={confirmpassword} onChange={(e)=>{setConfirmpassword(e.target.value)}}/>
            <label htmlFor="photo">Upload your picture</label>
            <input type="file"// to upload file 
                    name="avatar"
                    accept="image/*"
                    onChange={(e)=>{postDetails(e.target.files[0])}}/>
            <input type="submit" value={picloading===false?"Register":"Loading"} className="submitbutton"/>
              </form>
    )
  }
const LoginSignup= () => {
  const history =useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history("/chats");
  }, [history]);


    const [formtoggel,setFormtoggel]=useState(true)
   const [email,setEmail] =useState()
   const [password,setPassword] =useState()
     const [loading,setLoading]=useState(false);

   const loginHandler = async (e)=>{
      e.preventDefault();
      setLoading(true);
      if(!email||!password){
        toast.error("Please enter your details")
        return;
      }
      try {
        const config ={
          headers: {
            "Content-type": "application/json",
          },
          
        }
        const {data} =await axios.post("http://localhost:4000/api/user/login",{email,password},config)
        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false)
// console.log("Logged in"
       history('/chats');
      } catch (error) {
        toast.error(error.response.data.messaage);
      }
   }

  return (
    <div className="home">
        <div className="container">
          <div className="headding">
             Chatting App
          </div>
          <div className="loginForm">
            <div className="switch">
              <button onClick={()=>{setFormtoggel(true)}} >Login</button>
              <button onClick={()=>{setFormtoggel(false)}}>Register</button>

            </div>
         { formtoggel&&(<form onSubmit={loginHandler}> 
           <label htmlFor="email"> Email Address</label>
          <input type="text" placeholder='Enter your email' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <label htmlFor="password"> password</label>
          <input type="password" placeholder='Enter your password' id='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          <input type="submit" value={loading===false?"Login":"Please wait..."} className="submitbutton" />
          <input type="submit" value="Login as guest" className="submitbutton" /> 
        

             </form>)}
           {!formtoggel&& <RegisterForm />}
          
          </div>
        </div>
    </div>
  )
}

export default LoginSignup
