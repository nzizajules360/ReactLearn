import React from 'react'
// import { Motion } from  'framer-motion/react'
import Navbar from './components/Navbar.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NotFound from './components/NotFound.jsx'
import Footer from './components/Footer.jsx'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'


function App() {
  

  return (
    <>
    <Navbar />
     <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
    <Footer/>
      </>
  )
}

export default App
