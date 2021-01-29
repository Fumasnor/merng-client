import React, {useContext, useRef} from 'react'
import {gql, useQuery, useMutation} from '@apollo/client'
import {Card, Grid, Image, Icon, Label, Button, Form} from 'semantic-ui-react'
import moment from 'moment'

import LikeButton from '../components/LikeButton'
import {AuthContext} from '../context/auth'
import DeleteButton from '../components/DeleteButton'
import {useFormHook} from '../utils/useFormHook'
import PopupComponent from '../utils/Popup'

export default function SinglePost(props) {

    const QUERY_POST = gql`
    query queryPost($postId: ID!) {
        queryPost(postId: $postId){
            id
            username 
            body 
            likes{
                id 
                username 
                createdAt
                } 
            likeCount 
            comments{
                id 
                username 
                body 
                createdAt
                } 
            commentCount 
            createdAt
            }
        }
    `

    const ADD_COMMENT = gql`
        mutation($postId:ID!, $body: String!){
            addComment(postId:$postId, body:$body){
                id
                comments{
                    username
                    body
                    createdAt
                }
                commentCount
            }
        }
    `
   
    const postId = props.match.params.postId;

    const {values, onChange, onSubmit} = useFormHook(addCom, {comment:''})

    function deletePostCallback(){
        props.history.push('/')
    }

    const inputReference = useRef()
    const {user} = useContext(AuthContext)
    const res = useQuery(QUERY_POST, {
        variables: {postId}
    })
    
    const [addComment] = useMutation(ADD_COMMENT,{
        update(){
            values.comment = ''
            inputReference.current.blur()
        },
        variables:{
            postId,
            body: values.comment
        }
    })

    function addCom(){
        addComment()
    }

    if(res.loading){
        return (<h1>The page is loading. Please wait!</h1>)
    }
    if(res.error){
        return (<h1>Error message: {res.error.message}</h1>)
    }
    const {id, body, username, createdAt, likes, likeCount, comments, commentCount} = res.data.queryPost
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width = {2}>
                    <Image 
                    src = '/favicon.ico'
                    float = 'right'
                    size = 'small'/>
                </Grid.Column>
                <Grid.Column width = {14}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <hr/>
                        <Card.Content extra>
                            <LikeButton post = {{id, likes, likeCount}} user = {user}/>
                            <Button as = 'div' labelPosition = "right">
                            <PopupComponent text = 'Comments'>
                                <Button basic color = "blue">
                                    <Icon name = "comments"/>
                                </Button>
                            </PopupComponent>
                                <Label basic color = "blue" pointing = "left">
                                    {commentCount}
                                </Label>
                            </Button>
                            {user && user.username === username && <DeleteButton postId = {id} callback = {deletePostCallback}/>}
                        </Card.Content>
                    </Card>
                    {user && (
                        <Card fluid>
                            <Card.Content>
                            <h1>Add a comment</h1>
                            <Form onSubmit = {onSubmit}>
                            <div className ="ui action input fluid">
                                    <input
                                    type="text"
                                    placeholder="type your comment here"
                                    name="comment"
                                    value={values.comment}
                                    onChange = {onChange}
                                    ref={inputReference}
                                    />
                                    <button type = "submit"
                                     className="ui button blue"
                                     disabled={()=>values.comment.trim()===''}
                                     >
                                        Add 
                                    </button>
                                </div>
                            </Form>
                            </Card.Content>
                        </Card>
                    )}
                    {comments && comments.map(comment => 
                        (<Card fluid>
                            <Card.Content>

                            {user && user.username === comment.username && 
                                <DeleteButton postId = {id} commentId = {comment.id}/>}
                                <Card.Header>{comment.username}</Card.Header>
                                <Card.Meta>{moment(comment.createdAt).fromNow(true)}</Card.Meta>
                                <Card.Description>{comment.body}</Card.Description>
                                
                            </Card.Content>
                        </Card>))}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

