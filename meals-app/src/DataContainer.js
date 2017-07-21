import React from 'react';
import App from './App.js';

class DataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMealForm: true,
      showIngredientForm: false
    };
  }

  render() {
    const { showMealForm, showIngredientForm } = this.state;
    return (
      <App
        showMealForm={showMealForm}
        showIngredientForm={showIngredientForm}
      />
    );
  }
}

export default DataContainer;
