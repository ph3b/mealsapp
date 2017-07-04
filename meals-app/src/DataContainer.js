import React from 'react';
import App from './App.js';

const mealList = [
  {
    name: 'Overnight oats',
    type: 'Breakfast',
    kcal: 510,
    fat: 16,
    proteins: 26,
    carbs: 60
  },
  {
    name: 'Overnight oats',
    type: 'Breakfast',
    kcal: 510,
    fat: 16,
    proteins: 26,
    carbs: 60
  },
  {
    name: 'Overnight oats',
    type: 'Breakfast',
    kcal: 510,
    fat: 16,
    proteins: 26,
    carbs: 60
  },
  {
    name: 'Overnight oats',
    type: 'Breakfast',
    kcal: 510,
    fat: 16,
    proteins: 26,
    carbs: 60
  },
  {
    name: 'Overnight oats',
    type: 'Breakfast',
    kcal: 510,
    fat: 16,
    proteins: 26,
    carbs: 60
  }
];

class DataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: mealList,
      showMealForm: true,
      showIngredientForm: false
    };
  }

  render() {
    const { meals, showMealForm, showIngredientForm } = this.state;
    return (
      <App
        mealList={meals}
        showMealForm={showMealForm}
        showIngredientForm={showIngredientForm}
      />
    );
  }
}

export default DataContainer;
