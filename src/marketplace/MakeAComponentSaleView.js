//@flow strict
import * as React from 'react';
import { ToastContainer , toast } from 'react-toastify';
import Component from '../globalComponents/typesAndClasses/Component.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import { makeASale } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';
import { toTitleCase } from '../globalComponents/Utility.js';

type Props = {|
	onItemSold: () => void,
|}; 

type State = {|
	userId: string,
	salePrice: number,
	itemID: string,
	itemAmount: number,
	itemsToSell: Array<Component>,
|};

class MakeAComponentSaleView extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			userId: '',
			salePrice: 0,
			itemID: '',
			itemAmount: 0,
			itemsToSell: [],
		}
	}

	componentDidMount(): void {
		this.getUserInventory();
	}

	// Gets all of the user's inventory.
	getUserInventory(): void {
		getUserAPICall(user => {
			if (user == null) {
				toast.error('Can not find logged in user!');
			}
			else {
				this.setState({itemsToSell: user.inventory, userId: user.userId, itemID: user.inventory[0].componentName});
			}
		});
	}

	makeASaleOfAComponent = (): void => {
		makeASale(
			this.state.userId, 
			this.state.salePrice, 
			this.state.itemID, 
			"component", 
			this.state.itemAmount,
			success => {
				if (success) {
					toast.success("Item Placed in Market.");
					this.setState({salePrice: 0, itemAmount: 0});
					this.getUserInventory();
					this.props.onItemSold();
				}
				else {
					toast.error("Could not place item in Market!");
				}
			}
		);
	}
	
	formatAmountUserHas(amountOfThisItemUserHas: number): string {
		let responseString = '';
		if(amountOfThisItemUserHas > 0) {
			responseString = '(' + amountOfThisItemUserHas + ')';
		}
		return responseString;
	}

	render(): React.Node  { 
		return (
			<div id="Parent">
				<label>Select an Item to Sell</label>
				<select className="dropdownMenu" onChange={e => this.setState({itemID: e.target.value})}>
					{this.state.itemsToSell.map(({ componentName, numberOwned }, index) => 
							<option key={index}  value={componentName}>{toTitleCase(componentName)} {'(' + numberOwned + ')'}</option>
					)}
				</select>
				<br/><br/>
				<label>Selling Price</label>
				<input type="number" className="inputText" value={this.state.salePrice} onChange={e => this.setState({salePrice: e.target.value})}></input>
				<br/><br/>
				<label>Amount to Sell</label>
				<input type="number" className="inputText" value={this.state.itemAmount} onChange={e => this.setState({itemAmount: e.target.value})}></input>
				<br/><br/>
				<button className="primarybtn" onClick={this.makeASaleOfAComponent}>Sell</button>
				<ToastContainer />
			</div>
		);
	}
}

export default MakeAComponentSaleView;
