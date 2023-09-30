import React, { useState } from 'react'
import '../styles/account.css'

const initialState = {
    name: "",
    email: "",
    password: "",
}
const CreateAccount = () => {
    const [state, setState] = useState(initialState)
    const handleChange = (e) => {
        const { name, value } = e.target

        // console.log(name,value)
        setState({ ...state, [name]: value })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const {name,email,password}=state
        let accout_data={name,email,password}
        // console.log(accout_data,state.userType)
        // state.userType=="admin"?console.log(state.userType):console.log(state.userType)
        if (state.userType === "admin") {
            fetch("http://localhost:3000/admin/adminRegistration", {
                method: "POST",
                body: JSON.stringify(accout_data),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res=>res.json())
            .then(res=>{console.log(res)})
            .catch(err=>{
                console.log(err)
            })

        } else if (state.userType === "user") {
            fetch("http://localhost:3000/user/createAccount", {
                method: "POST",
                body: JSON.stringify(accout_data),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res=>res.json())
            .then(res=>{console.log(res)})
            .catch(err=>{console.log(err)})

        } else {
            alert("Please Select User Type!")
        }
    }
    return (
        <div>
            <form>
                <h1>Create Account</h1>
                <div id='userTypeDiv'>
                    <div>
                        <h4>Admin</h4>
                        <input type="radio" name='userType' value={"admin"} onChange={handleChange} />
                    </div>
                    <div>
                        <h4>User</h4>
                        <input type="radio" name='userType' value={"user"} onChange={handleChange} />
                    </div>
                </div>
                <input type="text" placeholder='Name' name={"name"} onChange={(e) => handleChange(e)} />
                <input type="text" placeholder='Email Id' name={"email"} onChange={handleChange} />
                <input type="password" placeholder='Password' name={"password"} onChange={handleChange} />
                <input type="submit" className='BUTTON' onClick={handleSubmit} value={"Sign Up"} />
            </form>
        </div>
    )
}

export default CreateAccount