//@flow strict

import * as React from 'react';
import Navbar from '../globalComponents/Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main.css';
import ListingsView from './ListingsView.js';
import MakeAComponentSaleView from './MakeAComponentSaleView.js';
import type {MarketplaceViewDataTypes} from './MarketplaceViewDataTypes.js';

type Props = {||}; 

type State = {|
	marketplaceViewClicked: MarketplaceViewDataTypes,
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
				partView=(<ListingsView sellerType='chassis'></ListingsView>);
				break;
			case 'CANNONS':
				partView=(<ListingsView sellerType='weapon'></ListingsView>);
				break;
			case 'SCANNERS':
				partView=(<ListingsView sellerType='scanner'></ListingsView>);
				break;
			case 'JAMMERS':
				partView=(<ListingsView sellerType='jammer'></ListingsView>);
				break;
			case 'TREADS':
				partView=(<ListingsView sellerType='treads'></ListingsView>);
				break;
			case 'ACCESSORIES':
				partView=(<ListingsView sellerType='item'></ListingsView>);
				break;
			case 'CASUS_BLOCKS':
				partView=(<ListingsView sellerType='casus'></ListingsView>);
				break;
			case 'MAKE_A_SALE_COMPONENT':
				partView=(<MakeAComponentSaleView></MakeAComponentSaleView>);
				break;
			default:
				partView=(<h2>Select a type on the left</h2>);
				break;
		}
		
		return (
			<div id="Parent">
				<Navbar 
					linkName="MainMenu" 
					returnName="Back to Main Menu" 
					pageName="Marketplace"
				/>
				<div className="row mt-5">
					<div className="col-md-4">
						<div className="list-group col-md-6">
							<button className="list-group-item list-group-item-action disabled">Category</button>
							<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'CANNONS'})}>Weapons</button>
							<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'SCANNERS'})}>Scanners</button>
							<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'CHASSIS'})}>Chassis</button>
							<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'JAMMERS'})}>Jammers</button>
							<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'TREADS'})}>Treads</button>
							<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'ACCESSORIES'})}>Accessories</button>
							<button className="list-group-item list-group-item-action" onClick={() => this.setState({marketplaceViewClicked:'MAKE_A_SALE_COMPONENT'})}>Make A Component Sale</button>
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
