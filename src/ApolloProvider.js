import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/'
})



const authLink = setContext((_, {headers})=>{
    const token = localStorage.getItem('jwtToken')
    return{
        headers:{
            ...headers,
            authorization: token ? `Bearer ${token}` : '' 
        }
    }
}
)

export default new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})
