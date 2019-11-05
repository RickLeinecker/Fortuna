//@flow strict

import * as React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPopup from './LoginPopup.js';
import MainMenu from '../mainmenu/MainMenu.js';

const styleForRow = {
  'margin-top':'20px',
};

// This is the login page.
class Login extends React.Component<{||}> {

  handleMainMenuClick = () => {
      MainMenuFunction();
  };
  
  render(): React.Node {
    return (
      <div id = "Parent">
	  	  <div class = "row">
	    	  <h4 class = "col-md-4">LeaderBoard</h4>
	    	  <h1 class = "col-md-4 text-center">Fortuna</h1>
        </div>
	    	<div class = "row" style = {styleForRow}>
      	  <div class="col text-center">
      	    <button type="button" class="btn btn-success btn-lg" onClick={this.handleMainMenuClick}>Login</button>
      	  </div>
      	</div>
      	<div class = "row" style = {styleForRow}>
      	  <div class="col text-center">
      	    <button type="button" class="btn btn-secondary btn-sm">Signup</button>
      	  </div>
        </div>
        <div class = "row" style = {styleForRow}>
          <div class = "col text-center">
            <LoginPopup/>
          </div>
        </div>
	    </div>
	  );
  }
}

function MainMenuFunction() {
  const rootComponent = document.getElementById('root');
  if (rootComponent != null) {
    ReactDOM.render(<MainMenu/>, rootComponent);
  }
}

export default Login;