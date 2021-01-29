import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: "https://boiling-taiga-89004.herokuapp.com/"
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
