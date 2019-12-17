import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';

import Loader from 'react-loader-spinner';


class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    },
    isFetching: false
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    this.setState({
      isFetching: true
    });
    axiosWithAuth()
      .post('/api/login', { username: 'Lambda School', password: 'i<3Lambd4' })
      .then(res => {
          console.log('res.data is: ', res.data)
        localStorage.setItem('token', res.data.payload);
        this.props.history.push('/protected'); 
        this.setState({
            isFetching: false 
        })
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
    { this.state.isFetching && <Loader type="Puff" color="#00BFFF" height={100} width={100} /> }
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
          {this.state.isFetching && 'logging in'}
        </form>
      </div>
    );
  }
}

export default Login;
