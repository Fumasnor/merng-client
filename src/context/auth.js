
import React, {useReducer, createContext} from 'react'
import jwt_decode from 'jwt-decode'

const AuthContext = createContext()
const initialState = {user: null}

if (localStorage.getItem('jwtToken')){
    const decodedToken = jwt_decode(localStorage.getItem('jwtToken'))
    if(decodedToken.exp * 1000 < Date.now()){
        initialState.user = null
        localStorage.removeItem('jwtToken')        
    }
    else{
        initialState.user = decodedToken 
    }
}

function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        default:
            return state
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState)
    function login(userData){
        localStorage.setItem('jwtToken', userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout() {
        localStorage.removeItem('jwtToken')
        dispatch({type: 'LOGOUT'})
    }

    return <AuthContext.Provider value = {{user: state.user, login, logout}} {...props} />

}

export {AuthContext, AuthProvider}