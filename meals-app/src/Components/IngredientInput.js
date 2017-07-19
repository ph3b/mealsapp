import React from 'react';
import Autosuggest from 'react-autosuggest';
import { gql, graphql } from 'react-apollo';

class IngredientInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      enteredValue: '',
      allIngredients: [],
      suggestions: []
    };
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.state.allIngredients.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      ),
      enteredValue: value
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

  componentWillReceiveProps(nextProps) {
    if (this.state.suggestions.length === 0 && nextProps.data.allIngredients) {
      const allIngredients = nextProps.data.allIngredients.edges.map(
        edge => edge.node
      );
      this.setState({ allIngredients });
    }
  }

  renderSuggestion(suggestion) {
    const { pickedIngredients } = this.props;

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {suggestion.name}
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

    console.log(this.state);

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

IngredientInput.defaultProps = {
  data: {
    tasks: []
  }
};

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

const query = gql`
  query($searchIngredient: String!) {
    allIngredients(name_Istartswith: $searchIngredient) {
      edges {
        node {
          id
          name
          kcal
          carbs
          protein
          fat
          fiber
        }
      }
    }
  }
`;

export default graphql(query, {
  options: { variables: { searchIngredient: '' } }
})(IngredientInput);
