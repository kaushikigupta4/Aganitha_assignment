
import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'

import MoodRecipes from './components/MoodRecipes'
import Navbar from './components/Navbar'
import SearchByIngredient from './components/SearchByIngredient'
import QuickMealsSection from './components/QuickMealsSection'

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
    <div className='text-red-800'>
      <Navbar onSearch={setSearchQuery}/>
      <HeroSection/>
      <SearchByIngredient/>
      <MoodRecipes/>
      <QuickMealsSection/>
      <Footer/>
    </div>
    
    </>
  )
}

export default App
