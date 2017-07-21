import React from 'react';
import Autosuggest from 'react-autosuggest';
import { gql, withApollo } from 'react-apollo';
import unionBy from 'lodash/unionBy';
import Spinner from './Images/spinner.gif';

const query = gql`
  query($searchIngredient: String!) {
    allIngredients(name_Icontains: $searchIngredient, first: 20) {
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

class IngredientInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isLoading: false,
      enteredValue: '',
      allIngredients: [],
      suggestions: []
    };
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState(prevState => ({
      suggestions: this.state.allIngredients.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      ),
      enteredValue: value
    }));
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
      </div>
    );
  }

  onChange(value, { newValue }) {
    if (newValue.length > 2) {
      this.setState({ isLoading: true })
      this.props.client.query({
        query: query,
        variables: { searchIngredient: newValue }
      })
      .then(({ data }) => {
        const allIngredients = data.allIngredients.edges.map(edge => edge.node);
        this.setState(prevState => ({ allIngredients: unionBy(prevState.allIngredients, allIngredients, "id"), isLoading: false }));
        this.onSuggestionsFetchRequested({ value: newValue })
      })
    }
    this.setState({ value: newValue });
  }

  onSuggestionSelected(value, { suggestion }) {
    this.setState({ value: '' });
    this.props.addIngredient(suggestion);
  }

  renderInput(inputProps) {
    return (
      <div>
        <div><input {...inputProps} /></div>
        {this.state.isLoading &&
          <div style={{ position: 'absolute', top: "21px", right: "13px", opacity: "0.5"}}>
            <img style={{ height: 20, width: 20 }} src={Spinner} />
          </div>  
        }
      </div>
    )
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
              renderInputComponent={this.renderInput}
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

export default withApollo(IngredientInput);
