import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Loader from 'react-loader-spinner';


class FriendsList extends React.Component {
state = {
    friends: [],
    name: '',
    age: '',
    email: '',
    isPosting: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get('/friends')
      .then(res => {
        console.log('!!!', res)
        this.setState({
            friends: res.data
        })
      })
      .catch(err => console.log(err));
  };

  postNewFriend = () => {
      const postObj = {
        name: this.state.name,
        age: this.state.age,
        email: this.state.email,
      }
    this.setState({
        isPosting: true
      });
    return  axiosWithAuth()
    .post('/friends', postObj)
    .then(res => {
        console.log('post friend response is: ', res)
        this.setState({
            friends: [...this.state.friends, postObj]
        })
    })
  }

  handleChange = e => {
    this.setState( {
        [e.target.name]: e.target.value
      });
  };

  render() {
   
    return (
       <div>
        {
this.state.friends.map( friendObject => {
    return (
        <div style={{'border': '2px black solid', 'width':'30%', 'margin': '0 auto'}}>
            <h1>{friendObject.name}</h1>
            <h2>{friendObject.age}</h2>
            <h2>{friendObject.email}</h2>
        </div>
    )
})
        }

        <div>
       
{ this.state.isPosting && <Loader type="Puff" color="#00BFFF" height={100} width={100} /> }
    <form onSubmit={this.postNewFriend}>
      <input
        type="text"
        name="name"
        value={this.state.name}
        onChange={this.handleChange}
      />
      <input
        type="text"
        name="email"
        value={this.state.email}
        onChange={this.handleChange}
      />
      <input
        type="text"
        name="age"
        value={this.state.age}
        onChange={this.handleChange}
      />
      <button>Add Friend</button>
      {this.state.isFetching && 'adding new friend'}
    </form>
  
</div>

       </div>
    );
  }
}

export default FriendsList;
