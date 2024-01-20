import React from 'react'
import './profilemodel.css'
import me from "../../Assets/madra.jpeg"
import { RxCross2 } from "react-icons/rx";
const ProfileModel = ({onClose}) => {
  return (
    <div className='profilemodel'>
             <RxCross2 onClick={onClose}/>
        
            <h1>Name</h1>
            <img src={me} alt="" /> 
            <div>
                <span id='email'>Email</span>
                <span id='emailn'>sam@gmail.com</span>
                </div>   
            
        
     
    </div>
  )
}

export default ProfileModel
