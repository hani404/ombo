import React from 'react'
import './navl.css'
import { Link } from "react-router-dom";

export default function NavL() {
  return (
    <>
        <div className="nav">
             <Link className='logo' to='/'>OMBO</Link>
        </div>
    </>
  )
}
