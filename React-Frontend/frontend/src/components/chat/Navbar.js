import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../firebase'
import { AuthContext } from './AuthContext'
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  const history = useHistory();

  return (
    <div className='navbar'>
      <span className="logo">FaTuber</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>history.push({pathname: "/chat/login"})}>logout</button>
      </div>
    </div>
  )
}

export default Navbar