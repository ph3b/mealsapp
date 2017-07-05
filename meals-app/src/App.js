import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import MenuBar from './Components/MenuBar';
import Banner from './Components/Banner';
import MealList from './Components/MealList';
import NewMeal from './Components/NewMeal';

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <div>
        <Banner />
        <div
          style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <Router>
            <div>
              <Route path="/:page?" component={MenuBar} />
              <Route
                exact
                path="/newmeal"
                render={match =>
                  <div style={{ marginBottom: '50px' }}>
                    <NewMeal
                      match={match}
                      ingredientList={this.props.ingredientList}
                    />
                  </div>}
              />
              <Route
                path="/"
                exact
                render={() =>
                  <MealList match={match} mealList={this.props.mealList} />}
              />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
