import React, { useState } from 'react'
import './profile.css'
import { BsPersonCircle } from "react-icons/bs"
import { Link } from "react-router-dom";
import {auth} from '../../Pages/component/firebaseConfig/Firebase'
import {signOut} from 'firebase/auth'


function ProfileIcon() {


  const [active , setActive] = useState(false);
    
  const style = {

    display : active ?'block':'none',
  }


  const FSignOut = () =>{
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Signed Out!');
      }).catch((error) => {
        // An error happened.
        console.log('SignOut Error ' + error);
      });
}

  

  return (
    <div>
      <button id="profileIcone"><BsPersonCircle size={30} onClick={()=>setActive(!active)}/></button>
      <div id="container" >
            <ul id='ul-container' style={style}>
              <li><Link className='link' to="/ProfilePage">Profile</Link></li>
              <li><Link className='link' to="/PostRequest">Post Request</Link></li>
              <li><Link className='link' to="/Setiings">Settings</Link></li>
              <li><a className='link' href='#' onClick={() => FSignOut()}>Logout</a></li>
            </ul>
      </div>
    </div>
  )
}

export default ProfileIcon
