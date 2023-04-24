import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './components/Layout'
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import CreateBook from './pages/CreateBook';
import Profile from './pages/Profile';
import MyBooks from './pages/MyBooks';
import PrivateRoute from './PrivateRoutes';

function App() {
 
  return (
    <>
      <Layout>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/aboutus" element={<About/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/mybooks" element={<PrivateRoute> <MyBooks/> </PrivateRoute>}></Route>
        <Route path="/create" element={<PrivateRoute> <CreateBook/> </PrivateRoute>}></Route>
        <Route path="/edit/:id" element={<PrivateRoute> <CreateBook/> </PrivateRoute>}></Route>
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}></Route>
      </Routes>
      </Layout>
    </>
  )
}

export default App
