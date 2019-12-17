import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Loader from 'react-loader-spinner';


class FriendsList extends React.Component {
state = {
    friends: [],
    name: '',
    age: '',
    email: '',
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get('/api/friends')
      .then(res => {
        console.log(res)

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
                name="name"
                value={this.state.credentials.name}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="email"
                value={this.state.credentials.email}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="age"
                value={this.state.credentials.age}
                onChange={this.handleChange}
              />
              <button>Log in</button>
              {this.state.isFetching && 'logging in'}
            </form>
          
        </div>
      
    );
  }
}

export default FriendsList;
