import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import store from 'store';

import { API_URL } from './AppConfig';
import Home from './Components/Home';
import LoginForm from './Components/LoginForm';
import Banner from './Components/Banner';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: store.get('token') || null
    };
    this.setToken = this.setToken.bind(this);
  }

  setToken(token) {
    store.set('token', token);
    this.setState({ token });
  }

  render() {
    const { match, mealList, ingredientList } = this.props;
    const { token } = this.state;
    return (
      <div>
        <Banner />
        <div
          style={{
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          <Router>
            <Switch>
              <Route
                exact
                path="/login"
                render={props =>
                  token
                    ? <Redirect to="/" />
                    : <LoginForm setToken={this.setToken} {...props} />}
              />
              <Route
                path="/"
                render={match =>
                  token
                    ? <Home
                        mealList={mealList}
                        ingredientList={ingredientList}
                      />
                    : <Redirect to="/login" />}
              />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}
export default App;
