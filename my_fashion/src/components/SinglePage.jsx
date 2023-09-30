import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContextProvider'

const SinglePage = (data) => {

  const navigate = useNavigate()


  const { reducerstate,dispatch } = useContext(AuthContext)

  const AddDataToCart = (ele) => {
    dispatch({type:"ADD_TO_CART",payload:ele})
  }

  const editProduct = (data) => {
    //  console.log("edit", data)
    navigate("/editData", { state: data })
  }
  const deleteProduct = (data) => {
    console.log("delete", data._id)
    let _id = data._id
    fetch(`http://localhost:3000/admin/deleteData/${_id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        alert("Product Deleted!")
        dispatch({type:"TOGGLE"})
      })
      .catch(err => {
        console.log(err)
      })
  }

  const { image, price, description, name } = data
  return (
    <div>
      <img src={image} alt="" />
      <h3>{name}</h3>
      <h3>Price: {price}</h3>
      <p>{description}</p>
      <div>
        {
          reducerstate.userType === "Admin" ? (
            <>
              <button onClick={() => AddDataToCart(data)}>Add To cart</button>
              <button onClick={() => editProduct(data)}>Edit</button>
              <button onClick={() => deleteProduct(data)}>Delete</button>
            </>
          ) : (
            <button onClick={() => AddDataToCart(data)}>Add To cart</button>
          )
        }

      </div>
    </div>
  )
}

export default SinglePage