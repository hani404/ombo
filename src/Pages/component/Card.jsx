import React from 'react'
import './main.css'

export default function Card({img , h2 , p}) {
  return (
    <div>
                          <img src={img} alt="" />
                          <div className="text">
                          <h2>{h2}</h2>
                          <p>{p}</p>
                          </div>
    </div>
  )
}
