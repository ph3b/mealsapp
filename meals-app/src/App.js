import './App.css';
import React, { Component } from 'react';

import MenuBar from './Components/MenuBar';
import Banner from './Components/Banner';
import MealList from './Components/MealList';
import NewMeal from './Components/NewMeal';

class App extends Component {
  render() {
    return (
      <div>
        <Banner />
        <div
          style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <MenuBar />
          <div style={{ marginBottom: '50px' }}>
            <NewMeal ingredientList={this.props.ingredientList} />
          </div>
          <MealList mealList={this.props.mealList} />
        </div>
      </div>
    );
  }
}

export default App;
