import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './output.css'
import {Button} from './components/ui/button'
import {Checkbox} from './components/ui/checkbox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-red'>Hello Test</h1>
      <Button>Yelow</Button>
      <Checkbox />
    </>
  )
}

export default App
