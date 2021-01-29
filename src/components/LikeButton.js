import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Button, Label, Icon} from 'semantic-ui-react'
import {useMutation, gql} from '@apollo/client'

import PopupComponent from '../utils/Popup'

export default function LikeButton({post: {id, likes, likeCount}, user}) {
    
    const [liked, setLiked] = useState(false)
    
    useEffect(() => {
        if(user && likes.find(like=> like.username === user.username)){
            setLiked(true)
        }else{
            setLiked(false)
        }
        
    }, [user, likes])
    
    const [addLike] = useMutation(LIKE_POST, {
        variables:{postId: id}
    })

    console.log(likes)
    const button = user ? (
    liked ? (
        <Button color ="red">
        <Icon name = "heart"/>
        </Button>
        ) : (
        <Button basic color ="red">
        <Icon  name = "heart"/>
        </Button>
        )
        ) : (
        <Button basic color ="red" as = {Link} to='/login'> 
        <Icon basic name = "heart"/>
        </Button>) 
   
    return (
    <Button as='div' labelPosition='right' onClick={addLike}>
      <PopupComponent text = {liked ? 'Unlike' : 'Like'}>
      {button}
      </PopupComponent>
      <Label as='a' basic color='red' pointing='left'>
        {likeCount}
      </Label>
    </Button>
    )
}


const LIKE_POST = gql`
mutation addLike($postId: ID){
    addLike(postId: $postId){
        id
        likes{
            username
            createdAt
        }
        likeCount
    }
}
`