//@flow strict

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const styleForRow = {
  'margin-top':'20px',
};

class Login extends React.Component<{||}> {

  render(): React.Node {
    return (
      <div id = "Parent">
	    <div class = "row">
	      <h4 class = "col-md-4">LeaderBoard</h4>
	      <h1 class = "col-md-4 text-center">Fortuna</h1>
	      <h4 class = "col-md-4 text-right">What is Fortuna?</h4>
	    <div class = "row" style = {styleForRow}>
          <div class="col text-center">
            <button type="button" class="btn btn-success btn-lg">Login</button>
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

export default Login;