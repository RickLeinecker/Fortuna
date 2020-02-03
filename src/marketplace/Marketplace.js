//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main.css';
import ChassisView from './ChassisView.js';
import CannonsViews from './CannonsView.js';
import CasusBlocksView from './CasusBlocksView.js';
import JammersView from './JammersView.js';
import TreadsView from './TreadsView.js';
import AccessoriesView from './AccessoriesView.js';
import ScannersView from './ScannersView.js';
import MarketPlaceViewDataTypes from './MarketPlaceViewDataTypes.js';

type Props = {||}; 
type State = {|
	marketplaceViewClicked: MarketPlaceViewDataTypes,
|};


// Marketplace component.
class Marketplace extends React.Component<Props, State> {

	constructor(){
		super();
		this.state={
			marketplaceViewClicked: 'NONE'
		}
	}

  	render(){
		let partView='NONE';
		switch(this.state.marketplaceViewClicked) {
			case 'CHASSIS':
				console.log("Here");
				partView=(<ChassisView></ChassisView>);
				break;
			case 'CANNONS':
				partView=(<CannonsViews></CannonsViews>);
				break;
			case 'SCANNERS':
				partView=(<ScannersView></ScannersView>);
				break;
			case 'JAMMERS':
				partView=(<JammersView></JammersView>);
				break;
			case 'TREADS':
				partView=(<TreadsView></TreadsView>);
				break;
			case 'ACCESSORIES':
				partView=(<AccessoriesView></AccessoriesView>);
				break;
			case 'CASUS_BLOCKS':
				partView=(<CasusBlocksView></CasusBlocksView>);
				break;
			case 'NONE':
				partView=(<h2>Select a type on the left</h2>);
				break;
			}
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
					  <div className="list-group col-md-6">
						<a className="list-group-item list-group-item-action disabled">Category</a>
						<a className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'CANNONS'})}>Cannons</a>
						<a className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'SCANNERS'})}>Scanners</a>
						<a className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'CHASSIS'})}>Chassis</a>
						<a className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'JAMMERS'})}>Jammers</a>
						<a className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'TREADS'})}>Treads</a>
						<a className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'ACCESSORIES'})}>Accessories</a>
						<a className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'CASUS_BLOCKS'})}>Casus Blocks</a>
					  </div>
		  			</div>
		  			<div className="col-md-4">
						<div className="text-center">
						{partView}
						</div>
		  			</div>
				</div>
	  		</div>
		);
	  }
	  
}

export default Marketplace;
