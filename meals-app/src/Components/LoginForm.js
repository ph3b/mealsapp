import React from 'react';

class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div>
            <input style={styles.input} placeholder="Username" />
          </div>
          <div>
            <input
              style={styles.input}
              placeholder="Password"
              type="password"
            />
          </div>
          <div>
            <button style={styles.loginButton}>Log in</button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  input: {
    fontSize: '20px',
    fontWeight: '300',
    width: '300px',
    margin: '5px',
    padding: '10px 15px',
    border: '6px solid #DADADA',
    borderRadius: '5px'
  },
  loginButton: {
    fontSize: '20px',
    fontWeight: '300',
    width: '300px',
    margin: '5px',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    backgroundColor: 'rgb(0, 196, 159)'
  }
};

export default LoginForm;
