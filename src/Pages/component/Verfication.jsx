import React from 'react'
import './verfication.css'
import {useAuthValue} from '../../AuthContext'
import {useState , useEffect} from 'react'
import {auth} from './firebaseConfig/Firebase'
import {sendEmailVerification} from 'firebase/auth'
import {db} from './firebaseConfig/Firebase';
import { setDoc, doc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

function Verfication({trigger, setTrigger, firstname, lastname, email , isfreelancer}) {

    const {currentUser , enuser} = useAuthValue()

    const [time, setTime] = useState(60)
    const [timeActive, setTimeActive] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const navigate = useNavigate()

    const creatUser= async ()=>{  
      if(enuser)  
      await setDoc(doc(db, "users", enuser.uid),{firstname: firstname, lastname: lastname, email: email , isFreelancer : isfreelancer , gigIds : []}).then((data) => console.log(data))
      console.log(enuser.uid) // setDoc allow us to creat a document in the data base giving the spesefic collection and an ID to it along the data needed to be stored
    };


    useEffect(() => {
        if(enuser && enuser?.reload()){ //
          const interval = setInterval(() => {
            enuser?.reload().then(() => {
              if(enuser?.emailVerified){ //if the email is verified used the link sent by the previous verify function from firebase then proceed the document creation
                clearInterval(interval)
                console.log(enuser.uid)
                creatUser(); // here the previous creat document function is called 
                navigate('/')
              }
            })
            .catch((err) => {
              alert(err.message) // i
            })
          }, 1000)
        }
        
      }, [navigate , enuser ])

    useEffect(() => {
        let interval = null
        if(timeActive && time !== 0 ){
          interval = setInterval(() => {
            setTime((time) => time - 1)
          }, 1000)
        }else if(time === 0){
          setTimeActive(false)
          setTime(60)
          clearInterval(interval)
        }
        return () => clearInterval(interval);
      }, [timeActive, time])


    const resendEmailVerification = () => {
        setButtonDisabled(true)
        sendEmailVerification(auth.currentUser)
        .then(() => {
            setButtonDisabled(false)
            setTimeActive(true)
        }).catch((err) => {
          alert(err.message)
          setButtonDisabled(false)
        })
      }

  return (trigger) ? (
    <div id="popup">
      <div id="popup-inner">
            <button id='close' onClick={() => setTrigger(false)} >+</button>
            <h1 id='h1'>Verifying your Email Address</h1>
            <h2 className='h2'>A verfication email has been sent to : <span>{currentUser?.email}</span></h2>
            <h2 className='h2' id="follow">Follow the instruction in the email to verify you account</h2> 
            <br />
            <button onClick={resendEmailVerification} disabled={timeActive}>Rensend Email {timeActive && time} </button>
      </div>
    </div>
  ) : "" ;
}

export default Verfication