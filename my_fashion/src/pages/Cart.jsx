import React, { useContext, useState } from 'react'
import { AuthContext } from '../AuthContextProvider'
import '../styles/cart.css'

const Cart = () => {
  const { reducerstate } = useContext(AuthContext)
  const [data,setData]=useState(reducerstate.cart_data || [])
  const [count,setCount]=useState(1)
  console.log(data)


  const removeData=(id)=>{
    const newData=data.filter((ele)=>{
      return ele._id!==id
    })
    // console.log("Updated data",newData)
    setData(newData)
  }
  const handleBuy=()=>{
    alert("Need some data...")
  }

  return (
    <div id='cart_div'>
      <h1>Cart Page</h1>
      {
        data.map((ele)=>(
          <div key={ele._id}>
            <img src={ele.image} alt="" />
            <div className='price_div'>
              <h4>Price: {ele.price}</h4>
              <h4>Brand: {ele.name}</h4> 
              
              <button onClick={handleBuy}>BUY</button>
              <button onClick={()=>removeData(ele._id)}>Remove</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Cart