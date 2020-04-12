//@flow strict

import * as React from 'react';
import './Marketplace.css';
import Navbar from '../globalComponents/Navbar.js';
import ListingsView from './ListingsView.js';
import MakeAComponentSaleView from './MakeAComponentSaleView.js';
import MakeATankSaleView from './MakeATankSaleView.js';
import RemoveASaleView from './RemoveASaleView.js';
import type { MarketplaceViewDataTypes } from './MarketplaceViewDataTypes.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';

type Props = {||}; 

type State = {|
	marketplaceViewClicked: MarketplaceViewDataTypes,
|};


// Marketplace component.
class Marketplace extends React.Component<Props, State> {

	constructor() {
		super();
		verifyLogin();
		this.state={
			marketplaceViewClicked: 'NONE'
		}
	}

	onMoneyChanged = (): void => {
		const navbar = this.refs.navbar;
		navbar.reloadNavbar();
	}

	render(): React.Node {
		let partView='';
		switch(this.state.marketplaceViewClicked) {
			case 'CHASSIS':
				partView=(<ListingsView sellerType='chassis' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'CANNONS':
				partView=(<ListingsView sellerType='weapon' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'SCANNERS':
				partView=(<ListingsView sellerType='scanner' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'SCANNER_ADD_ONS':
				partView=(<ListingsView sellerType='scannerAddon' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'JAMMERS':
				partView=(<ListingsView sellerType='jammer' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'TREADS':
				partView=(<ListingsView sellerType='treads' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'ACCESSORIES':
				partView=(<ListingsView sellerType='item' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'TANKS':
				partView=(<ListingsView sellerType='tanks' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'CASUS_BLOCKS':
				partView=(<ListingsView sellerType='casus' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'MAKE_A_SALE_COMPONENT':
				partView=(<MakeAComponentSaleView onItemSold={this.onMoneyChanged}></MakeAComponentSaleView>);
				break;
			case 'MAKE_A_TANK_SALE':
				partView=(<MakeATankSaleView onItemSold={this.onMoneyChanged}></MakeATankSaleView>);
				break;
			case 'REMOVE_A_SALE':
				partView=(<RemoveASaleView></RemoveASaleView>);
				break;
			default:
				partView=(<h2>Select a type on the left</h2>);
				break;
		}
		
		return (
			<div id="Parent">
				<Navbar 
					linkName="/MainMenu" 
					returnName="Back to Main Menu" 
					pageName="Marketplace"
					ref="navbar"
					youtubeLink={["https://www.youtube.com/watch?v=hnmnJLNz2vk"]}
				/>
				<div className="row mt-5">
					<div className="col-md-4">
						<div className="list-group col-md-6">
							<h4>Buy</h4>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'CANNONS'})}>Weapons</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'SCANNERS'})}>Scanners</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'SCANNER_ADD_ONS'})}>Scanner Add-Ons</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'CHASSIS'})}>Chassis</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'JAMMERS'})}>Jammers</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'TREADS'})}>Treads</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'ACCESSORIES'})}>Accessories</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'TANKS'})}>Tanks</button>
							<br/>
							<h4>Sell</h4>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'MAKE_A_SALE_COMPONENT'})}>Make a Component Sale</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'MAKE_A_TANK_SALE'})}>Make a Tank Sale</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'REMOVE_A_SALE'})}>Remove a Sale</button>
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
