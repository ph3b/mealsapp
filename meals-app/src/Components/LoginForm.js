import React from 'react';
import axios from 'axios';
import store from 'store';
import { API_URL } from '../AppConfig';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async onSubmit() {
    const { username, password } = this.state;
    if (!username || !password) return;
    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        username,
        password
      });
      if (data.token) {
        const { token } = data;
        this.props.setToken(token);
        setTimeout(() => {
          this.props.history.push('/');
        }, 0);
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  render() {
    console.log(this.props);
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
            <input
              name="username"
              onChange={this.onChange}
              style={styles.input}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              name="password"
              onChange={this.onChange}
              style={styles.input}
              placeholder="Password"
              type="password"
            />
          </div>
          <div>
            <button
              onClick={this.onSubmit}
              name="password"
              style={styles.loginButton}
            >
              Log in
            </button>
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
