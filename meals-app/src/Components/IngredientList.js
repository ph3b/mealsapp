import React from 'react';

const IngredientList = ({ ingredientList, removeIngredient, setAmount, totalValues }) => {
  return (
    <div>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr style={{ borderBottom: '1px solid black' }}>
            <td>
              <strong>Ingredient</strong>
            </td>
            <td>
              <strong>Amount</strong>
            </td>
            <td>
              <strong>Calories</strong>
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
            <td />
          </tr>
          {ingredientList.map(({ingredient, weight}, i) => {
            const didClickDelete = () => {
              removeIngredient(ingredient);
            };
            return (
              <tr key={i}>
                <td>
                  {ingredient.name}
                </td>
                <td style={{ width: '80px' }}>
                  <input
                    value={weight}
                    step={10}
                    style={{
                      width: '80%',
                      fontSize: '11px',
                      border: 'none',
                      borderBottom: '1px solid black'
                    }}
                    onChange={(event) => setAmount(ingredient.id, parseInt(event.target.value))}
                    type="number"
                    placeholder="Enter weight (g)"
                  />
                </td>
                <td>
                  {ingredient.kcal * weight / 100} kcal
                </td>
                <td>
                  {ingredient.protein * weight / 100} g
                </td>
                <td>
                  {ingredient.fat * weight / 100} g
                </td>
                <td>
                  {ingredient.carbs * weight / 100} g
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
          <tr style={{ height: 80 }}>
            <td><strong>Total</strong></td>
            <td>{totalValues.totalWeight} g</td>
            <td>{totalValues.totalKcal} kcal</td>
            <td>{totalValues.totalProteins} g</td>
            <td>{totalValues.totalFat} g</td>
            <td>{totalValues.totalCarbs} g</td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IngredientList;
