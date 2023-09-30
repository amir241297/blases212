import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const initialState = {
    name: "",
    description: "",
    price: "",
    image: ""
}

const EditData = (data) => {
    const location = useLocation()
    const [state, setState] = useState(location.state || initialState)
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(state)
 
        fetch(`http://localhost:3000/admin/editData/${state._id}`, {
            method: "PATCH",
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => { 
                console.log(res)
                alert("Product Updated!")
             })
            .catch(err => {
                console.log(err)
            })
    }


    const { name, description, image, price } = state
    return (
        <div>
            <form>
                <h1>Edit Data</h1>
                <input value={name} type="text" name='name' placeholder='Name' onChange={handleChange} />
                <input value={description} type="text" name='description' placeholder='Description' onChange={handleChange} />
                <input value={price} type="number" name='price' placeholder='Price' onChange={handleChange} />
                <input value={image} type="url" name='image' placeholder='Image URL' onChange={handleChange} />
                <input type="Submit" value={"Edit"} onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default EditData