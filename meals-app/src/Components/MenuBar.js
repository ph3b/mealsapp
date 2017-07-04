import React from 'react';

const MenuBar = () =>
  <div>
    <span style={{ ...styles.menuButton, ...styles.menuButtonActive }}>
      New meal
    </span>
    <span style={{ ...styles.menuButton }}>New ingredient</span>
  </div>;

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
