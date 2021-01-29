import React, {useState, useContext} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {gql, useMutation} from '@apollo/client'

import {useFormHook} from '../utils/useFormHook'
import {AuthContext} from '../context/auth'

export default function Register(props) {
    const initialState = {
        username : '',
        email : '',
        password : '',
        confirmPassword : ''
    }

    const {login} = useContext(AuthContext)

    const {values, onChange, onSubmit} = useFormHook(regUser, initialState)

    const [errors, setErrors] = useState ({})
    
    const CREATE_USER = gql`
    mutation registerUser(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!) {
            registerUser(inputUser:{
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            })
            {id email username createdAt token}
        }
    `
    
    

    const [registerUser, {loading}] = useMutation(CREATE_USER, {
        update(_, {data: {registerUser: userData}}) {
            login(userData)
        }, 
        variables: values,
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0].extensions.errors)
        }  
    })
    
    function regUser () {
        registerUser()
    }

    return (
        <div className ="form-container">
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
        label='Enter Email' 
        type='email' 
        value={values.email}
        name='email'
        onChange={onChange}
        error={errors.email ? true : false}
        />
        <Form.Input 
        label='Enter Password' 
        type='password' 
        value={values.password}
        name='password'
        onChange={onChange}
        error={errors.password ? true : false}
        />
        <Form.Input 
        label='Confirm Password' 
        type='password' 
        value={values.confirmPassword}
        name='confirmPassword'
        onChange={onChange}
        error={errors.confirmPassword ? true : false}
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


