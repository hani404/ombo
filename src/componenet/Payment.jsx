import React, { useEffect, useState } from 'react'
import {
    chakra,
    Box,
    Stack,
    Flex,
    Link,
  } from "@chakra-ui/react";
  import {CloseIcon} from '@chakra-ui/icons'
import { hirefreelance } from '../FetchData';
import { useAuthValue } from '../AuthContext';
import {db} from '../Pages/component/firebaseConfig/Firebase'
import { useNavigate } from 'react-router-dom';




const Payment = ({trigger , setTrigger ,  giginfo , packag , gigprice ,freelancername}) => {

const {currentUser} = useAuthValue();

const [paymentMethode , setPaymentMethode] = useState(null)

useEffect(()=>{
  console.log(freelancername)
},[freelancername])

const navigate = useNavigate()
 
const confirmContract = async ()  => {
    if(paymentMethode != null ){
    await hirefreelance( db , giginfo.userID , currentUser.uid ,  giginfo.gigID , paymentMethode , packag , giginfo.gigImages , giginfo.gigTitle , gigprice , freelancername)
    navigate('/ProfilePage');}
    }


    
  return (trigger) ? (

    <Flex id='popup'>
    <Flex
      justify="center"
      alignItems={'center'}
      w="100%"
      h='100%'

    >
      <Box
        bg ={'white'}
        borderRadius={15}
        w={{ base: "full", md: "75%", lg: "50%" }}
        px={4}
        py={16}
        textAlign={{ base: "left", md: "center" }}
        position={'relative'}
      > 
        <Link onClick={()=> setTrigger(!trigger)}>
        <CloseIcon 
        position={'absolute'}
        top={'1rem'}
        right={'1rem'}
         /></Link>
        
        <chakra.span
          fontSize={{ base: "3xl", sm: "4xl" }}
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="shorter"
          mb={6}
        >
          <chakra.span display="block" fontWeight={900} fontSize='2xl'>Choose you payment method</chakra.span>
          <chakra.span
              display="block"
            >
            Cash Or CCP payment check
            </chakra.span>
        </chakra.span>
        <Stack
          justifyContent={{ base: "left", md: "center" }}
          direction={{ base: "column", sm: "row" }}
          spacing={10}
          mt={4}
        >
          <Box display="inline-flex" rounded="md" shadow="md">
            <Link
              onClick={()=>{setPaymentMethode(true); confirmContract();}}
              w="full"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={2}
              border="solid transparent"
              fontWeight="bold"
              rounded="md"
              color="white"
              bg="#0058b4"
              _hover={{
                bg: "white",
                border:"1px solid #0058b4",
                color : "#0058b4"
              }}
            >
              Cash
            </Link>
          </Box>
          <Box ml={3} display="inline-flex" rounded="md" shadow="md" >
            <Link
              onClick={()=>{setPaymentMethode(false) ; confirmContract();}}
              w="full"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={2}
              border="solid transparent"
              fontWeight="bold"
              rounded="md"
              color="white"
              bg="#0058b4"
              _hover={{
                bg: "white",
                border:"1px solid #0058b4",
                color : "#0058b4"
              }}
            >
              CCP
            </Link>
          </Box>
        </Stack>
      </Box>
    </Flex>
  </Flex>
  ) : <></>
}

export default Payment
