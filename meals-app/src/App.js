import './App.css';
import React, { Component } from 'react';

import MenuBar from './Components/MenuBar';
import Banner from './Components/Banner';
import MealList from './Components/MealList';
import MealForm from './Components/MealForm';

class App extends Component {
  render() {
    return (
      <div>
        <Banner />
        <div
          style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <MenuBar />
          <MealForm />
          <MealList mealList={this.props.mealList} />
        </div>
      </div>
    );
  }
}

export default App;
