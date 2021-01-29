import React, {useState} from 'react'
import {gql, useMutation} from '@apollo/client'
import {Button, Icon, Confirm} from 'semantic-ui-react'

import QUERY_POSTS from '../utils/queryPost'
import PopupComponent from '../utils/Popup'

export default function DeleteButton({postId, callback, commentId}) {
    
    const [openConfirm, setOpenConfirm] = useState(false)

    

    const DELETE_POST = gql`
    mutation ($postId: ID!){
        deletePost(postId: $postId)
    }
    `
    const DELETE_COMMENT = gql`
    mutation($postId: ID!, $commentId:ID!){
        deleteComment(postId: $postId, commentId: $commentId){
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
    const mutationType = commentId ? DELETE_COMMENT : DELETE_POST 

    const [deletePost] = useMutation(mutationType,{
        update(proxy){
            setOpenConfirm(false)
            if (!commentId) {
            const data = proxy.readQuery({query:QUERY_POSTS})
            proxy.writeQuery({query: QUERY_POSTS, data: {queryPosts: data.queryPosts.filter(post => post.id != postId)}})
            }
            if(callback) {
                callback()
            }
        },
        variables:{
            postId,
            commentId
        }
    })

    return (
        <>
    <PopupComponent text = {commentId ? 'Delete comment' : 'Delete post'}>
    <Button color = "red" floated="right" onClick={()=>setOpenConfirm(true)}>
    <Icon name = "trash" style = {{margin : 0}}/>
    </Button>
    </PopupComponent>

    <Confirm
    open={openConfirm}
    onCancel={()=>setOpenConfirm(false)}
    onConfirm= {deletePost}
    />
    </>
    )
}
