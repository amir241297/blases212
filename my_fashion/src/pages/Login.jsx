import { useContext } from 'react';
import { AuthContext } from '../AuthContextProvider';
import React, { useRef, useState } from 'react'
import { Navigate } from 'react-router-dom';
import '../styles/login.css'
const initialState = { email: "", password: "" }

const Login = () => {
    const [state, setState] = useState(initialState)

    const { reducerstate, dispatch } = useContext(AuthContext)
    console.log(reducerstate)

    if (reducerstate.isAuth) {
        return <Navigate to="/" />
        // console.log(isAuth)
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (state.userType === "admin") {
            fetch("http://localhost:3000/admin/adminLogin", {
                method: "POST",
                body: JSON.stringify(state),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(res => {
                    dispatch({ type: "Admin", payload: res.token })
                    console.log(reducerstate)

                })
                .catch(err => { console.log(err) })

        } else if (state.userType === "user") {
            fetch("http://localhost:3000/user/userLogin", {
                method: "POST",
                body: JSON.stringify(state),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    dispatch({ type: "User", payload: res.token })

                })
                .catch(err => { console.log(err) })

        } else {
            alert("Please Select User Type!")
        }

    }
    return (
        <div>
            <form>
                <h1>Log in</h1>
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
                <input type="mail" placeholder='Mail Id' name='email' onChange={handleChange} />
                <input type="password" placeholder='Password' name='password' onChange={handleChange} />
                <input className='BUTTON' type="submit" onClick={handleSubmit} value={"Log in"} />
            </form>
        </div>
    )
}

export default Login