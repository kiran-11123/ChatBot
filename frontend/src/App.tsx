import './App.css'
import './index.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/home'
import { BrowserRouter , Routes , Route } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>

    <Routes>
       
       <Route path="/" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/home" element={<Home />} />

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
