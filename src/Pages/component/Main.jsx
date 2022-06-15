import React  , {useState} from 'react';
import './main.css';
import {auth} from './firebaseConfig/Firebase'
import {useAuthValue} from '../../AuthContext'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {
  chakra,
  Box,
  GridItem,
  useColorModeValue,
  Button,
  Stack,
  Center,
  Flex,
  Icon,
  SimpleGrid,
  VisuallyHidden,
  Input,
} from "@chakra-ui/react";
import Verfication from './Verfication';


export default function Main({title}) 
{
  const {currentUser} = useAuthValue()

  const [firstname, setFirstName]= useState("");
  const [lastname, setLastName]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
//button use state 
  const [buttonPopup , setButtonPopup] = useState(false);
//fire base related states 

//email times hooks related 
  const {setTimeActive} = useAuthValue()
  

  const validatePassword = () => { //verify weather the password and the confirm password value are equal
    let isValid = true // in case value matches varibale isValid get set to "true"
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false // in case value matches varibale isValid get set to "false"
        setError('Passwords does not match') 
      }
    }
    return isValid //returns the value of isValid weather true or false
  }

  const register = ()=> {
    setError('')
    if(validatePassword()) { // validatePassword is true 
        createUserWithEmailAndPassword(auth, email, password)// Create a new user with email and password using firebase
        .then(() => {
          sendEmailVerification(auth.currentUser).then(() => { //send a verification email using the curent user who has be registered in firebase authentification 
            setTimeActive(true)
            setButtonPopup(true);
            console.log(email)
          }).catch((err) => alert(err.message)) // fails verification email wasn't sent 
        })
        .catch(err => setError(err.message)) // fails could't creat the user account using those values 
    }
    setPassword('')
    setConfirmPassword('')
  }


  return (
    <div id="Main">
    <Box px={8} py={24} mx="auto" >
      <SimpleGrid
        alignItems="center"
        w={{ base: "full", xl: 11 / 12 }}
        columns={{ base: 1, lg: 11 }}
        gap={{ base: 0, lg: 24 }}
        mx="auto"
      >
        <GridItem
          colSpan={{ base: "auto", lg: 7 }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <chakra.h1
            mb={4}
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            lineHeight={{ base: "shorter", md: "none" }}
            color={useColorModeValue("gray.900", "gray.200")}
            letterSpacing={{ base: "normal", md: "tight" }}
          >
            Ready to start your journey?
          </chakra.h1>
          <chakra.p
            mb={{ base: 10, md: 4 }}
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="light"
            color="gray.500"
            letterSpacing="wider"
          >
            Share your skills among other talented people! and get the chance to be hired in the major league companies 
          </chakra.p>
        </GridItem>
        <GridItem colSpan={{ base: "auto", md: 4 }}>
          <Box as="form" mb={6} rounded="lg" shadow="xl">
            <Center pb={0} color={useColorModeValue("gray.700", "gray.600")}>
              <p pt={2}>Start earning right now!</p>
            </Center>
            <SimpleGrid
              columns={1}
              px={6}
              py={4}
              spacing={4}
            >
              <Flex>
                <VisuallyHidden>First Name</VisuallyHidden>
                <Input
                  mt={0}
                  type="text"
                  placeholder="First Name"
                  required={true}
                  onChange={(event) => {setFirstName(event.target.value)}}
                />
              </Flex>
              <Flex>
                <VisuallyHidden>Last Name</VisuallyHidden>
                <Input
                  mt={0}
                  type="text"
                  placeholder="Last Name"
                  required={true}
                  onChange={(event) => {setLastName(event.target.value)}}
                />
              </Flex>
              <Flex>
                <VisuallyHidden>Email Address</VisuallyHidden>
                <Input
                  mt={0}
                  type="email"
                  placeholder="Email Address"
                  required={true}
                  onChange={(event) => {setEmail(event.target.value)}}
                />
              </Flex>
              <Flex>
                <VisuallyHidden>Password</VisuallyHidden>
                <Input
                  mt={0}
                  type="password"
                  placeholder="Password"
                  required={true}
                  onChange={(event) => {setPassword(event.target.value)}} 
                />
              </Flex>
              <Flex>
                <VisuallyHidden>Confirm Password</VisuallyHidden>
                <Input
                  mt={0}
                  type="password"
                  placeholder="Confirm Password"
                  required={true}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </Flex>
              <Button colorScheme="blue" w="full" py={2} onClick={()=> register()}>
                Sign up for free
              </Button>
            </SimpleGrid>
          </Box>
          <chakra.p fontSize="xs" textAlign="center" color="gray.600">
            By signing up you agree to our{" "}
            <chakra.a color="brand.500">Terms of Service</chakra.a>
          </chakra.p>
        </GridItem>
      </SimpleGrid>
    </Box>
        <Verfication trigger = {buttonPopup} setTrigger={setButtonPopup} firstname={firstname?firstname : "test"} lastname={lastname?lastname : "test"} email={email?email : 'test'} isfreelancer = {true}/>        
    </div>
  );
};