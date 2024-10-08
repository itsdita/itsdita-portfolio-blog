import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './pages/navbar/Navbar'
import {Blog, Home} from './pages'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/blog',
    element: <Blog />
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
