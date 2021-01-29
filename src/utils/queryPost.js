import {gql} from '@apollo/client' 

const QUERY_POSTS = gql`
    query queryPosts{
  queryPosts{
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

export default QUERY_POSTS