import { useState } from 'react'
import './index.css'
import { Goals } from './pages/Goals'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Goals className="m-8" />
    </>
  )
}

export default App
