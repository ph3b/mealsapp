import React from 'react';
import App from './App.js';

const mealList = [
  {
    name: 'Overnight oats',
    type: 'Breakfast',
    kcal: 510,
    fat: 16,
    protein: 26,
    carbs: 60
  },
  {
    name: 'Overnight oats',
    type: 'Breakfast',
    kcal: 510,
    fat: 16,
    protein: 26,
    carbs: 60
  },
  {
    name: 'Overnight oats',
    type: 'Breakfast',
    kcal: 510,
    fat: 16,
    protein: 26,
    carbs: 60
  },
  {
    name: 'Overnight oats',
    type: 'Breakfast',
    kcal: 510,
    fat: 16,
    protein: 26,
    carbs: 60
  },
  {
    name: 'Overnight oats',
    type: 'Breakfast',
    kcal: 510,
    fat: 16,
    protein: 26,
    carbs: 60
  }
];
const ingredientList = [
  {
    name: 'Milk',
    kcal: 510,
    fat: 16,
    protein: 26,
    carbs: 60
  },
  {
    name: 'Chocolate',
    kcal: 510,
    fat: 16,
    protein: 26,
    carbs: 60
  },
  {
    name: 'Flour',
    kcal: 510,
    fat: 16,
    protein: 26,
    carbs: 60
  },
  {
    name: 'Bread',
    kcal: 510,
    fat: 16,
    protein: 26,
    carbs: 60
  },
  {
    name: 'Orange Juice',
    kcal: 510,
    fat: 16,
    protein: 26,
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
        ingredientList={ingredientList}
        showMealForm={showMealForm}
        showIngredientForm={showIngredientForm}
      />
    );
  }
}

export default DataContainer;
