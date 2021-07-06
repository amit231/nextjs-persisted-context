import React, { useEffect } from 'react'
import Background from './style'



// 
function Home(props) {
  useEffect(() => {
    if (props.loggedin) {
      document.documentElement.style.setProperty('--main-color', 'grey');
    } else {
      document.documentElement.style.setProperty('--main-color', 'blue');
    }
  })
  return (
    <Background>
      {props.children}
    </Background>
  )
}


export default Home;