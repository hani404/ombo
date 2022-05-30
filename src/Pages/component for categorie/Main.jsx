import './main.css'
import img1 from './imgs/client-card.png'
import img2 from './imgs/freelancer-card.png'
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {BsCircle , BsCheckCircle} from 'react-icons/bs'

const CardClick = () => {
    
}


export default function Main() {


  function changecolorLeft() {

      document.querySelector('.colors-right').style.backgroundColor='white';
      document.querySelector('.colors-right > h3').style.color='#0058b4';

      document.querySelector('.colors-left').style.backgroundColor='#0058b4';
      document.querySelector('h3').style.color='white';
      document.querySelector('.client').style.display='initial';
      document.querySelector('.freelancer').style.display='none';
      document.querySelector('.white').style.display='none';
      document.querySelector('.not-choosedLeft').style.display='none';     
      document.querySelector('.choosedLeft').style.display='initial';
      document.querySelector('.not-choosedRight').style.display='initial';
      document.querySelector('.choosedRight').style.display='none';
    
   
  }

  function changecolorRight() {
    
   
      document.querySelector('.colors-left').style.backgroundColor='white';
      document.querySelector('.colors-left > h3').style.color='#0058b4';

      
      document.querySelector('.colors-right').style.backgroundColor='#0058b4';
      document.querySelector('.colors-right > h3').style.color='white';
      document.querySelector('.freelancer').style.display='initial';
      document.querySelector('.client').style.display='none';
      document.querySelector('.white').style.display='none';
      document.querySelector('.choosedRight').style.display='initial';
      document.querySelector('.not-choosedRight').style.display='none';
      document.querySelector('.not-choosedLeft').style.display='initial';
      document.querySelector('.choosedLeft').style.display='none';


    
 
  }


  return (
    <div id='main'  >
      <h1>Choose your categorie</h1>
      <div className="cards">
          <div className='insidecards colors-left' onClick={changecolorLeft}  > 
              <div id="check1">
                  <BsCheckCircle size ={25} className="checkCircle choosedLeft"/>
                  <BsCircle size={25} className="checkCircle not-choosedLeft"/>
              </div>
              <img src={img1} alt="img1" />
              <h3>i'm Link <span>Client</span> ready to hire <br /> for my projects</h3>
          </div>
          <div className='insidecards colors-right' onClick={changecolorRight} >
              <div id="check2">
                  <BsCheckCircle size ={25} className="checkCircle choosedRight"/>
                  <BsCircle size={25} className="checkCircle not-choosedRight"/>
              </div>
              <img src={img2} alt="img2" />
              <h3>i'm Link <span>Freelancer</span> ready for<br /> my first gig</h3>
          </div>
      </div>
      <div className="buttons">
         <Link className='white' to="#">Creat Account</Link> 
         <Link className='Blue freelancer' to="/Findwork">Join as Link Freelancer</Link>
         <Link className='Blue client' to="/Findtalent">Join as Link Client</Link>
      </div>
      <h4>Already have an account ? <Link to="">Log in</Link></h4>

    </div>
  )
}
