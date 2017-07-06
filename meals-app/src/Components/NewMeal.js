import React from 'react';
import IngredientInput from './IngredientInput';
import IngredientList from './IngredientList';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 }
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Circle = ({ color }) =>
  <div
    style={{
      backgroundColor: color,
      height: '10px',
      width: '10px',
      display: 'inline-block',
      borderRadius: '5px'
    }}
  />;

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.16;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class NewMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedIngredients: []
    };
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  addIngredient(ingredient) {
    if (this.state.pickedIngredients.includes(ingredient)) return;
    this.setState({
      pickedIngredients: this.state.pickedIngredients.concat([ingredient])
    });
  }

  removeIngredient(ingredient) {
    this.setState({
      pickedIngredients: this.state.pickedIngredients.filter(
        i => i !== ingredient
      )
    });
  }

  render() {
    const { pickedIngredients } = this.state;
    const totalProteins = pickedIngredients.reduce(
      (proteins, ingredient) => proteins + ingredient.protein,
      0
    );
    const totalCarbs = pickedIngredients.reduce(
      (carbs, ingredient) => carbs + ingredient.carbs,
      0
    );
    const totalFat = pickedIngredients.reduce(
      (fat, ingredient) => fat + ingredient.fat,
      0
    );

    const pieData = [
      { name: 'Fat', value: totalFat },
      { name: 'Carbs', value: totalCarbs },
      { name: 'Proteins', value: totalProteins }
    ];

    return (
      <div>
        <IngredientInput
          ingredientList={this.props.ingredientList}
          pickedIngredients={this.state.pickedIngredients}
          addIngredient={this.addIngredient}
        />
        {pickedIngredients.length > 0 &&
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <PieChart width={200} height={200} onMouseEnter={this.onPieEnter}>
                <Pie
                  data={pieData}
                  labelLine={false}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                >
                  {pieData.map((entry, index) =>
                    <Cell
                      key={'cell' + index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )}
                </Pie>
              </PieChart>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                  <Circle color={COLORS[1]} /> Carbs
                </div>
                <div style={{ margin: '0 8px 0 8px' }}>
                  <Circle color={COLORS[0]} /> Fat
                </div>
                <div>
                  <Circle color={COLORS[2]} /> Proteins
                </div>
              </div>
            </div>
            <div style={{ flexGrow: 5, padding: '20px' }}>
              <IngredientList
                removeIngredient={this.removeIngredient}
                ingredientList={this.state.pickedIngredients}
              />
            </div>
          </div>}
      </div>
    );
  }
}

export default NewMeal;
