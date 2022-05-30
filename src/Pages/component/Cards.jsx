import React from 'react'
import './main.css'
import img1 from './imgs/signup.png'
import img2 from './imgs/deliver.png'
import img3 from './imgs/paid.png'
import Card from './Card'

export default function Cards() {
  return (
    <div>
      <div className="main2">
                    <div >
                  <ul>
                      <li className='card'>
                        <Card
                        img={img1}
                        h2="1. Creat a Gig"
                        p="Sign up for free, set up your Gig, and offer your work to our global audience."
                        />
                      </li>
                      <li className='card'>
                        <Card
                        img={img2} 
                        h2="2. Deliver Great Work"
                        p = "Get notified when you get an order and use our system to discuss details with customers."
                        />
                     </li>
                 </ul>
                  <div id='bottom-part' className='card'>
                      <Card
                          img={img3}
                          h2="3. Get Paid"
                          p="Get paid on time, every time. Payment is transferred to you upon order completion."
                       />
                  </div>    
                </div>
             </div>

    </div>
  )
}
