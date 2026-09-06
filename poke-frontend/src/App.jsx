import { useState } from 'react'
import Home from './Components/Home'
import RandomMon from './Components/RandomMon'
import Ability from './Components/Ability'
import Moves from './Components/Moves'
import Teambuilder from './Components/Teambuilder'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/random-pokemon" element={<RandomMon />} />
        <Route path="/random-ability" element={<Ability />} />
        <Route path="/random-move" element={<Moves />} />
        <Route path="/teambuilder" element={<Teambuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

