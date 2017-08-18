import React from 'react';
import { gql, graphql } from 'react-apollo';

class MealDetail extends React.Component {
    render() {
        return (
            <div>Hello!</div>
        )
    }
}

const query = gql`
    query FetchMeal($id: ID!) {
        meal(id: $id) {
            id,
            name,
            ingredients {
            id,
            ingredient {
                id,
                name,
                kcal,
                carbs,
                protein,
                fat,
                fiber,
            },
            amountGrams
            }
        }
    }
`;

export default graphql(query, {
    options: ({ match }) => {
        return { variables: { id: "TWVhbFR5cGU6NA==" }}
    }
})(MealDetail);