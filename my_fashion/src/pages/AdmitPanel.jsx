import React, { useState } from 'react'

const initialState = {
    name: "",
    description: "",
    price: "",
    image: "",
}

const AdmitPanel = () => {
    const [state, setState] = useState(initialState)

    const addData=()=>{
        // localhost:3000/admin/addData
        fetch("http://localhost:3000/admin/addData", {
                method: "POST",
                body: JSON.stringify(state),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res=>res.json())
            .then(res=>{console.log(res); alert("Product Added!")})
            .catch(err=>{
                console.log(err)
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        addData(state)
    }
    return (
        <div>
            <form>
                <h1>Add Data</h1>
                <input type="text" name='name' placeholder='Name' onChange={handleChange} />
                <input type="text" name='description' placeholder='Description' onChange={handleChange} />
                <input type="number" name='price' placeholder='Price' onChange={handleChange} />
                <input type="url" name='image' placeholder='Image URL' onChange={handleChange} />
                <input type="Submit" value={"Add"} onClick={handleSubmit} />
            </form>

        </div>
    )
}

export default AdmitPanel