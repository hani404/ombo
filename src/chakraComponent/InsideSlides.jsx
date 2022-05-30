import React from 'react'

function InsideSlides(imgUrl ,text1, text2 ) {
  return (
    <div style={{
        heght:"80%",
        width: "10%",
        img: {imgUrl},
    }}>    
    <h2>{text1}</h2>
    <h3>{text2}</h3>
    </div>
  )
}

export default InsideSlides
