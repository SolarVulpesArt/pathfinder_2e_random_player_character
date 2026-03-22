import { useState } from 'react'
import pf2_logo from './assets/pf2_logo.png'
import './App.css'
import Generator from './Generator.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <section id="center">
      <img src={pf2_logo} width="600" height="148" />
      <h1>Random Character Generator</h1>
    </section>
    
    <Generator />
    <section id="spacer"></section> 
    <h6>This website uses trademarks and/or copyrights owned by Paizo Inc., used under Paizo's Community Use Policy (paizo.com/licenses/communityuse). We are expressly prohibited from charging you to use or access this content. This website is not published, endorsed, or specifically approved by Paizo. For more information about Paizo Inc. and Paizo products, visit paizo.com.</h6>
    </>
  )
}

export default App
