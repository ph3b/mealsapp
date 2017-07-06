import React from 'react';
import { Route } from 'react-router-dom';
import { Motion, spring } from 'react-motion';

import MenuBar from './MenuBar';
import MealList from './MealList';
import NewMeal from './NewMeal';

const Home = ({ match, mealList, ingredientList }) =>
  <div>
    <Route path="/:page?" component={MenuBar} />
    <Route
      exact
      path="/newmeal"
      render={match =>
        <div style={{ marginBottom: '50px' }}>
          <NewMeal match={match} ingredientList={ingredientList} />
        </div>}
    />
    <Route
      path="/"
      exact
      render={() => <MealList match={match} mealList={mealList} />}
    />
  </div>;

export default Home;
