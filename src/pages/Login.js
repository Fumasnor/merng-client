import React, {useState, useContext} from 'react'
import {Button, Form} from 'semantic-ui-react'
import {gql, useMutation} from '@apollo/client'

import {useFormHook} from '../utils/useFormHook'
import {AuthContext} from '../context/auth'

export default function Login(props) {
    
    const {login} = useContext(AuthContext)

    const initialState = {username: '', password: ''}

    const {values, onChange, onSubmit} = useFormHook(logUser, initialState)

    const [errors, setErrors] = useState({})

    const LOGIN_USER = gql`
    mutation loginUser(
        $username: String!
        $password: String!
    ){
        loginUser(
            username: $username
            password: $password
            )
    {
        id token username email createdAt
    }
    }`

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {loginUser: userData}}){
            login(userData)
            props.history.push('/')
        },
        variables:values,
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors)
        }
    })

    function logUser() {
        loginUser()
    }

    return (
        <div className='form-container'>
        <Form noValidate onSubmit = {onSubmit} className={loading? "loading": ""}>
        <Form.Input 
        label='Enter Username' 
        type='text' 
        value={values.username}
        name='username'
        onChange={onChange}
        error={errors.username ? true : false}
        />

        <Form.Input 
        label='Enter Password' 
        type='password' 
        value={values.password}
        name='password'
        onChange={onChange}
        error={errors.password ? true : false}
        />
        <Button type='submit'>Submit</Button>
        </Form>
        {Object.keys(errors).length > 0 && 
            <div className="ui error message">
            <ul>
             {Object.values(errors).map(error => 
                 <li key={error}> {error} </li>
                 )}
             </ul> 
             </div>
        }
    </div>
    )
}

