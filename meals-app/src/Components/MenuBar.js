import React from 'react';
import { Link } from 'react-router-dom';

const MenuBar = ({ match }) =>
  <div>
    <MenuItem to="/" isActive={match.url === '/'}>
      My meals
    </MenuItem>
    <MenuItem to="/newmeal" isActive={match.url === '/newmeal'}>
      New meal
    </MenuItem>
    <MenuItem to="/newingredient" isActive={match.url === 'newingredient'}>
      New Ingredient
    </MenuItem>
  </div>;

const MenuItem = ({ children, isActive, to }) => {
  let style = styles.menuButton;
  if (isActive) {
    style = { ...style, ...styles.menuButtonActive };
  }
  return (
    <Link to={to} style={style}>
      {children}
    </Link>
  );
};

const styles = {
  menuButtonActive: {
    backgroundColor: 'black',
    borderRadius: 3,
    color: 'white'
  },
  menuButton: {
    padding: '5px 10px'
  }
};

export default MenuBar;
