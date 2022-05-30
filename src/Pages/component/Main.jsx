import React  , {useState} from 'react';
import './main.css';
import Cards from './Cards';
import {auth} from './firebaseConfig/Firebase'
import {useAuthValue} from '../../AuthContext'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import Verfication from './Verfication';


export default function Main({title}) 
{
  const {currentUser} = useAuthValue()

  const [firstname, setFirstName]= useState("");
  const [lastname, setLastName]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
//button use state 
  const [buttonPopup , setButtonPopup] = useState(false);
//fire base related states 

//email times hooks related 
  const {setTimeActive} = useAuthValue()
  

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)   
          .then(() => {
            setTimeActive(true)
            setButtonPopup(true);
            console.log(email)
          }).catch((err) => alert(err.message))
        })
        .catch(err => setError(err.message))
    }
    setPassword('')
    setConfirmPassword('')
  }


  return (
    <div id="Main">

          <Cards/>
      

          <div className="vl"></div>

          <div className='main'>
            <h2 id="title">
                {title}
            </h2>
            <form onSubmit={register} name='registration_form'>
                <ul className='name'>
                    <li>
                        <input className='name-fields' type="text"  placeholder='First Name'  onChange={(event) => {setFirstName(event.target.value)}}  required/>
                    </li>
                    <li>
                        <input className='name-fields' type="text"  placeholder='Last Name' onChange={(event) => {setLastName(event.target.value)}}  required/>
                    </li>
                </ul>
                <input type="email" value={email} placeholder='Email'  name="email field"   onChange={(event) => {setEmail(event.target.value)}} required/>
                <input type="password" value={password} placeholder='Password' name=""    onChange={(event) => {setPassword(event.target.value)}}  required/>
                <input type="password" value={confirmPassword} placeholder='Confirm Password' name=""  onChange={(event) => setConfirmPassword(event.target.value)}    required/>
                <div className='check'>
                        <input className='check-box' type="checkbox" name=""   required/>
                        <h3>Yes, I undrustand and agree on all <a href="">Terms</a> and <a href="">Conditions.</a> </h3>
                </div>
                <button  className='button'onSubmit={register} type="submit" >Creact my account</button>
            </form>
          </div>

          <Verfication trigger = {buttonPopup} setTrigger={setButtonPopup} firstname={firstname} lastname={lastname} email={email}/>
                   
    </div>
  );
};
