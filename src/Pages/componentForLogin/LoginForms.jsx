import React , {useState} from 'react'
import './loginforms.css'
import {Link} from 'react-router-dom';
import { useAuthValue } from '../../AuthContext';
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth} from '../component/firebaseConfig/Firebase'
import {useNavigate} from 'react-router-dom'


export default function LoginForms() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const {setTimeActive} = useAuthValue()
  const navigate = useNavigate()

   const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeActive(true)
          navigate('/verify-email')
        })
      .catch(err => alert(err.message))
    }else{
      navigate('/')
    }
    })
    .catch(err => console.log(err.message))
  }
  
  return (
    <div id='loginbody'>
        <div id='card'>
                <h1 id='title'>Login at <span id='ombo'>OMBO</span></h1>
                <form id='insidecard' onSubmit={login} name='login_form'>
                    <input type="email"  placeholder='Email'     required onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type="password"  placeholder='Password' name=""     required onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button className='btn' type='submit'>Login</button>
                    <h4 id='signup'>don't have an account ? <Link to='/ChooseCategorie'>Sign up!</Link></h4>
                </form>
        </div>
    </div>
  )
}
