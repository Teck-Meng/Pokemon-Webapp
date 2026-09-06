import { useState } from 'react'
import Home from './Components/Home'
import RandomMon from './Components/RandomMon'
import Ability from './Components/Ability'
import Moves from './Components/Moves'
import Teambuilder from './Components/Teambuilder'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState("Home")

  return (
    <>
      <Home></Home>
    </>
  )
}

export default App
