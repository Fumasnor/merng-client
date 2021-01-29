import React,{useState}  from 'react'
import {Form, Button} from 'semantic-ui-react'
import {useMutation, gql} from '@apollo/client'

import {useFormHook} from '../utils/useFormHook'
import QUERY_POSTS from '../utils/queryPost'

export default function PostForm() {
    const {values, onSubmit, onChange} = useFormHook(createP, {body: ''})
    const [errors, setErrors] = useState({})
    const CREATE_POST = gql`
        mutation createPost($body: String){
            createPost(body: $body){
                id 
                username
                body 
                likes{
                    username
                    createdAt
                }
                likeCount
                comments{
                    username
                    body
                    createdAt
                }
                commentCount
                createdAt
                }
        }
    `
    
    const [createPost] = useMutation(CREATE_POST, {
        update(proxy, result){
            const data = proxy.readQuery({query: QUERY_POSTS})
            proxy.writeQuery({query: QUERY_POSTS, data : {queryPosts: [...data.queryPosts, result.data.createPost ]}})
            values.body = ''
            setErrors({})            
        },
        variables: values,
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors)
            console.log(err)
        }
    })

    function createP(){
        createPost()
    }

    return (
        <>
        <Form onSubmit = {onSubmit}>
            <Form.Field>
                <Form.Input
                    name = 'body'
                    placeholder = 'post here'
                    onChange = {onChange}
                    type = "text"
                    value = {values.body}
                    error = {errors.body ? true: false}/>
                <Button type="submit" color="red">
                    Submit
                </Button> 
            </Form.Field>
        </Form>
        {Object.keys(errors).length > 0 && 
        <div className = "ui error message">
            <ul className = "list">
            {Object.values(errors).map(error => { 
               return <li key = {error}>{error}</li>
            })}
            </ul>
        </div> }
        
        </> 
    )
}
