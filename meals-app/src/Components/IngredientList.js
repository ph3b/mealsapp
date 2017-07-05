import React from 'react';

const IngredientList = ({ ingredientList, removeIngredient }) => {
  return (
    <div>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr style={{ borderBottom: '1px solid black' }}>
            <td>Name</td>
            <td>Kcal</td>
            <td>Protein</td>
            <td>Fat</td>
            <td>Carbs</td>
            <td />
          </tr>
          {ingredientList.map((ingredient, i) => {
            const didClickDelete = () => {
              removeIngredient(ingredient);
            };
            return (
              <tr key={i}>
                <td>
                  {ingredient.name}
                </td>
                <td>
                  {ingredient.kcal}
                </td>
                <td>
                  {ingredient.protein}
                </td>
                <td>
                  {ingredient.fat}
                </td>
                <td>
                  {ingredient.carbs}
                </td>
                <td>
                  <button
                    onClick={didClickDelete}
                    style={{ border: 'none', backgroundColor: 'transparent' }}
                  >
                    x
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientList;
