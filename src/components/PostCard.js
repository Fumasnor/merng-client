import React,{useContext} from 'react'
import {Card, Image, Button, Label, Icon} from 'semantic-ui-react'
import moment from 'moment'
import {Link} from 'react-router-dom'

import {AuthContext} from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import PopupComponent from '../utils/Popup'

export default function  PostCard({post: {id, username, body, createdAt, likes, likeCount, comments, commentCount}}) {
    
    const {user} = useContext(AuthContext)

    return (<Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='/favicon.ico'
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
          <Card.Description>
            {body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <div>
    <LikeButton post = {{likeCount, likes, id}} user = {user}/>
    
    <Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`} >
    <PopupComponent text = 'Comments'>
      <Button basic color='blue'>
        <Icon name='comments' />
      </Button>
      </PopupComponent>
      <Label  basic color='blue' pointing='left'>
      {commentCount}
      </Label>
    </Button>
    
    
    {user && user.username === username && <DeleteButton postId = {id}/>}
  </div>
        </Card.Content>
      </Card>)
}