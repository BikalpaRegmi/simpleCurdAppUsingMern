import React from 'react'
import {Routes , Route} from 'react-router-dom'
import {Home} from './pages/home'
import {Readuser} from './pages/readuser'
import Update from './updateUser/Update'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/read/:id' Component={Readuser}/>
        <Route path='/update/:id' Component={Update}/>
      </Routes>
    </div>
  )
}

export default App
