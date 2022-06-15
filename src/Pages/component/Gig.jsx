import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthValue } from '../../AuthContext';
import { allGigForUser } from '../../FetchData';
import {db} from './firebaseConfig/Firebase'
import Footer from './Footer';
import NavL from './NavL';


function Gig() {

  const {currentUser} = useAuthValue()

  const [userdata , setUserData]=useState([])
  const [gigresult , setGigResult] = useState('')
  const [fetch , setFetch] = useState([]);
  const [gigdata , setGigdata] = useState([])

  const getData = async () => {
      if(currentUser){
          const result = await onSnapshot(doc(db, "users", currentUser.uid), (docSnap)=>{setUserData(docSnap.data()); });
          const result2 = await onSnapshot(doc(db, "gig", currentUser.uid), (docSnap)=>{setGigResult(docSnap.data()) ;});
  }} 
  
  useEffect(()=>{
    if(currentUser){
    getData();
  }
    
    
    },[currentUser])

  useEffect(()=>{
    if(userdata && userdata.gigIds){

      userdata.gigIds.forEach(e => {
        allGigForUser(db , e , setGigdata , gigdata);
      });
    
    }
  },[ userdata])

  useEffect(()=>{
    console.log(gigdata)
  },[gigdata])

  return (
    <>
    <NavL/>
    {/* <div id="hero-1">
      <div id="top">

      <div id='left'>
      <h1>{gigdata.gigTitle}</h1>
      <div>
       <div className='profileimgage' style={{ backgroundImage: 'url(' + userdata.imageUrl + ')' }}></div>
      <p>{userdata.firstname + " " +userdata.lastname}</p>
      </div>
      <div className='imagesgig ' style={{ backgroundImage : 'url('+ gigdata.gigImages+ ')'}} ></div>
      </div>

      <div id='right'>
      <ul>
        <li>
          <h2>Basic</h2>
          <h3>What comes with this treatment : {gigdata.basicDeliver}</h3>
          <h3>Price : {gigdata.basicPrice}</h3>
          <h3>Time : {gigdata.basicTime}</h3>
          <hr className='hr'/>
        </li>
        <li>
          <h2>Standard</h2>
          <h3>What comes with this treatment : {gigdata.standardDeliver}</h3>
          <h3>Price : {gigdata.standardPrice}</h3>
          <h3>Time : {gigdata.standardTime}</h3>
          <hr className='hr' />
        </li>
        <li>
          <h2>Premium</h2>
          <h3>What comes with this treatment : {gigdata.premiumDeliver}</h3>
          <h3>Price : {gigdata.premiumPrice}</h3>
          <h3>Time : {gigdata.premiumTime}</h3>
        </li>
      </ul>
      </div>

      </div>
      <div id='bottom'>
        <h2>Gig description</h2>
        <h3>
          {gigdata.gigDescription}
        </h3>
      </div>
    </div> */}

    <Footer/>
    </>
  )
}

export default Gig
