import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthContextProvider'
import "../styles/navbar.css"

const Navbar = () => {
  const {reducerstate}=useContext(AuthContext)
  if(reducerstate.userType=="Admin"){
    return (
      <div className='Navbar_Parent_div'>
          <Link to={'/'}>Home</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/signup'}>SignUp</Link>
          <Link to={'/cart'}>Cart</Link>
          <Link to={'/adminPanel'}>Add Data</Link>
      </div>
    )
  }else{
    return (
      <div className='Navbar_Parent_div'>
          <Link to={'/'}>Home</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/signup'}>SignUp</Link>
          <Link to={'/cart'}>Cart</Link>
      </div>
    )
  }
  
}

export default Navbar