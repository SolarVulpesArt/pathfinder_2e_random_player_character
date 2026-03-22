import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import pf2_logo from './assets/pf2_logo.png'
import './App.css'
import Generator from './Generator'


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
    </>
  )
}

export default App
