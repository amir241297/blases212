import React, { useContext, useEffect, useState } from 'react'
import SinglePage from '../components/SinglePage'
import '../styles/home.css'
import { AuthContext } from '../AuthContextProvider'

export const Home = () => {
  const [data,setData]=useState([])
  const {reducerstate}=useContext(AuthContext)
  console.log(reducerstate.toggle)
  const fetchData = async() => {
    try {
      // localhost:3000/admin
      let res = await fetch('http://localhost:3000/admin/productsData')
      res=await res.json()
      setData(res)
      console.log("RESPONSE",res)
    } catch (err) {
      console.log("err", err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [reducerstate.toggle])
  console.log(data.length)
  return (
    <div id="home_parent_div">
      {
        data.map((ele)=>(
          <SinglePage key={ele._id} {...ele}/>
        ))
      }
    </div>
  )
}
