import React from 'react';

const MealList = ({ mealList }) =>
  <div>
    <table style={{ width: '100%' }}>
      <tbody>
        <tr style={{ borderBottom: '1px solid black' }}>
          <th />
          <th>Type</th>
          <th>Kcal</th>
          <th>Proteins</th>
          <th>Fat</th>
          <th>Carbs</th>
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
              {meal.proteins}
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
  </div>;

export default MealList;
