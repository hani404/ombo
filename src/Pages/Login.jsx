import React from 'react'
import Footer from './component/Footer'
import NavL from './component/NavL'
import LoginForms from './componentForLogin/LoginForms'

export default function Login() {
  return (
    <div id='login'>
      <NavL/>
      <LoginForms/>
      <Footer/>
    </div>
  )
}
