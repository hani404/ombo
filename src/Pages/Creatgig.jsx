import './component for creatgig/creatgig.css'
import React, { useEffect, useState } from 'react'
import { db , storage } from './component/firebaseConfig/Firebase'
import NavL from './component/NavL'
import { useAuthValue } from '../AuthContext'
import {onSnapshot , doc ,  setDoc} from 'firebase/firestore'
import { getDownloadURL, uploadBytes , ref } from 'firebase/storage'
import {useNavigate} from 'react-router-dom'
import { listGigId } from '../FetchData'
import Footer from './component/Footer'


function Creatgig() {

  const navigate = useNavigate();
  
  const {currentUser} = useAuthValue();
 
  const [title ,setTitle]= useState("");
  const [category ,setCategory]= useState("");
  const [basicdeliver ,setBasicDeliver]= useState("");
  const [basictime ,setBasicTime]= useState("");
  const [basicprice ,setBasicPrice]= useState("");
  const [standarddeliver ,setStandardDeliver]= useState("");
  const [standardtime ,setStandardTime]= useState("");
  const [standardprice,setStandardPrice]= useState("");
  const [premiumdeliver ,setPremiumDeliver]= useState("");
  const [premiumtime ,setPremiumTime]= useState("");
  const [premiumprice ,setPremiumPrice]= useState("");
  const [describe ,setDescribe]= useState("");
  const [gigimage ,setGigImage]= useState("");
  const [imageurl , setImageUrl] = useState("");
  const [gigvideo ,setGigVideo]= useState("");
  const [videourl , setVideoUrl] = useState("");
  const [active , setactive] = useState(true);
  const [gigid , setGigId] = useState([])


  const [userdata , setUserData]=useState([])

  const getData = async () => {
      if(currentUser){
          const result = await onSnapshot(doc(db, "users", currentUser.uid), (docSnap)=>{setUserData(docSnap.data()); });
  }} 
  
  useEffect(()=>{
    getData();
  },[])

  
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length && i<2 ; i++) {
      const newImage = e.target.files[i];
      setGigImage(newImage);
      setactive(false);
    }
  };



  const handleUpload = async (e) => {
    e.preventDefault();
    if(gigimage){
        const imagesRef = ref(storage , `gigimages/${gigimage.name}`);  // getting a reference to the storage in the database  
        console.log(imagesRef);
        await  uploadBytes(imagesRef , gigimage); // uploading the image been stored in the input field to the reference we set previously 
        alert('image has been uploaded')
        await  getDownloadURL(imagesRef).then(url => setImageUrl(url)); // getting the URL of the image from the storage section in database and storing that URL in a another variable 
  }else console.log('there is no fucking th')
 };
  

    const handlesavevideo = async (e) => {
      e.preventDefault();
      if(gigvideo){
      const videoref = ref(storage , `gigvideos/${gigvideo[0].name}`);
      await uploadBytes(videoref , gigvideo).then(console.log('video uploaded'));  
      await getDownloadURL(ref).then((url)=>setVideoUrl(url));
    }else caches(error => {
      console.log(error);
    });
    }


  const CreatGig = async (e) => {
    e.preventDefault();
    const id = `${Date.now()}` + '' ; // creating a n ID 
    if(currentUser){ // if there is a current user then proceed 
    await setDoc(doc(db , 'gig' , id ),{ gigID : id , userID : currentUser.uid ,gigTitle:title , gigCategory:category , basicDeliver : basicdeliver , basicTime : basictime , basicPrice : basicprice , 
            standardDeliver : standarddeliver  , standardTime : standardtime , standardPrice : standardprice , premiumDeliver : premiumdeliver , premiumTime : premiumtime , premiumPrice : premiumprice ,
            gigDescription : describe , gigImages : imageurl , gigVideos : videourl }); //creating a document with a specific ID including all the information about the Gig 
            listGigId(currentUser.uid , id) //storing the id of the newly created gig into a string related to the current user
            .then(navigate('/Gig/' + id)); // navigate the user to gig info page to check the created gig 
            }         
  }




  return (
      <>
        <NavL/>
        <form id='form' onSubmit={(e)=>CreatGig(e)}>
        <div id="main">
          <div id="inside-main1">
        <div id="hero1">
          <div className="inside1.1">
            <h2>GIG TITLE</h2>
            <input type="text" placeholder='I WILL DO SOMTHING I AM REALLY GOOD AT' onChange={(e)=>setTitle(e.target.value)}  required/>
          </div>
          <div id="span"><h2>0/80 max</h2></div>
          <div className="inside1.2">
            <h2>CATEGORY</h2>
            <select onChange={(e)=>setCategory(e.target.value)} >
              <option value="0" className='hidden'>SELECT</option>
              <option value="GRAPHIC">GRAPHIC</option>
              <option value="DEGITAL MARKETING">DEGITAL MARKETING</option>
              <option value="MUSIC AND AUDIO">MUSIC AND AUDIO</option>
            </select>
          </div>
        </div>
        <hr />
        <div id="hero2">
            <div className="inside2 1">
              <div className="lil">
                <h2>Basic</h2>
                <input type="text" placeholder='with this format i will deliver....' onChange={(e)=>setBasicDeliver(e.target.value)} required />
                <div>
                  <h2>i'll deliverin in only</h2>
                  <select onChange={(e)=>setBasicTime(e.target.value)}  >
                    <option value="0" className="hidden">SELECT</option>
                    <option value="1">1 DAY</option>
                    <option value="2">2 DAY</option>
                    <option value="3">3 DAY</option>
                  </select>
                </div>
                <div>
                <h2>Your Price for Basic treatment</h2>
                <input type='number' min={0} placeholder='name your price for Basic treatment' onChange={(e)=>setBasicPrice(e.target.value)} required />
                </div>
              </div>
              <hr />
              <div className="lil">
                <h2>Standard</h2>
                <input type="text" placeholder='with this format i will deliver....'  onChange={(e)=>setStandardDeliver(e.target.value)} required />
                <div>
                  <h2>i'll deliverin in only</h2>
                  <select onChange={(e)=>setStandardTime(e.target.value)}  >
                    <option value="0" className="hidden">SELECT</option>
                    <option value="1">1 DAY</option>
                    <option value="2">2 DAY</option>
                    <option value="3">3 DAY</option>
                  </select>
                </div>
                <div>
                <h2>Your Price for Standard treatment</h2>
                <input type='number' min={0} placeholder='name your price for Standard treatment' onChange={(e)=>setStandardPrice(e.target.value)} required />
                </div>
              </div>
              <hr />
              <div className="lil">
                <h2>Premium</h2>
                <input type="text" placeholder='with this format i will deliver....' onChange={(e)=>setPremiumDeliver(e.target.value)} required />
                <div>
                  <h2>i'll deliverin in only</h2>
                  <select onChange={(e)=>setPremiumTime(e.target.value)}  >
                    <option value="0" className="hidden">SELECT</option>
                    <option value="1">1 DAY</option>
                    <option value="2">2 DAY</option>
                    <option value="3">3 DAY</option>
                  </select>
                </div>
                <div>
                <h2>Your Price for Premium treatment</h2>
                <input type='number' min={0} placeholder='name your price for Premium treatment' onChange={(e)=>setPremiumPrice(e.target.value)} required />
                </div>
              </div>
            </div>
        </div>
        </div>
        <div id="inside-main2">
        <div id="hero3">
          <h2>Briefly descrive your Gig</h2>
          <input className='describe' maxLength={200}  type="text" placeholder='type here' onChange={(e)=>setDescribe(e.target.value)} required />
        </div>
        <hr />
        <div id="hero4 ">
          <div className='lil'>
            <h1 className='heroTitle'>Showcase Your Services In A Gig Gallery</h1>
            <h2>Images(up to 3)</h2>
            <p>Get noticed by the right buyers with visual examples of your services.</p>
            <input accept='.jpeg , .png , .jpg' type="file" onChange={handleChange} required />
            <button onClick={(e)=>handleUpload(e)} className="SGB"  >Save gig images</button>
          </div> 
        </div>
        <button className='SGBp' type='submit' > Save your Gig !</button>
        </div>
        </div>
        </form>
        <Footer/>
      </>
  )
}

export default Creatgig
