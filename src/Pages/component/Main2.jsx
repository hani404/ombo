import React , {useState}   from 'react'
import './main.css'
import Cards2 from './Cards2'
import {db} from './firebaseConfig/Firebase';
import {collection , addDoc} from 'firebase/firestore';
import {auth} from './firebaseConfig/Firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'

export default function Main2({title}) {

  
  const [firstname, setFirstName]= useState("");
  const [lastname, setLastName]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')


  const [users , setUsers] = useState([]);
  const userCollectionRef = collection(db , "users");

  const creatUser= async ()=>{
    await addDoc(userCollectionRef, {firstname: firstname, lastname: lastname, email: email , isFreelancer : false})
  };

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
        .then((res) => {
            console.log(res.user)
            creatUser()
            window.location = '/';
          })
        .catch(err => console.log(err.message))

    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }


  return (
    <div id="Main">
    

          <Cards2/>
      

          <div className="vl"></div>

          <div className='main'>
            <h2 id="title">
                {title}
            </h2>
            <button>Continue with Facebook</button>
            <button>Continue with Google</button>
            <h3 id='or'>or</h3>
            <form onSubmit={register} name='registration_form'>
                <ul className='name'>
                    <li>
                        <input className='name-fields' type="text"  placeholder='First Name' />
                    </li>
                    <li>
                        <input className='name-fields' type="text"  placeholder='Last Name' />
                    </li>
                </ul>
                <input type="email" placeholder='Email'  name="" id="" />
                <input type="password" placeholder='Password' name=""  id="" />
                <input type="password" placeholder='Confirm Password' name=""  id="" />
                <div className='check'>
                        <input className='check-box' type="checkbox" name="" id="" />
                        <h3>Yes, I undrustand and agree on all <a href="">Terms</a> and <a href="">Conditions.</a> </h3>
                </div>
                <button>Creact my account</button>
            </form>
          </div>
                   
    </div>
  )
}