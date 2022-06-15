import React, { useEffect, useState } from 'react'
import { Text ,  Flex,  Img} from '@chakra-ui/react';
import {InfoOutlineIcon , CloseIcon} from '@chakra-ui/icons';
import { db } from '../Pages/component/firebaseConfig/Firebase';
import { getDoc , doc, deleteDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';


export const CardsContract = ({data}) => {
  
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
    if(data) setUserId(data.freelancerid)
    if(userid) getUserInfo(db , userid).then((data)=>{
    setUserInfo(data)
    console.log(data)
    })
  }, [userid  ])


  const cancelGig = async () => {
    await deleteDoc(doc(db, "contract", data.contractid));
    console.log(data.contractid)
    console.log('somthing happend')
  }

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
            <Flex position={'relative'} height={'100%'} width={'100%'} >
              <Flex position={'relative'} height={'100%'} width={'100%'} >
              <CloseIcon position={'absolute'} p ={1} color={'red'} right={0} onClick={()=>cancelGig()}/>
              <Img src={data.gigimage} bgSize={'cover'} bgPosition="left" />
            </Flex>
            </Flex>
          <Flex position={'absolute'} 
                bottom='0'
                left={'0'}
                p='2'
                width={'full'}
                direction='column'
                bgColor="#0058b4">
              <Link to={`/userDetails/${data.freelancerid}`}>   
              <Flex alignItems={'center'}>
              
              <Img src={userinfo?.imageUrl} 
                rounded='full'
                width='40px'
                height='40px'
                position={'center'}
                />
                <Text px={'0.5rem'}  fontWeight='200' fontSize={'17px'}>{data?.freelanncername}</Text>
                
              </Flex>
              </Link>
              <Flex width={'full'}
                justifyContent='space-between'
                alignItems={'center'}
                borderTop={'1px solid white'}
                marginTop='0.5rem'
                >
                    <Text  fontWeight="400" isTruncated >{data.gigtitle}</Text>
              </Flex>    
              <Text fontSize={'15px'}  >STARTING AT ${data.gigprice}</Text>
          </Flex>
      </Flex>
    </div>
  )
}

