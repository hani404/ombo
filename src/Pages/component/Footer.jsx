import React from 'react'
import './footer.css'
import { Link } from "react-router-dom";
import {FaDiscord , FaInstagram , FaFacebook ,FaTwitter , FaLinkedinIn} from 'react-icons/fa'

export default function Footer() {
  return (
    <div className='footer'>
        <div className='left-div'>
            <Link to='/' id='logof' >OMBO</Link>
            <Link to="">OMBO Project.2022</Link>
        </div>
        <div className='right-div'>
            <h3 id="h3">Check us on Socials</h3>
            
                <ul className='images'>
                    <li><Link to='' ><FaDiscord  size={25}/></Link></li>
                    <li><Link to='' ><FaInstagram size={25}/></Link></li>
                    <li><Link to='' ><FaFacebook size={25}/></Link></li>
                    <li><Link to='' ><FaTwitter size={25}/></Link></li>
                    <li><Link to=''><FaLinkedinIn size={25}/></Link></li>
                </ul>
            
        </div>     
    </div>
  )
}
