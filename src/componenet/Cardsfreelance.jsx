import React, { useEffect, useState } from 'react'
import { Text ,  Flex,  Img} from '@chakra-ui/react';
import {InfoOutlineIcon} from '@chakra-ui/icons';
import { db } from '../Pages/component/firebaseConfig/Firebase';
import { getDoc , doc} from 'firebase/firestore';
import { Link } from 'react-router-dom';


export const Cardsfreelance = ({data}) => {
  
  //fetch data of the user using his ID

  const [userid , setUserId] = useState(null);
  const [userinfo , setUserInfo]= useState(null)

  const getUserInfo = async (db, userId) =>{
    const useRef = doc(db , 'users', userId);
    const userSnap = await getDoc(useRef);
    if(userSnap.exists()){
      return userSnap.data();
    }else{
      return "there is no such Document"
    }
  }
  useEffect(()=> {
    if(data) setUserId(data.userID)
    if(userid) getUserInfo(db , userid).then((data)=>{
    setUserInfo(data)
    })
  }, [userid])

  return (
    <div>
      <Flex 
       height={"300"}
       justifyContent={"space-between"}
       alignItems="center"
       direction={"column"}
       cursor="pointer"
       shadow={"lg"}
       _hover={{ shadow: "xl" }}
       rounded="md"
       overflow={"hidden"}
       position="relative"
       maxWidth={"300px"}
       color='white'>
          <Link to={`/Gig/${data.gigID}`}>
            <Flex position={'relative'} height={'100%'} width={'100%'} bg={'red'}>
            <InfoOutlineIcon position={'absolute'} p ={1} color={'#0058b4'}/>
            <Img src={data.gigImages} bgSize={"contain"} bgPosition="center"/>
            </Flex>
          </Link>
          <Flex position={'absolute'} 
                bottom='0'
                left={'0'}
                p='2'
                width={'full'}
                direction='column'
                bgColor="#0058b4">
              <Link to={`/userDetails/${userid}`}>   
              <Flex alignItems={'center'}>
              
                <Img src={userinfo?.imageUrl} 
                rounded='full'
                width='40px'
                height='40px'
                position={'center'}
                />
                <Text px={'0.5rem'}  fontWeight='200' fontSize={'17px'}>{userinfo?.firstname} {userinfo?.lastname}</Text>
                
              </Flex>
              </Link>
              <Flex width={'full'}
                justifyContent='space-between'
                alignItems={'center'}
                borderTop={'1px solid white'}
                marginTop='0.5rem'
                >
                    <Text  fontWeight="400" isTruncated  >{data.gigTitle}</Text>
              </Flex>    
              <Text fontSize={'15px'}  >STARTING AT ${data.basicPrice}</Text>
          </Flex>
      </Flex>
    </div>
  )
}

