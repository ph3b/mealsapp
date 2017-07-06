import React from 'react';
import Autosuggest from 'react-autosuggest';

class IngredientInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.props.ingredientList.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
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
    const { pickedIngredients } = this.props;

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {suggestion.name}
        </div>
        <div>
          {pickedIngredients.includes(suggestion)
            ? <span style={{ color: 'rgb(0, 196, 159' }}>&#10004;</span>
            : null}
        </div>
      </div>
    );
  }

  onChange(value, { newValue }) {
    this.setState({ value: newValue });
  }

  onSuggestionSelected(value, { suggestion }) {
    this.setState({ value: '' });
    this.props.addIngredient(suggestion);
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

export default IngredientInput;
