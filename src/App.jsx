import { useState } from 'react'
import './App.css'
import Weather from './components/Weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='weather-app'>
        <Weather />
      </div>
    </>
  )
}

export default App
