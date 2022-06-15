import React  from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { Link } from "react-router-dom";
import './nav.css';
import {useAuthValue} from '../AuthContext'
import {auth} from '../Pages/component/firebaseConfig/Firebase'
import ProfileIcon from './profile/Profile';


function  Nav () {

    const {currentUser} = useAuthValue()


   

    return (
      <header id = 'nav'>
       <div className="left-side">
        <Link to='/' className='logo' >OMBO</Link>
        <ul className='list1'>
            {auth.currentUser ? <></> : <li><Link to="/Findtalent"  >Find Talent</Link></li>}
            {auth.currentUser ? <></> : <li><Link to="/findwork"  >Find Work</Link></li> }
            <li className='searchbar'>
                <button id='search-icon' ><AiOutlineSearch/></button>
                <input type="text" placeholder='Great stuff only few keyboard types away'/>
            </li>
        </ul>
        </div>
        <div className="right-side">
            <ul className='list2'>
                {auth.currentUser ? <></> : <li><Link to="/Login"  >Log in</Link></li>}
                {auth.currentUser ? <ProfileIcon /> : <li><Link id='button' to="/ChooseCategorie" >Sign up</Link></li> }
                
            </ul> 
        </div>       
      </header>

    )
  
}

export default Nav; 