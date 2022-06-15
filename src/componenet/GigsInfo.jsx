import {  CheckCircleIcon, DeleteIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Flex, Grid, GridItem, Img, Text , 
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
import { GiMoneyStack } from 'react-icons/gi'; 
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../Pages/component/firebaseConfig/Firebase';
import Footer from '../Pages/component/Footer';
import NavL from '../Pages/component/NavL';
import './gig.css'
import { useAuthValue } from '../AuthContext';
import { deleteGig } from '../FetchData';
import Payment from './Payment';



const GigsInfo = () => {

  const navigate = useNavigate()

  const {currentUser} = useAuthValue();

  const { gigid } = useParams();

  const avatar = "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"

  const [basic , setBasic]=useState(false);
  const [standard , setStandard]=useState(true);
  const [premium , setPremium]=useState(true);

  const [packag , setPackag] = useState(null);

  const [isloading , setIsLoading] = useState(false);

  const [boocked , setBoocked] = useState(false);

  const [buttonPopup , setButtonPopup] = useState(false);

  const [gigprice , setGigPrice] = useState('');



  const [giginfo , setGigInfo] = useState(null);
  const [userinfo , setUserInfo] = useState(null);

  const getGigInfo = async (db, gigid) =>{
    const gigRef = doc(db , 'gig', gigid);
    const gigSnap = await getDoc(gigRef);
    if(gigSnap.exists()){
      return gigSnap.data();
    }else{
      return "there is no such Document gig "
    }
  }
  const getUserInfo = async (db, userid) =>{
    const userRef = doc(db , 'users', userid);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists()){
      return userSnap.data()   
    }else{
      return "there is no such Document user"
    }
  }


  useEffect(()=>{
  if(gigid){
    getGigInfo(db , gigid).then(data => {
      setGigInfo(data)
      getUserInfo(db , data.userID).then(
        data => setUserInfo(data)
      )
    })
  }
  },[gigid])

  ///delet Gig function 
  
  const  deletethisGig = () => {
    setIsLoading(true);
    deleteGig(db , gigid);
    navigate("/ProfilePage" , {replace : true});    
  }

  const change1 = () => {
    setBasic(false);
    setPremium(true);
    setStandard(true);
  }
  const change2 = () => {
    setBasic(true);
    setPremium(true);
    setStandard(false);
  }
  const change3 = () => {
    setBasic(true);
    setPremium(false);
    setStandard(true);
  }  


  if (isloading) return <Spinner/>

  return (
    <div>
      <NavL/>

    <Flex minHeight={'100%'} flexDirection='column' px={6} marginTop={10}>
      <Grid templateColumns="repeat(3, 1fr)" gap={2} width='100%' color={'#0058b4'}>
        <GridItem width={'100%'}  p={'2'} colSpan={2}>
          <Flex  flexDirection={'column'} gap='3' width={'full'}  height={'full'} position={'relative'} >
            <Text fontSize={'1.5rem'} fontWeight={'400'} isTruncated>{giginfo?.gigTitle}</Text>
            <Flex alignItems={'center'} gap={'20'}>
              <Flex>
                  <Img  height={'50px'} width={'50px'} src={userinfo?.imageUrl ? userinfo?.imageUrl : avatar}  borderRadius={'100%'} />
                  <Text fontWeight={"medium"} >{userinfo?.firstname + " " + userinfo?.lastname}</Text>
              </Flex>
                  { giginfo?.userID === currentUser?.uid && (
              <Flex>
                  <Popover closeOnEsc>
                    <PopoverTrigger>
                      <Button leftIcon={<DeleteIcon fontSize={18}/>} colorScheme='red' variant='solid' size='sm'>
                        Delete Gig
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>Are you sure you want to delete this Gig?</PopoverBody>
                      <PopoverFooter display='flex' justifyContent='flex-end'>
                        <ButtonGroup size='sm'>
                          <Button colorScheme='red' onClick={()=> deletethisGig(gigid)}>confirm</Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
              </Flex>
                                                       )}
            </Flex>
            <Img borderRadius={'5px'} maxHeight={'350px'} width={'50%'} src={giginfo?.gigImages} objectFit={'cover'} />
            <Text>About the Gig <br/> {giginfo?.gigDescription}</Text>
          </Flex>
        </GridItem>
        <GridItem width={'100%'}  p={'2'} colSpan={1}>
        <Flex flexDirection="column" width={'full'} gap='10'  justifyContent={'space-evenly'}>
          <ButtonGroup size='sm' isAttached variant='outline' width={"100%"} borderColor={"#0058b4"}>
            <Button borderColor={"#0058b4"} width={"100%"} onClick={()=>{change1() ; setPackag('Basic'); setGigPrice(giginfo?.basicPrice);}}  >Basic</Button>
            <Button borderColor={"#0058b4"} width={"100%"} onClick={()=>{change2() ; setPackag('Standard'); setGigPrice(giginfo?.standardPrice)}}>Standard</Button>
            <Button borderColor={"#0058b4"}  width={"100%"} onClick={()=>{change3() ; setPackag('Premium') ;setGigPrice(giginfo?.premiumPrice)}}>Premium</Button>
          </ButtonGroup>
          <Flex  hidden={basic} flexDirection={"column"} height='100%' gap={10}>
            <Flex  width={'full'}    flexDirection="column" gap={7} height={"100%"}>
            <Flex flexDirection={'row'} gap={1}>
            <GiMoneyStack/><Text fontWeight={'semibold'}> Basic Package Price : {giginfo?.basicPrice + "dz"}</Text>
            </Flex>
            <Text fontWeight={'semibold'}> <CheckCircleIcon/> What comes with this Package <br/> {giginfo?.basicDeliver}</Text>
            <Text fontWeight={'semibold'}> <TimeIcon/> time to deliver  {giginfo?.basicTime + "days"}</Text>
            </Flex>
            { giginfo?.userID === currentUser?.uid ? <></> :
            <Button colorScheme='blue' variant='solid' onClick={()=> setButtonPopup(!buttonPopup)}  > Continue {"(" + giginfo?.basicPrice + "dz)"}</Button>}
          </Flex>
          <Flex  hidden={standard} flexDirection={"column"} height='100%' gap={10}>
            <Flex  width={'full'}    flexDirection="column" gap={7} height={"100%"}>
            <Flex flexDirection={'row'} gap={1}>
            <GiMoneyStack/><Text fontWeight={'semibold'}> Standard Package Price : {giginfo?.standardPrice + "dz"}</Text>
            </Flex>
            <Text fontWeight={'semibold'}> <CheckCircleIcon/> What comes with this Package <br/> {giginfo?.standardDeliver}</Text>
            <Text fontWeight={'semibold'}> <TimeIcon/> time to deliver  {giginfo?.standardTime + "days"}</Text>
            </Flex>
            { giginfo?.userID === currentUser?.uid ? <></> :
            <Button colorScheme='blue' variant='solid'onClick={()=> setButtonPopup(!buttonPopup)} > Continue {"(" + giginfo?.standardPrice + "dz)"}</Button>}
          </Flex>
          <Flex  hidden={premium} flexDirection={"column"} height='100%' gap={10}>
            <Flex  width={'full'}    flexDirection="column" gap={7} height={"100%"}>
            <Flex flexDirection={'row'} gap={1}>
            <GiMoneyStack/><Text fontWeight={'semibold'}> Premium Package Price : {giginfo?.premiumPrice  + "dz"}</Text>
            </Flex>
            <Text fontWeight={'semibold'}> <CheckCircleIcon/> What comes with this Package <br/> {giginfo?.premiumDeliver}</Text>
            <Text fontWeight={'semibold'}> <TimeIcon/> time to deliver  {giginfo?.premiumTime + "days"}</Text>
            </Flex>
            { giginfo?.userID === currentUser?.uid ? <></> :
            <Button colorScheme='blue' variant='solid' onClick={()=> setButtonPopup(!buttonPopup)} > Continue {"(" + giginfo?.premiumPrice + "dz)"}</Button> }
          </Flex>
        </Flex>
        </GridItem>
      </Grid>
      {
        userinfo && (
      <Flex color={'#0058b4'}  height={'contain'} width={'full'} flexDirection='column' gap={5} py={'2rem'}>
           <Text>About the freelancer !</Text>
            <Flex align={'center'} gap={3}>
            <Img  height={'90px'} width={'90px'} src={userinfo?.imageUrl ? userinfo?.imageUrl : avatar}  borderRadius={'100%'} />
            <Text fontWeight={"medium"} >{userinfo?.firstname + " " + userinfo?.lastname}</Text>
            </Flex>
            <Flex >
              <Flex border={'1px solid #0058b4'} borderRadius={'15px'} gap={2} flexDirection={'column'} p={'3'} minH={'300px'}  minW={'600px'} maxWidth={'800px'}>
                <Flex justifyContent={'space-between'}  >
                  <Box>
                    <Text>From :  {userinfo?.city}</Text>
                    <Text>Skill : {userinfo?.skill}</Text>
                  </Box>
                  <Box>
                    <Text>Experience : {userinfo?.experience}</Text>
                    <Text>sljd : oahsfoi</Text>
                  </Box>
                </Flex>
                <Box mx={'auto'} height={'1px'} bg={'black'} width={'93%'}/>
                <Text > Description <br/> {userinfo?.description}</Text>
              </Flex>
            </Flex> 
          </Flex>
          )
          }
    </Flex>
    <Payment trigger = {buttonPopup} setTrigger={setButtonPopup}  giginfo = {giginfo} packag = {packag} gigprice ={gigprice} freelancername={userinfo?.firstname + " " + userinfo?.lastname}/>
    <Footer/>
    </div>
  )
}

export default GigsInfo
