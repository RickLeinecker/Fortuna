//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPopup from './LoginPopup.js';
import './Login.css';

// Login component.
class Login extends React.Component<{||}> {

  render(): React.Node {
    return (
      <div id = "Parent">
        <div class = "row">
	  <h4 class = "col-md-4">LeaderBoard</h4>
	  <h1 class = "col-md-4 text-center">Fortuna</h1>
        </div>
	<div class = "row styleForRow">
      	  <div class="col text-center">
      	    <Link to="/MainMenu">
              <button type="button" class="btn btn-success btn-lg">Login</button>
            </Link>
      	  </div>
      	</div>
      	<div class = "rown styleForRow">
      	  <div class="col text-center">
      	    <button type="button" class="btn btn-secondary btn-sm">Signup</button>
      	  </div>
        </div>
        <div class = "row styleForRow">
          <div class = "col text-center">
            <LoginPopup/>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
