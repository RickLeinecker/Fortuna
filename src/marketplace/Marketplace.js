//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Marketplace component.
class Marketplace extends React.Component<{||}> {

  	render(){
		return (
	  		<div id="Parent">
				<div className="row">
		  			<div className="col-md-4">
						<Link to="/MainMenu">
		  					<button type="button" className="btn btn-secondary btn-lg">&lt;- Back to Main Menu</button>
						</Link>
	  				</div>
		  			<h1 className="col-md-4 text-center">Marketplace</h1>
		  			<h4 className="col-md-4 text-right">Currency: $9432</h4>
				</div>
				<div className="row mt-5">
		  			<div className="col-md-4">
						<h2>Available Tanks</h2>
						<h6>Tank One</h6>
						<h6>Tank Two</h6>
						<h6>Tank Three</h6>
						<h6>Tank Four</h6>
						<h6>Tank Five</h6>
						<h6>Tank Six</h6>
						<h6>Tank Seven</h6>
						<h6>Tank Eight</h6>
		  			</div>
		  			<div className="col-md-4">
						<h2 className="text-center">Selected Tank</h2>
		  			</div>
		  			<div className="col-md-4">
						<h2 className="text-right">Components</h2>
						<h6 className="text-right">Tank One Cannon</h6>
						<h6 className="text-right">Tank One Tracks</h6>
						<h6 className="text-right">Tank One Scanner</h6>
						<h6 className="text-right">Tank One Jammer</h6>
						<h6 className="text-right">Tank One Base</h6>
		  			</div>
				</div>
	  		</div>
		);
  	}
}

export default Marketplace;
