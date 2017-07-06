import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Home from './Components/Home';
import LoginForm from './Components/LoginForm';
import Banner from './Components/Banner';

const IS_LOGGED_IN = true;

const App = ({ match, mealList, ingredientList }) =>
  <div>
    <Banner />
    <div style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route
            path="/"
            render={match =>
              IS_LOGGED_IN
                ? <Home mealList={mealList} ingredientList={ingredientList} />
                : <Redirect to="/login" />}
          />
        </Switch>
      </Router>
    </div>
  </div>;
export default App;
