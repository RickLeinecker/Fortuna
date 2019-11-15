//@flow strict
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import MarketPlace from './MarketPlace.js';
import './Login.css';
  
  //This is the Login Page Display
  class LoginPageDisplay extends React.Component {
    state = {
      response: '',
      userName: '',
      password: '',
      responseToPost: '',
    };
    
    componentDidMount() {
      this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }
    
    callApi = async () => {
      const response = await fetch('./routes/api/signup');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      
      return body;
    };
    
    handleLoginClick = async e => {
      e.preventDefault();
      LoginFunction();
      const response = await fetch('./routes/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: this.state.userName, password:this.state.password }),
      });
      const body = await response.text();
      console.log(body);
    };

    render(){
      return (
        <div id = "Parent">
            <div class = "row">
                <h4 class = "col-md-4">LeaderBoard</h4>
                <h1 class = "col-md-4 text-center">Fortuna</h1>
                <h4 class = "col-md-4 text-right">What is Fortuna?</h4>
            </div>
            <div class = "row styleForRow">
              <div class="col text-center">
                  <input
                    type="text"
                    value={this.state.userName}
                    onChange={e => this.setState({ userName: e.target.value })}
                  />
                  <input
                    type="text"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <button type="button" class="btn btn-success btn-lg" onClick={this.handleLoginClick}>Login</button>
              </div>
            </div>
            <div class = "row styleForRow">
              <div class="col text-center">
                  <button type="button" class="btn btn-secondary btn-sm">Signup</button>
              </div>
            </div>
          </div>
      );
    }
  
  }

  //This is the function that gets used when the player clicks login on the dashboard
  function LoginFunction()
  {
    const rootComponent=document.getElementById('root');
    if (rootComponent != null) {
        ReactDOM.render(<MarketPlace/>, rootComponent);
    }
  }

  export default LoginPageDisplay;

  
  
