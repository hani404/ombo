import { position } from '@chakra-ui/react'
import React from 'react'
import Body1 from './componenet/Body1'
import Body2 from './componenet/Body2'
import Nav from './componenet/Nav'



export function Home(){
  return (
    <div>
        <Nav/>
        <Body1/>
        <Body2/>
    </div>
  )
}

export default Home
