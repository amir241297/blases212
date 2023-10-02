import React, { createContext, useReducer } from 'react'
export const AuthContext = createContext()

const initialState = {
    isAuth: false,
    userType: "",
    token: "",
    toggle: true,
    cart_data:[]
}
const reducer = (state = initialState, action) => {
    const { type, payload } = action
    console.log(type,payload)
    switch (type) {
        case "User":
            return { ...state, userType: "User", isAuth: true, token: payload };
        case "Admin":
            return { ...state, userType: "Admin", token: payload, isAuth: true };
        case "TOGGLE": return { ...state, toggle: payload }

        case "ADD_TO_CART" : return {...state,cart_data:[...state.cart_data,payload]}

        default:
            return state;
    }
    console.log(initialState)
}

const AuthContextProvider = ({ children }) => {

    const [reducerstate, dispatch] = useReducer(reducer, initialState)

    const value = { reducerstate, dispatch }
    return (
        <div>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthContextProvider
