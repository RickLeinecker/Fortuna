import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';

//This is the Login Page Display
class LoginPageDisplay extends React.Component{
  render() {
    return (
          <div class = "row">
              <h4 class = "col-md-4">LeaderBoard</h4>
              <h1 class = "col-md-4 text-center">Fortuna</h1>
              <h4 class = "col-md-4 text-right">What is Fortuna?</h4>
          </div>
    );
  }
}



//This is where we render the view for the login page
ReactDOM.render(<LoginPageDisplay />, document.getElementById('root'));