import react , {useState ,useEffect, useRef} from 'react'
import { db } from '../Pages/component/firebaseConfig/Firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import './body2.css'




export function Body2(){


const [gigresult , setGigResult] = useState([])

const getData = async () => {   
   const gigref = db.collection("gig")
   const snapshot = await gigref.get()
  await snapshot.forEach(doc=>{
       setGigResult((prev)=>{
          return [...prev , doc.data()];
       })
   })
}

useEffect(()=>{
  getData();
},[])

console.log(gigresult[0]);


     return (
         <>
         <h1>anything</h1>
        {gigresult.map((gigs) => (

            <div>
                <img src="" alt="" />
                <div>
                   <h2>{gigs.gigTitle}</h2>
                   <p>{gigs.Descriprion}</p>
                </div>
            </div>

        ))} 

         
          </>
     )
}

export default Body2;