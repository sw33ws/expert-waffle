import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Route>
          <Route exact path='/' element={ <SearchBooks /> }/>
          <Route exact path='/saved' element={ <SavedBooks /> }/>
          <Route path="*" element={ <h1 className='display-2'>Wrong page!</h1> }/>
          </Route>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
