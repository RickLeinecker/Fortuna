//@flow strict
import * as React from 'react';
import { ToastContainer , toast } from 'react-toastify';
import ListingObject from './ListingObject.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import { makeASale } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';
import { toTitleCase } from '../globalComponents/Utility.js';
import TankComponent from '../globalComponents/typesAndClasses/TankComponent.js';

type Props = {|
	onItemSold: () => void,
|}; 

type State = {|
	userId: string,
	salePrice: number,
	itemID: string,
	itemAmount: number,
	itemsToSell: Array<ListingObject>,
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
				const componentsToSell: Array<ListingObject> = [];
				for (const key in user.inventory.tankComponents) {
					if (user.inventory.tankComponents[key] > 0) {
						componentsToSell.push(new ListingObject(key, user.inventory.tankComponents[key]));
					}
				}
				this.setState({itemsToSell: componentsToSell});
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

	handleChangeInSaleItem = ({ target }:{target:HTMLInputElement }) => {this.setState({itemID: target.value});}
	handleChangeInSalePrice = ({ target }:{target:HTMLInputElement }) => {this.setState({salePrice: parseInt(target.value)});}
	handleChangeInAmountToSell = ({ target }:{target:HTMLInputElement }) => {this.setState({itemAmount: parseInt(target.value)});}
	
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
				<select className="dropdownMenu" onChange={this.handleChangeInSaleItem}>
					{this.state.itemsToSell.map(({ name, amount }, index) => 
							<option key={index}  value={name}>{toTitleCase(name)} {'(' + amount + ')'}</option>
					)}
				</select>
				<br/><br/>
				<label>Selling Price</label>
				<input type="number" className="inputText" value={this.state.salePrice} onChange={this.handleChangeInSalePrice}></input>
				<br/><br/>
				<label>Amount to Sell</label>
				<input type="number" className="inputText" value={this.state.itemAmount} onChange={this.handleChangeInAmountToSell}></input>
				<br/><br/>
				<button className="primarybtn" onClick={this.makeASaleOfAComponent}>Sell</button>
				<ToastContainer />
			</div>
		);
	}
}

export default MakeAComponentSaleView;
