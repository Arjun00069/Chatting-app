import React, { useState } from 'react'
import './header.css'
import { FcSearch } from "react-icons/fc";
import { IoIosNotifications } from "react-icons/io";
import SideDrawer from './SideDrawer';
import me from "../../Assets/madra.jpeg"
import Avatar from 'react-avatar';
import { Button } from "@chakra-ui/button";
import { LuChevronDown } from "react-icons/lu";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
const Header = ({onOpen,slideOpen,isSlideOpen,slideClose}) => {
  return (
    <div className='header'>
      {isSlideOpen&&<SideDrawer slideClose={slideClose}/>}
   { !isSlideOpen&&(<div className="right">
        <div onClick={slideOpen}><FcSearch/> Search user</div>
       
    </div>)}
    <div className="brandname">Talk-<span>A</span>-Tive</div>
    <div className="left">

    <IoIosNotifications style={{ height: '25px' }} />
        {/* <img src={me} alt="" /> */}
        <Menu>
  <MenuButton as={Button} bg="white" rightIcon={<LuChevronDown />}>
  <Avatar src={me} size="25" round={true} name="Wim Mostmans"  />
  
  </MenuButton>
  <MenuList>
    <MenuItem onClick={onOpen}> <span > My Profile</span></MenuItem>
    <MenuItem>Logout</MenuItem>
   
  </MenuList>
</Menu>
        
    </div>
  
    </div>
  )
}

export default Header
