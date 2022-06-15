import { Routes , Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Choose from './Pages/Choose';
import Findw from './Pages/Findw';
import Findt from './Pages/Findt';
import Login from './Pages/Login';
import {useState , useEffect} from 'react'
import {AuthProvider} from './AuthContext'
import {auth} from './Pages/component/firebaseConfig/Firebase'
import {onAuthStateChanged} from 'firebase/auth'
import { onSnapshot , doc } from 'firebase/firestore';
import { db } from './Pages/component/firebaseConfig/Firebase';
import Profile from './Pages/Profile';
import Creatgig from './Pages/Creatgig';
import Gig from './Pages/component/Gig';
import NoMatch from './NoMatch';
import GigsInfo from './componenet/GigsInfo';
import UserInfo from './componenet/UserInfo';




function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)  
  const [enuser , setEnUser] = useState("")

  useEffect(() => {
    onAuthStateChanged(auth , (user) => {
      if (user) {      
        if(user.emailVerified){
        setCurrentUser(user);
        }
        setEnUser(user)
      } else {
        console.log("App.jsx no user");
        setCurrentUser(undefined);
      }
    })
  }, [enuser])

  const [userdata , setUserData]=useState([])
  const [gigresult , setGigResult] = useState([])

  const getData = async () => {
      if(currentUser){
          const result = await onSnapshot(doc(db, "users", currentUser.uid), (docSnap)=>{setUserData(docSnap.data()); });
  }} 
  
  useEffect(()=>{
    if(currentUser)
    getData();
    },[currentUser])


    return (
   <BrowserRouter>
      <AuthProvider value={{currentUser , timeActive , setTimeActive , enuser , }}>
        <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/Findwork' exact element={<Findw/>}/>
            <Route path='/Findtalent' exact element={<Findt/>}/>
            <Route path='/ChooseCategorie' exact element={<Choose/>}/>
            <Route path ='/Login' exact element={<Login/>}/>
            <Route path ='/ProfilePage' exact element={<Profile/>}/>
            <Route path ='/Profile/CreatAGig' exact element={<Creatgig/>}/>
            <Route path ='/Gig' exact element={<Gig/>} />
            <Route path='Gig/:gigid' element={<GigsInfo/>}/>
            <Route path='userDetails/:userid' element={<UserInfo/>}/>
            <Route path='*' element={<NoMatch/>}/>
        </Routes>
      </AuthProvider>
   </BrowserRouter>
  );
}

export default App;