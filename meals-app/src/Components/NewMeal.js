import React from 'react';
import IngredientInput from './IngredientInput';
import IngredientList from './IngredientList';

class NewMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedIngredients: []
    };
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  addIngredient(ingredient) {
    this.setState({
      pickedIngredients: this.state.pickedIngredients.concat([ingredient])
    });
  }

  removeIngredient(ingredient) {
    this.setState({
      pickedIngredients: this.state.pickedIngredients.filter(
        i => i !== ingredient
      )
    });
  }

  render() {
    const { pickedIngredients } = this.state;

    return (
      <div>
        <IngredientInput
          ingredientList={this.props.ingredientList}
          addIngredient={this.addIngredient}
        />
        {pickedIngredients.length > 0 &&
          <IngredientList
            removeIngredient={this.removeIngredient}
            ingredientList={this.state.pickedIngredients}
          />}
      </div>
    );
  }
}

export default NewMeal;
