//@flow strict

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import SampleComponent from './SampleComponent.js';
import CasusContainer from './casus/CasusContainer.js';
import './App.css';

const styleForRow = {
  'margin-top':'20px',
};

//This is the Login Page Display
class LoginPageDisplay extends React.Component<{||}> {
  
  render(): React.Node {
		if (true) {
			return (<CasusContainer />);
		}
    return (
      <div id = "Parent">
					<SampleComponent/>	
          <div class = "row">
              <h4 class = "col-md-4">LeaderBoard</h4>
              <h1 class = "col-md-4 text-center">Fortuna</h1>
              <h4 class = "col-md-4 text-right">What is Fortuna?</h4>
          </div>
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


//This is where we render the view for the login page
const rootComponent=document.getElementById('root');
if (rootComponent != null) {
	ReactDOM.render(<LoginPageDisplay />, rootComponent);
}

