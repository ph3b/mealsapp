import React from 'react';
import Autosuggest from 'react-autosuggest';

const suggestions = [
  { name: 'Korn' },
  { name: 'Melk' },
  { name: 'Brus' },
  { name: 'Mel' }
];

class MealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Hei!',
      selectedIngredient: null,
      suggestions: [],
      ingredients: []
    };
  }

  onSuggestionsFetchRequested({ value }) {
    console.log(value);
    this.setState({
      suggestions: suggestions.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    });
  }

  didAddIngredient(ingredient) {
    this.setState({
      ingredients: this.state.ingredients.concat([ingredient])
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return (
      <div>
        {suggestion.name}
      </div>
    );
  }

  onChange(value, { newValue }) {
    this.setState({ value: newValue });
  }

  onSuggestionSelected(value, { suggestion }) {
    this.setState({
      selectedIngredient: suggestion
    });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value: value,
      onChange: this.onChange.bind(this),
      placeholder: 'Choose an ingredient'
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ margin: '30px', display: 'flex' }}>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionSelected={this.onSuggestionSelected.bind(this)}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(
                this
              )}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(
                this
              )}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
            <button
              onClick={this.didAddIngredient.bind}
              style={{
                height: '68px',
                border: 'none',
                marginLeft: '8px',
                padding: '0 25px',
                backgroundColor: '#88E391',
                borderRadius: '6px',
                color: 'white'
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  ingredientInput: {
    fontSize: '20px',
    fontWeight: '300',
    width: '300px',
    padding: '10px 15px',
    margin: '50px 0px',
    border: '6px solid #DADADA',
    borderRadius: '5px'
  }
};

export default MealForm;
