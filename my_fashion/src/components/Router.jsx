import React, { useContext } from 'react'
import { Home } from '../pages/Home'
import Login from '../pages/Login'
import CreateAccount from '../pages/CreateAccount'
import { Route, Routes } from 'react-router-dom'
import Cart from '../pages/Cart'
import AdmitPanel from '../pages/AdmitPanel'
import EditData from '../pages/EditData'
import { PrivateRoute } from './Authentication'
import { AuthContext } from '../AuthContextProvider'

const Router = () => {
  const { reducerstate } = useContext(AuthContext)
  console.log(reducerstate.userType)
  if (reducerstate.userType === "Admin") {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<CreateAccount />}></Route>
          <Route path='/cart' element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }></Route>
          <Route path='/adminPanel' element={<AdmitPanel />}></Route>
          <Route path='/editData' element={<EditData />}></Route>
          <Route path='/moreInfo/:id'></Route>
        </Routes>
      </div>
    )
  } else {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<CreateAccount />}></Route>
          <Route path='/cart' element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }></Route>
          <Route path='/moreInfo/:id'></Route>
        </Routes>
      </div>
    )
  }

}

export default Router