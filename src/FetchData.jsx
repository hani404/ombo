import { db   } from "./Pages/component/firebaseConfig/Firebase";
import {  arrayUnion, collection, deleteDoc , doc, addDoc, getDocs, onSnapshot, query, updateDoc, where, getDoc, setDoc   } from "firebase/firestore";



export const deleteGig = async (db, GigId) => {
    await deleteDoc(doc(db, "gig", GigId));
  };

export const listGigId = async (id , gigsid) => {
  const userRef = doc(db, 'users', id);
  updateDoc(userRef , {gigIds : arrayUnion(gigsid)})

}

export const allGigForUser = async (db , gigid , setFetch , fetch ) =>{

const Query = query(collection(db, 'gig'), where('gigID', '==', gigid));
const queysnapshot = await getDocs(Query);

queysnapshot.forEach((doc) => fetch.push({ ...doc.data(), id :doc.gigis}));
setFetch(fetch)  
}


export const hirefreelance = async (db , freelanceid , clientid , gigid , paymentMethode , packag , gigimage , gigtitle ,gigprice , freelanncername) =>{
  const contractid = `${Date.now()}` + ''
  const res = await setDoc(doc(db,'contract',contractid),{
    contractid : contractid ,
    freelancerid : freelanceid,
    clientid: clientid,
    gigid : gigid,
    paymentMethode : paymentMethode,
    package : packag,
    gigimage: gigimage,
    gigtitle : gigtitle,
    gigprice : gigprice ,
    freelanncername :freelanncername
  });


  const freelancerRef = doc(db, 'users', freelanceid);
  updateDoc(freelancerRef , {contractid : arrayUnion(contractid)})

  const clientRef = doc(db, 'users', clientid);
  updateDoc(clientRef , {contractid : arrayUnion(contractid)})
}

export const findcontract = async (db  , userid , useState) => {
  const contractIds = null
  const contractIdsRef = await getDoc(doc(db , "users" , userid))

  if(contractIdsRef.exists() && contractIdsRef.data().contractid){
  const citiesRef = collection(db, "contract");
  const q = query(citiesRef, where("contractid", 'in', contractIdsRef.data().contractid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    useState(prev => [...prev , doc.data()]);
  });
}


}