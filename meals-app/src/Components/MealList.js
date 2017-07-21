import React from 'react';
import { gql, graphql } from 'react-apollo'

const query = gql`
  query {
    allMeals(first: 20) {
      edges {
        node {
          id,
          name,
          kind,
          ingredients {
            amountGrams,
            ingredient {
              id,
              kcal,
              carbs,
              protein,
              fat,
              fiber
            }
          }
        }
      }
    }
  }
`;

const MealList = ({ allMeals, loading }) => {
  return (
    <div>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr style={{ borderBottom: '1px solid black' }}>
            <td />
            <td>
              <strong>Type</strong>
            </td>
            <td>
              <strong>Kcal</strong>
            </td>
            <td>
              <strong>Protein</strong>
            </td>
            <td>
              <strong>Fat</strong>
            </td>
            <td>
              <strong>Carbs</strong>
            </td>
          </tr>
          {allMeals.map((meal, i) =>
            <tr key={i}>
              <td>
                {meal.name}
              </td>
              <td>
                {meal.kind.substring(0, 1)}{meal.kind.substring(1).toLowerCase()}
              </td>
              <td>
                {meal.ingredients.reduce((kcal, {ingredient, amountGrams}) => kcal + ingredient.kcal * amountGrams/100 ,0)}
              </td>
              <td>
                {meal.ingredients.reduce((protein, {ingredient, amountGrams}) => protein + ingredient.protein * amountGrams/100 ,0)}
              </td>
              <td>
                {meal.ingredients.reduce((fat, {ingredient, amountGrams}) => fat + ingredient.fat * amountGrams/100 ,0)}
              </td>
              <td>
                {meal.ingredients.reduce((carbs, {ingredient, amountGrams}) => carbs + ingredient.carbs * amountGrams/100 ,0)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default graphql(query, {
  props: ({ ownProps, data: { allMeals, loading }}) => {
    return { loading, allMeals: allMeals ? allMeals.edges.map(({node}) => node) : [] };
  }
})(MealList);
