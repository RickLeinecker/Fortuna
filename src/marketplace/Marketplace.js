//@flow strict

import * as React from 'react';
import Navbar from '../components/Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main.css';
import ChassisView from './ChassisView.js';
import CannonsViews from './CannonsView.js';
import CasusBlocksView from './CasusBlocksView.js';
import JammersView from './JammersView.js';
import TreadsView from './TreadsView.js';
import AccessoriesView from './AccessoriesView.js';
import ScannersView from './ScannersView.js';
import type {MarketPlaceViewDataTypes} from './MarketPlaceViewDataTypes.js';

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

  	render() {
		let partView='';
		switch(this.state.marketplaceViewClicked) {
			case 'CHASSIS':
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
			default:
				partView=(<h2>Select a type on the left</h2>);
				break;
		}
		return (
	  		<div id="Parent">
				<Navbar styleName="navbtn" linkName="MainMenu" returnName="Back to Main Menu" pageName="Marketplace" userName="FRIcker" userCurrency={465128} />
				<div className="row mt-5">
		  			<div className="col-md-4">
					  <div className="list-group col-md-6">
						<button className="list-group-item list-group-item-action disabled">Category</button>
						<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'CANNONS'})}>Cannons</button>
						<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'SCANNERS'})}>Scanners</button>
						<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'CHASSIS'})}>Chassis</button>
						<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'JAMMERS'})}>Jammers</button>
						<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'TREADS'})}>Treads</button>
						<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'ACCESSORIES'})}>Accessories</button>
						<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'CASUS_BLOCKS'})}>Casus Blocks</button>
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
