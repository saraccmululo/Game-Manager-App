import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import CreateGame from './pages/CreateGame'
import UpdateGame from './pages/UpdateGame'
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar'

function App() {
  

  return (
    <div>
      <NavBar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create" element={<CreateGame />}/>
      <Route path="/update/:id" element={<UpdateGame />}/>
      <Route path="*" element={<NotFound />}/>
     </Routes>
    </div>
  )
}

export default App
