//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import type {TankPartsTypes} from './TankPartsTypes.js';
import ChassisView from './ChassisView.js';
import CannonsViews from './CannonsView.js';
import CasusBlocksView from './CasusBlocksView.js';
import JammersView from './JammersView.js';
import TreadsView from './TreadsView.js';
import AccessoriesView from './AccessoriesView.js';
import ScannersView from './ScannersView.js';
// Marketplace component.
class Marketplace extends React.Component<{||}> {

	constructor(){
		super();
		this.state={
			marketplaceView: this.showMarketView()
		}
	}
	showMarketView(selectedTankPartType: String) {
		switch(selectedTankPartType) {
		  case 'CHASSIS':
			this.setState({marketplaceView:<ChassisView></ChassisView>});
			break;
		  case 'CANNONS':
			this.setState({marketplaceView:<CannonsViews></CannonsViews>});
			break;
		  case 'SCANNERS':
			this.setState({marketplaceView:<ScannersView></ScannersView>});
			break;
		  case 'JAMMERS':
			this.setState({marketplaceView:<JammersView></JammersView>});
			break;
		  case 'TREADS':
			this.setState({marketplaceView:<TreadsView></TreadsView>});
			break;
		  case 'ACCESSORIES':
			this.setState({marketplaceView:<AccessoriesView></AccessoriesView>});
			break;
		  case 'CASUS_BLOCKS':
			this.setState({marketplaceView:<CasusBlocksView></CasusBlocksView>});
			break;
		  default:
			return <h2>Select a type on the left</h2>;
		}
	  }

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
					  <div className="list-group col-md-6">
						<a href="#" className="list-group-item list-group-item-action disabled">
							Category
						</a>
						<a href="#" className="list-group-item list-group-item-action" onClick={() => this.showMarketView('CHASSIS')}>Chassis</a>
						<a href="#" className="list-group-item list-group-item-action" onClick={() => this.showMarketView('CANNONS')}>Cannons</a>
						<a href="#" className="list-group-item list-group-item-action" onClick={() => this.showMarketView('SCANNERS')}>Scanners</a>
						<a href="#" className="list-group-item list-group-item-action" onClick={() => this.showMarketView('JAMMERS')}>Jammers</a>
						<a href="#" className="list-group-item list-group-item-action" onClick={() => this.showMarketView('TREADS')}>Treads</a>
						<a href="#" className="list-group-item list-group-item-action" onClick={() => this.showMarketView('ACCESSORIES')}>Accessories</a>
						<a href="#" className="list-group-item list-group-item-action" onClick={() => this.showMarketView('CASUS_BLOCKS')}>Casus Blocks</a>
					  </div>
		  			</div>
		  			<div className="col-md-4">
						<div className="text-center">{this.state.marketplaceView}</div>
		  			</div>
				</div>
	  		</div>
		);
	  }
	  
}

export default Marketplace;
