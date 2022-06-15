import React, {  useEffect, useState } from 'react'
import {db ,  storage} from './component/firebaseConfig/Firebase';
import {updateDoc, doc, getDoc} from 'firebase/firestore'
import './component for profile/profile.css'
import {ref , uploadBytes , getDownloadURL} from 'firebase/storage'
import {Link} from "react-router-dom"
import {useAuthValue} from '../AuthContext'
import NavL from '../Pages/component/NavL'
import Footer from '../Pages/component/Footer'
import {BsPencilFill} from 'react-icons/bs'
import { Box, Flex, Grid, GridItem, Img, Text , SimpleGrid,
    ButtonGroup,
    Button,
    PopoverTrigger,
    Popover,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    Spinner} from '@chakra-ui/react';
import { findcontract } from '../FetchData';
import { CardsContract } from '../componenet/CardsContract';

function Profile() {

    const [description , setDescription] = useState("");
    const [skill , setSkill] = useState("");
    const [experience , setExperience ] = useState("");
    const [city , setCity ] = useState("");
    const [title , setTitle ] = useState("");
    const [year , setYear ] = useState("");
    const [profileimage , setProfileImage] = useState(null);
    const [profileURL , setProfileURL] = useState("https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_206976.png&f=1&nofb=1");

    const [active , setActive] = useState(false);

    const [desable ,setDesable] = useState(true);

    const [contract , setContract] = useState([]);

    const {enuser} = useAuthValue()
    
    const [userdata , setUserData]=useState([])

    const getData = async () => {
        if(enuser){
            console.log(enuser.uid)
            const docRef = doc(db, "users", enuser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
                        
    }} 

   

    const UpdateDescription = async (e) => {
        e.preventDefault();
        const userUpdate = doc(db, "users", enuser.uid);
        await updateDoc(userUpdate, {
                        description: description,
                    });
        setActive(!active);
    };

    const UpdateSkill = async (e) => {
        e.preventDefault();
        const userUpdate = doc(db, "users", enuser.uid);
        await updateDoc(userUpdate, {
                        skill: skill, experience : experience,
                    }) ;
    };

    const UpdateEducation = async (e) => {
        e.preventDefault();
        const userUpdate = doc(db, "users", enuser.uid);
        await updateDoc(userUpdate, {
                        city: city, title : title,year : year,
                    });
    };



    const UploadProfileImage = async () =>{
        const imgRef = ref(storage , `ProfileUsers/ ${enuser.uid + "png"}`);
        setDesable(false);
        await uploadBytes(imgRef , profileimage).then(
        alert('image uploaded succesfully')).then(setDesable(true))
        const photoURL = await getDownloadURL(imgRef) 
        const userUpdate = doc(db, "users", enuser.uid);
        await updateDoc(userUpdate, {
                       imageUrl: photoURL,
                    }); 
    }

    useEffect(()=>{
        if(enuser)
        setProfileURL(userdata?.imageUrl)
    },[userdata]);

  
    useEffect( () => {
        if(enuser){
        getData(); 
    }
        
    },[enuser]);

    useEffect(()=>{
        findcontract(db, enuser.uid , setContract);
        console.log(contract)
    },[enuser.uid])





    const hidden ={
        display : active ?  'block' :'none',
    }
    const show ={
        display : active ?  'none' :'block',
    }

    const [active2 , setActive2] = useState(false);

    const hidden2 = {
        display : active2 ? 'block' : 'none',
    }
    const show2 ={
        display : active2 ?  'none' :'block',
    }

    const [active3 , setActive3] = useState(false);

    const hidden3 = {
        display : active3 ? 'block' : 'none',
    }
    const show3 ={
        display : active3 ?  'none' :'block',
    }

    const [active4 , setActive4] = useState(false);

    const hidden4 = {
        display : active4 ? 'block' : 'none',
    }
    const show4 ={
        display : active4 ?  'none' :'block',
    }

    


  return (
     <>
        <NavL/>
        <div id="hero">               
                <div id="container1">
                <input type="file" id="img-holder" accept='.png , .jpeg , .jpg' onChange={(e)=>{setProfileImage(e.target.files[0]) ;setDesable(false)}}  style={{ backgroundImage: 'url(' + profileURL+ ')' }}></input>
                <button disabled={desable}  onClick={()=>UploadProfileImage()}>upload image</button>
                <hr />
                    <ul id="list-name">
                        <li>Name : {userdata?.firstname} {userdata?.lastname}</li>
                        <li>from : {userdata?.city}</li>
                        <li>Email : {userdata?.email}</li>
                    </ul>
                </div>  
                
                <div action='' id="container2">
                <div id="description" >
                    <div className="title-countainer">
                            <div  className='titles'>
                                <h2 >Description</h2>
                                <a href="#" onClick={()=> setActive(!active)} style={show}>Edit Description  <BsPencilFill/></a>
                            </div>
                            <div>
                                <h2 style={show}>{userdata.description}</h2>
                            </div>
                    </div>
                    <div id='insid-description'  style={hidden}>
                            <input type="text" value={description} placeholder='type anything you wanna add about yourself' onChange={(event) => {setDescription(event.target.value)}}/>
                            <div id='btn'>
                                    <button className='cancel' onClick={()=> setActive(!active)}>Cancel</button>
                                    <button className='update' onClick={(e)=> {UpdateDescription(e) ; setActive(!active) }}>Update</button>
                            </div>
                    </div>    
                    {contract ?
                    <>
                    <Text py={"2rem"}>Current Gigs</Text>
                    <Flex  h={'100%'} w={'full'}>
                        <SimpleGrid spacing='40px' px='2' width={'full'} autoColumns={'max-content'} overflowX={'clip'} overflowY={'scroll'} minChildWidth={'190px'} maxH={'500px'}>
                            {contract && contract?.map((data) => (
                                    <CardsContract data={data} key={data.contractid} height='150px'  />
                            ))}
                        </SimpleGrid>
                    </Flex></> : <></> }     
                </div>
                { userdata.isFreelancer ?  
                <div id="aditional-info">
                    <div id="box1">
                            <div className="inside-box">
                                <div className="title-countainer">             
                                    <div className='titles' >
                                        <h2>Skills</h2>
                                        <a href='#' onClick={()=>setActive2(!active2)} style={show2}>Add new</a>
                                    </div>
                                    <div>
                                        <h2 style={show2}> skill : {userdata?.skill}</h2>
                                        <h2 style={show2}>level : {userdata?.experience}</h2>
                                    </div>
                                </div>  
                                <div id="skills" style={hidden2}>
                                    <select  onChange={(e) =>{setSkill(e.target.value)}} >
                                        <option value="0" className='hidden' >Ex: coding...</option>
                                        <option value="Programmer">Programmer</option>
                                        <option value="Digital Artist">Digital Artist</option>
                                        <option value="3Videographer">Videographer</option>
                                    </select>
                                    <select name="" id="" onChange={(event) => {setExperience(event.target.value)}}>
                                        <option value="0" className='hidden'>Experience Level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermidiat">Intermidiat</option>
                                        <option value="expert">Expert</option>
                                    </select>
                                    <div id="btn3">
                                    <button className='cancel' onClick={()=>setActive2(!active2)}>Cancel</button>
                                    <button className='update' onClick={(e)=>{UpdateSkill(e) ; setActive2(!active2)}} >Update</button>  
                                    </div>      
                                </div>
                            </div>
                            <hr />
                            <div className='inside-box'>
                                <div className="title-countainer">
                                    <div className="titles">
                                        <h2>Education</h2>
                                        <a href="#" onClick={()=> setActive3(!active3)} style={show3}> Add new</a>
                                    </div>
                                    <div>
                                            <h2 style={show3}> skill : {userdata?.city}</h2>
                                            <h2 style={show3}>level : {userdata?.title}</h2>
                                            <h2 style={show3}>level : {userdata?.year}</h2>
                                    </div>
                                    </div>
                                <div id="education" style={hidden3}>
                                    <select name="" id="" onChange={(event) => {setCity(event.target.value)}} >
                                        <option value="0" className='hidden'>City of College/University</option>
                                        <option value="Annaba" >Annaba</option>
                                        <option value="Algies" >Algies</option>
                                        <option value="Batna" >Batna</option>
                                    </select>
                                    <select name="" id="" onChange={(event) => {setTitle(event.target.value)}} >
                                        <option value="0" className='hidden'>Title</option>
                                        <option value="BEM">BEM</option>
                                        <option value="BAC">BAC</option>
                                        <option value="Technic superior">Technic superior</option>
                                        <option value="License">License</option>
                                        <option value="Master">Master</option>
                                    </select>
                                    <select name="" id="" onChange={(event) => {setYear(event.target.value)}} >
                                    <option value="0" className='hidden'>Year of graduation</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    </select>
                                    <div id='btn4'>
                                        <button className='cancel' onClick={()=> setActive3(!active3)}>Cancel</button>
                                        <button className='update' onClick={(e)=>{UpdateEducation(e) ; setActive3(!active3)}}>Update</button>
                                    </div>
                                </div>
                             </div>
                    </div>    
                        <div id="box2">
                            <div className="inside-box">
                                <div className="title-countainer">
                                    <div className="titles">
                                    <h2>Certification</h2>
                                    <a href="#" onClick={()=>setActive4(!active4)} style={show4}>Add new</a>
                                    </div>
                                    <dir>
                                    <h2>{userdata?.certificat}</h2>
                                    </dir>
                                </div>
                                <dir id="certificat" style={hidden4}>
                                    <input type="text" placeholder='Certificate or Award' name="" id="" />
                                    <input type="text" placeholder='Certification From' name="" id="" />
                                    <select name="" id="" >
                                        <option value="0" className='hidden'>Year</option>
                                        <option value="2022">2022</option>
                                        <option value="2021">2021</option>
                                        <option value="2020">2020</option>
                                        <option value="2019">2019</option>
                                        <option value="2018">2018</option>
                                        </select>
                                    <div id="btn5">
                                        <button className='cancel' onClick={()=>{setActive4(!active4)}}>Cancel</button>
                                        <button className='update' onClick={()=>{setActive4(!active4)}} >Update</button>
                                    </div>
                                </dir>
                            </div>
                            <hr />
                            <div className="inside-box">
                                <div id='creatgig'>
                                <h1>Creat your GIG !</h1>
                                <Link className='clickhere' to="/Profile/CreatAGig" >Click here</Link>
                                </div>
                            </div>
                        </div> 
                    </div>
                : <></> } 
                </div>      
                   
        </div>

        
        <Footer/>
    </> 
  )
}

export default Profile;
