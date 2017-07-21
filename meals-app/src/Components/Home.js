import React from 'react';
import { Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';
import store from 'store';

import MenuBar from './MenuBar';
import MealList from './MealList';
import NewMeal from './NewMeal';
import { API_URL } from '../AppConfig';

const Home = ({ match }) => {
  const client = new ApolloClient({
    networkInterface: createNetworkInterface({
      opts: {
        headers: {
          authorization: 'Token ' + store.get('token')
        }
      },
      uri: API_URL + '/graphql'
    })
  });

  return (
    <ApolloProvider client={client}>
      <div>
        <Route path="/:page?" component={MenuBar} />
        <Route
          exact
          path="/newmeal"
          render={match =>
            <div style={{ marginBottom: '50px' }}>
              <NewMeal match={match} />
            </div>}
        />
        <Route
          path="/"
          exact
          render={() => <MealList match={match} />}
        />
      </div>
    </ApolloProvider>
  );
};

export default Home;
