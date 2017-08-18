import React from "react";
import IngredientInput from "./IngredientInput";
import IngredientList from "./IngredientList";
import { PieChart, Pie, Cell } from "recharts";
import { gql, graphql } from 'react-apollo';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Circle = ({ color }) =>
  <div
    style={{
      backgroundColor: color,
      height: "10px",
      width: "10px",
      display: "inline-block",
      borderRadius: "5px"
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
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


class NewMeal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pickedIngredients: [],
      name: ""
    };

    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.didClickSave = this.didClickSave.bind(this);
    this.didChangeName = this.didChangeName.bind(this);
  }

  addIngredient(ingredient) {
    const ingredientWithDefaultWeight = {
      ingredient, weight: 100
    };
    if (this.state.pickedIngredients.find(ingTuple => ingTuple.ingredient.id === ingredient.id)) return;
    this.setState({
      pickedIngredients: this.state.pickedIngredients.concat([ingredientWithDefaultWeight])
    });
  }

  removeIngredient(ingredient) {
    this.setState({
      pickedIngredients: this.state.pickedIngredients.filter(
        i => i.ingredient !== ingredient
      )
    });
  }

  setAmount(ingredientId, newWeight) {
    this.setState(state => ({
      pickedIngredients: state.pickedIngredients
        .map(({ingredient, weight}) => ingredient.id === ingredientId ? {ingredient, weight: newWeight} : {ingredient, weight})
    }))
  }

  didChangeName({target}) {
    this.setState({ name: target.value });
  }

  didClickSave() {
    const { pickedIngredients, name } = this.state;
    const ingredientsWithAmount = pickedIngredients.map(({ ingredient, weight}) => ({ id: ingredient.id, amount: weight }));

    this.props.mutate({ variables: {
      name,
      ingredients: ingredientsWithAmount
    }})
    .then(({ data }) => {
      const success = data.createMeal.ok;
      
    })
  }

  render() {
    const { pickedIngredients, name } = this.state;

    const totalWeight = pickedIngredients.reduce(
      (total, {weight}) => total + weight,
      0
    );

    const totalKcal = pickedIngredients.reduce(
      (kcal, {ingredient, weight}) => kcal + ingredient.kcal * weight / 100,
      0
    );

    const totalProteins = pickedIngredients.reduce(
      (proteins, {ingredient, weight}) => proteins + ingredient.protein * weight / 100,
      0
    );

    const totalCarbs = pickedIngredients.reduce(
      (carbs, {ingredient, weight}) => carbs + ingredient.carbs * weight / 100,
      0
    );

    const totalFat = pickedIngredients.reduce(
      (fat, {ingredient, weight}) => fat + ingredient.fat * weight / 100,
      0
    );

    const totalValues =  {totalProteins, totalCarbs, totalFat, totalWeight, totalKcal};

    const pieData = [
      { name: "Fat", value: totalFat },
      { name: "Carbs", value: totalCarbs },
      { name: "Proteins", value: totalProteins }
    ];

    console.log(this.state);

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
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center"
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
                      key={"cell" + index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )}
                </Pie>
              </PieChart>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                  <Circle color={COLORS[1]} /> Carbs
                </div>
                <div style={{ margin: "0 8px 0 8px" }}>
                  <Circle color={COLORS[0]} /> Fat
                </div>
                <div>
                  <Circle color={COLORS[2]} /> Proteins
                </div>
              </div>
            </div>
            <div style={{ flexGrow: 5, padding: "20px" }}>
              <IngredientList
                removeIngredient={this.removeIngredient}
                ingredientList={this.state.pickedIngredients}
                setAmount={this.setAmount}
                totalValues={totalValues}
              />
            </div>

            <div style={{ textAlign: "right" }}>
              <input
                onChange={this.didChangeName}
                placeholder="Meal name"
                style={{
                  marginRight: "10px",
                  border: "2px solid #dadada",
                  borderRadius: "3px",
                  padding: "2px 10px"
                }} 
              />

              <button
                style={{ backgroundColor: "rgb(0, 196, 159)", padding: "4px 25px", color: "white", border: "none", borderRadius: "3px" }}
                onClick={this.didClickSave}
                disabled={name === ""}
              >
                Save
              </button>
            </div>
          </div>           
          }
      </div>
    );
  }
}


const mutation = gql`
  mutation addMeal($name: String!, $ingredients: [IngredientInput]) {
    createMeal(
      mealData: {
        name: $name, 
        ingredients: $ingredients
      }
    ) {
      ok, 
      meal {
        id
      }
    }
  }
`;

export default graphql(mutation)(NewMeal);
