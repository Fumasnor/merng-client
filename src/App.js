import {ApolloProvider} from '@apollo/client'
import {Route, BrowserRouter, Redirect } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './App.css';
import client from './ApolloProvider'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MenuBar from './components/MenuBar';
import {Container} from 'semantic-ui-react'

import {AuthProvider} from './context/auth'
import {AuthRoute} from './utils/AuthRoute'
import SinglePost from './pages/SinglePost'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Container>
          <MenuBar/>
          <Route exact path = "/" component = {Home}/>
          <AuthRoute exact path = "/register" component = {Register}/>
          <AuthRoute exact path = "/login" component = {Login}/>
          <Route exact path = "/posts/:postId" component = {SinglePost}/>
          <Redirect  to = '/'/>
        </Container>
      </ApolloProvider>
    </BrowserRouter>
    </AuthProvider>
   );
}

export default App;
