import React from 'react';

const MealList = ({ mealList }) => {
  return (
    <div>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr style={{ borderBottom: '1px solid black' }}>
            <td />
            <td>Type</td>
            <td>Kcal</td>
            <td>Protein</td>
            <td>Fat</td>
            <td>Carbs</td>
          </tr>
          {mealList.map((meal, i) =>
            <tr key={i}>
              <td>
                {meal.name}
              </td>
              <td>
                {meal.type}
              </td>
              <td>
                {meal.kcal}
              </td>
              <td>
                {meal.protein}
              </td>
              <td>
                {meal.fat}
              </td>
              <td>
                {meal.carbs}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MealList;