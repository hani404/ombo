import  {useState ,useEffect} from 'react';
import { db} from '../Pages/component/firebaseConfig/Firebase';
import {collection,getDocs, orderBy, query } from 'firebase/firestore';
import './body2.css';
import { SimpleGrid ,  Flex , Text , Box} from '@chakra-ui/react';
import {Cardsfreelance} from './Cardsfreelance';



export function Body2(){

     
     const [giginfos , setGigInfo] = useState(null)

     const GetAllGigs = async (db) => {
          const gigs = await getDocs(
            query(collection(db, "gig"), orderBy("gigID", "desc"))
          );
          return gigs.docs.map((doc) => doc.data());
          console.log(gigs)
      };

      useEffect(() => {
          GetAllGigs(db).then((data) => {
               setGigInfo(data)});
          },[]);



     return (
          <Box px={"2rem"} py='3rem'>
          <Text fontSize={'4xl'}  my={7} color={'#0058b4'}>our best sellers</Text>
          <Flex flexDirection={'column'}
                    height={'100vh'}     
                         >
               <SimpleGrid spacing='40px' px='4' width={'full'} autoColumns={'max-content'} overflowX={'hidden'} minChildWidth={'190px'}>
               {giginfos && giginfos?.map((data) => (
                    <Cardsfreelance data={data} key={data.gigID} height='150px'  />
               ))}
               </SimpleGrid>
               </Flex>
               </Box>
     )
}

export default Body2;