import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from './components/Popup';  

var styleForRow = {
	'margin-top' : '20px',
};

class App extends React.Component {  
  
  // Set the state of react components.
  constructor(props){
    super(props);  
    this.state = { showPopup: false };  
  }  
  
  // Used to toggle any popups.
  togglePopup() {  
    this.setState({  
    showPopup: !this.state.showPopup  
    });  
  }  
  
  // HTML to render the page.
  render() { 
    return (
      <div id = "Parent">
        
		<div class="row">
          <h4 class="col-md-4">Leaderboard</h4>
          <h1 class="col-md-4 text-center">Fortuna</h1>
        </div>
        
		<div class="row" style={styleForRow}>
          <div class="col text-center">
            <button type="button" class="btn btn-success btn-lg">Login</button>
          </div>
        </div>
        <div class = "row" style = {styleForRow}>
          <div class="col text-center">
            <button type="button" class="btn btn-secondary btn-sm">Signup</button>
          </div>
        </div>
		
		<div class="row" style={styleForRow}>
		  <div class="col text-center">
		    <button onClick={this.togglePopup.bind(this)}>What is Fortuna?</button>
            {this.state.showPopup ?  
              <Popup  
                text='What is Fortuna?'
			    bodytext='
		          Fortuna is a tank simulation game available online for free.
				  Players can build and customize their tanks and instead of manually
				  controlling their tank, they will build an AI to controll it.
				  
				  Fortuna is meant to teach players simple AI and simple programming.
				
				  Creators: Adam Blair, Emil Dolorfino, Jorge Vidal, Baylor Maloney, David Harmeyer
				  Sponsor: Richard Leinecker'
                closePopup={this.togglePopup.bind(this)}  
              >
			  </Popup> : null
            }
	      </div>
	    </div>
      
	  </div>
    );
  }
}

export default App;