

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PageLayout from './components/PageLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import FriendList from './pages/FriendList'
import FriendRequests from './pages/FriendRequests'
import NotFound from './pages/NotFound'

import CheckAuth from './components/CheckAuth'
import { useDispatch, useSelector } from 'react-redux'

import { checkAuthentication } from './store/authStore/index'



const App = () => {


  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);




  return (

    <>

      <Router>

        <Routes>

          <Route path="/login" element={<CheckAuth isAuthenticated={isAuthenticated}>
            <Login />
          </CheckAuth>
          } />
          <Route path="/register" element={<CheckAuth isAuthenticated={isAuthenticated}>
            <Register />
          </CheckAuth>
          } />


          <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated}>
            <PageLayout />
          </CheckAuth>
          }>

            <Route path="" element={<Home />} />
            <Route path="/friend-list" element={<FriendList />} />
            <Route path="/friend-request" element={<FriendRequests />} />

          </Route>



          <Route path="*" element={<NotFound />} />




        </Routes>
      </Router>



    </>

  )
}

export default App