import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import MarketPlaceDisplay from './MarketPlace.js';
const styleForRow = {
    'margin-top':'20px',
  };
  
  //This is the Login Page Display
  class LoginPageDisplay extends React.Component {
    handleLoginClick = () => {
        LoginFunction();
      }
    render(){
      return (
        <div id = "Parent">
            <div class = "row">
                <h4 class = "col-md-4">LeaderBoard</h4>
                <h1 class = "col-md-4 text-center">Fortuna</h1>
                <h4 class = "col-md-4 text-right">What is Fortuna?</h4>
            </div>
            <div class = "row" style = {styleForRow}>
              <div class="col text-center">
                  <button type="button" class="btn btn-success btn-lg" onClick={this.handleLoginClick}>Login</button>
              </div>
            </div>
            <div class = "row" style = {styleForRow}>
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
        ReactDOM.render(<MarketPlaceDisplay/>, rootComponent);
    }
  }

  export default LoginPageDisplay;

  
  
