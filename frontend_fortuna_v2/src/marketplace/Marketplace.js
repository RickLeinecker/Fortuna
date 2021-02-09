//@flow strict

import * as React from 'react';
import './Marketplace.css';
import MainNavbar from '../globalComponents/MainNavbar.js';
import ListingsView from './ListingsView.js';
import MakeAComponentSaleView from './MakeAComponentSaleView.js';
import MakeATankSaleView from './MakeATankSaleView.js';
import RemoveASaleView from './RemoveASaleView.js';
import type { MarketplaceViewType } from '../globalComponents/typesAndClasses/MarketplaceViewType.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';

type Props = {||};

type State = {|
	marketplaceViewClicked: ?MarketplaceViewType,
|};


// Marketplace component.
class Marketplace extends React.Component<Props, State> {

	componentDidMount(): void {
		document.body.style.backgroundImage = "url('/login_background.gif')"
	}

	constructor() {
		super();
		verifyLogin();
		this.state = {
			marketplaceViewClicked: null
		}
	}

	// When a transaction takes place, update the navbar currency.
	onMoneyChanged = (): void => {
		const navbar = this.refs.navbar;
		navbar.reloadNavbar();
	}

	render(): React.Node {
		// Partview stores the current listings that are shown.
		let partView = (<div></div>);
		switch(this.state.marketplaceViewClicked) {
			case 'chassis':
				partView = (<ListingsView sellerType='chassis' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'weapon':
				partView = (<ListingsView sellerType='weapon' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'scanner':
				partView = (<ListingsView sellerType='scanner' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'scannerAddon':
				partView = (<ListingsView sellerType='scannerAddon' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'jammer':
				partView = (<ListingsView sellerType='jammer' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'treads':
				partView = (<ListingsView sellerType='treads' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'item':
				partView = (<ListingsView sellerType='item' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'tank':
				partView = (<ListingsView sellerType='tank' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'casusBlock':
				partView = (<ListingsView sellerType='casus' onItemBought={this.onMoneyChanged}></ListingsView>);
				break;
			case 'makeAComponentSale':
				partView = (<MakeAComponentSaleView onItemSold={this.onMoneyChanged}></MakeAComponentSaleView>);
				break;
			case 'makeATankSale':
				partView = (<MakeATankSaleView onItemSold={this.onMoneyChanged}></MakeATankSaleView>);
				break;
			case 'removeASale':
				partView = (<RemoveASaleView></RemoveASaleView>);
				break;
			default:
				partView = (<h2>Select a type on the left</h2>);
				break;
		}

		return (
			<div id="Parent">
				<MainNavbar
					linkName="/Login"
					returnName="Logout"
					// linkName="/MainMenu"
					// returnName="Back to Main Menu"
					pageName="Marketplace"
					ref="navbar"
					// youtubeLinks={['https://www.youtube.com/watch?v=hnmnJLNz2vk']}
				/>
				<div className="row mt-5">
					<div className="col-md-4">
						<div className="list-group col-md-6">
							<h4>Buy</h4>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'weapon'})}>Weapons</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'scanner'})}>Scanners</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'scannerAddon'})}>Scanner Add-Ons</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'chassis'})}>Chassis</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'jammer'})}>Jammers</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'treads'})}>Treads</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'item'})}>Items</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'tank'})}>Tanks</button>
							<br/>
							<h4>Sell</h4>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'makeAComponentSale'})}>Sell a Component</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'makeATankSale'})}>Sell a Tank</button>
							<button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'removeASale'})}>Remove a Sale</button>
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
