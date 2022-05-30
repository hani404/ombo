import React from 'react'
import './verfication.css'
import {useAuthValue} from '../../AuthContext'
import {useState , useEffect} from 'react'
import {auth} from './firebaseConfig/Firebase'
import {sendEmailVerification} from 'firebase/auth'
import {db} from './firebaseConfig/Firebase';
import { setDoc, doc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

function Verfication({trigger, setTrigger, firstname, lastname, email}) {

    const {currentUser} = useAuthValue()

    const [time, setTime] = useState(60)
    const [timeActive, setTimeActive] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const navigate = useNavigate()

    const creatUser= async ()=>{
      console.log(email)
      await setDoc(doc(db, "users", currentUser.uid),{firstname: firstname, lastname: lastname, email: email , isFreelancer : true}).then((data) => console.log(data))
      return 1;
    };

    useEffect(() => {
        const interval = setInterval(() => {
          currentUser?.reload()
          .then(() => {
            if(currentUser?.emailVerified){
              clearInterval(interval)
              creatUser();
              navigate('/')
            }
          })
          .catch((err) => {
            alert(err.message)
          })
        }, 1000)
      }, [navigate, currentUser])

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
