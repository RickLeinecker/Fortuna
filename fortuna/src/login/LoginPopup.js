//@flow strict

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';

// Informational Login Popup component..
class LoginPopup extends React.Component<{||}> {
  render(): React.Node {
    return(
	    <Popup trigger={<button className="button">What is Fortuna?</button>} modal>
	      {close => (
	        <div className="modal">
  
			      <div className="header">What is Fortuna?</div>
			      <div className="content">
		  	      Fortuna is a tank simulation game available online for free.
	  	        Players can build and customize their tanks and instead of manually
  		   	    controlling their tank, they will build an AI to controll it.
			        <br />	  
		          Fortuna is meant to teach players simple AI and simple programming.
			        <br />	
		          Creators: Adam Blair, Emil Dolorfino, Jorge Vidal, Baylor Maloney, David Harmeyer
		          Sponsor: Richard Leinecker
			      </div>
  
		  	    <div className="actions"> 
              <button
  			        className="button"
				        onClick={() => {
				        close();
				        }}
			        >
			          Close
		          </button>
            </div>

          </div>

        )}
      </Popup>
	  );
  }
}

export default LoginPopup;