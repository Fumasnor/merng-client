import React, {useContext} from 'react'
import {useQuery} from '@apollo/client'
import {Grid, Transition} from 'semantic-ui-react'


import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import QUERY_POSTS from '../utils/queryPost'
import {AuthContext} from '../context/auth'

export default function Home() {
    
    const {user} = useContext(AuthContext)
    const res = useQuery(QUERY_POSTS)
    if (res.error) {
        return (<h1>Error: {res.error.message}</h1>)
    }
    if (res.loading){
        return (<h1> Posts are loading. Please wait.</h1>)
    }
    return (
            <Grid columns={3} divided>
            <Grid.Row className = 'header-home'>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
            {user && <Grid.Column>
              <PostForm/>
            </Grid.Column>}
            <Transition.Group>{res.data.queryPosts && res.data.queryPosts.map(post =>
            (<Grid.Column key={post.id} style={{marginBottom: 20}} >
                <PostCard post={post} />
              </Grid.Column>
            ))}
            </Transition.Group>

            </Grid.Row>
          </Grid>
        )
}
    
        




