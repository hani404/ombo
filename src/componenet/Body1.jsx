import React  from 'react'
import './body1.css';
import { Link } from "react-router-dom";

export function  Body1 () {
  

    return (
        
        <div className="welcome">
            <div className="welcome-left">
                 <h1 id='text'>WELCOME to <br /><span className='ombo'>OMBO !</span></h1>
                 <h2 className='h2'>The first <span className='freelance'> freelance</span> website made <br />
                 for <span className='dz'>Algeriens !</span></h2>
                <h3 className='h3'>You got the SKILLS. <br />
                    And you want to start earning from it ?
                 </h3>
                 <div className="find-section">
                    <h3 className='h3'>Just click here !</h3>
                    <Link to='Findwork' className='find-btn'>Find Work</Link>
                 </div>
           </div>
           <div className="welcome-right">
               <h1>With great <span className='skills'>Skills</span> <br /> comes great <br /> <span className='oportunities'>Oportunities !</span></h1>
           </div>

        </div>  
        

    )
  
}

export default Body1; 
