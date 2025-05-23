import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateGame from './pages/CreateGame'
import UpdateGame from './pages/UpdateGame'
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar'
import { useThemeStore } from './store/useThemeStore'

function App() {
  const{ theme } =useThemeStore();

  useEffect(()=> {
    document.documentElement.classList.remove("light-mode", "dark-mode")
    document.documentElement.classList.add(`${theme}-mode`)
  }, [theme])

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
