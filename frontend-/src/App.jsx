import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes, Route } from "react-router-dom"
import './App.css'
import Layout from './Layout.jsx'
import LoginPage from './cover_page.jsx'
import Home from './home.jsx'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />}/>
          <Route path='login' element={<LoginPage/>}/>
        </Route>
      </Routes>
  )
}


export default App