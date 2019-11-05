//@flow strict

import * as React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Marketplace from '../marketplace/Marketplace.js';
import Login from '../login/Login.js';

const styleForRow = {
  'margin-top':'20px',
};

// This is the Main Menu page.
class MainMenu extends React.Component<{||}> {

  handleMarketplaceClick = () => {
      MarketplaceFunction();
  };

  handleLoginClick = () => {
    LoginFunction();
  };
  
  render(): React.Node {
    return (
      <div id = "Parent">
	      <div class = "row">
          <div class = "col-md-4"><button type="button" class="btn btn-secondary btn-lg" onClick={this.handleLoginClick}>&lt;- Back to Login</button></div>
	        <h1 class = "col-md-4 text-center">Main Menu</h1>
	      </div>
	      <div class="row" style={styleForRow}>
	        <div class="col text-center">
            <button type="button" class="btn btn-primary">Battle Arena</button>
          </div>
        </div>
        <div class="row" style={styleForRow}>
	        <div class="col text-center">
            <button type="button" class="btn btn-info">Training Arena</button>
          </div>
        </div>
        <div class="row" style={styleForRow}>
	        <div class="col text-center">
            <button type="button" class="btn btn-info" onClick={this.handleMarketplaceClick}>Marketplace</button>
          </div>
        </div>
        <div class="row" style={styleForRow}>
	        <div class="col text-center">
            <button type="button" class="btn btn-info">Armory</button>
          </div>
        </div>
      </div>
	  );
  }
}

// Handles movement to the Marketplace.
function MarketplaceFunction() {
  const rootComponent = document.getElementById('root');
  if (rootComponent != null) {
    ReactDOM.render(<Marketplace/>, rootComponent);
  }
}

// Handles movement to the Login page.
function LoginFunction() {
  const rootComponent = document.getElementById('root');
  if (rootComponent != null) {
    ReactDOM.render(<Login/>, rootComponent);
  }
}

export default MainMenu;