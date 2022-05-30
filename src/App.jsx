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




function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)  

  useEffect(() => {
    onAuthStateChanged(auth , (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        console.log("no user");
        setCurrentUser(undefined);
      }
    })
  }, [])

  const [userdata , setUserData]=useState([])
  const [gigresult , setGigResult] = useState([])

  const getData = async () => {
      if(currentUser){
          const result = await onSnapshot(doc(db, "users", currentUser.uid), (docSnap)=>{setUserData(docSnap.data()); });
          const result2 = await onSnapshot(doc(db, "gig", currentUser.uid), (docSnap)=>{setGigResult(docSnap.data()); });
  }} 
  
  useEffect(()=>{
    if(currentUser)
    getData();
  },[currentUser])
  
  return (
   <BrowserRouter>
      <AuthProvider value={{currentUser , timeActive , setTimeActive , userdata , gigresult}}>
        <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/Findwork' exact element={<Findw/>}/>
            <Route path='/Findtalent' exact element={<Findt/>}/>
            <Route path='/ChooseCategorie' exact element={<Choose/>}/>
            <Route path ='/Login' exact element={<Login/>}/>
            <Route path ='/ProfilePage' exact element={<Profile/>}/>
            <Route path ='/Profile/CreatAGig' exact element={<Creatgig/>}/>
            <Route path ={'/Gig'+userdata.firstname +gigresult.gigTitle} exact element={<Gig/>} />
        </Routes>
      </AuthProvider>
   </BrowserRouter>
  );
}

export default App;