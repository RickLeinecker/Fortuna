//@flow strict
import * as React from 'react';
import { ToastContainer , toast } from 'react-toastify';
import ListingObject from './ListingObject.js';
import { getUser } from '../globalComponents/apiCalls/userAPIIntegration.js';
import { makeASale } from './marketPlaceAPIConnections.js';
import { toTitleCase } from '../globalComponents/Utility.js';

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
			itemsToSell:[],
		}
	}

	componentDidMount(): void {
		this.getUserInventory();
	}

	getUserInventory (): void  {
		const responsePromise = getUser();
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					return data;
				}
				else {
					const jsonObjectOfUser = data;
					this.setState({userId:jsonObjectOfUser._id});
					const componentsWeCanSell = [];
					for (const key in jsonObjectOfUser.inventory.tankComponents) {
						// We need to atleast have one of these.
						if(jsonObjectOfUser.inventory.tankComponents[key] > 0) {
							componentsWeCanSell.push(new ListingObject(key, jsonObjectOfUser.inventory.tankComponents[key]));
						}
						
					}
					this.setState({itemsToSell: componentsWeCanSell});
				}
			})
		).catch(
			error => {
				console.log('Couldnt connect to server!');
				console.log(error);
			}
		);
	};

	makeASaleOfAComponent =  ():void => {
		const responsePromise = makeASale(
			this.state.userId, 
			this.state.salePrice, 
			this.state.itemID, 
			"component", 
			this.state.itemAmount
		);
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 201) {
					console.log(response.status);
					toast.error(data.msg);
					console.log(data);
				}
				else {
					toast.success(data.msg);
					this.setState({
						salePrice:0,
						itemAmount: 0,
					});
					//Lets refresh the list of the inventory
					this.getUserInventory();
					this.props.onItemSold();
				}

			})
		).catch(
			error => {
				toast.error('Couldnt connect to server!');
				console.log(error);
			}
		);
	};

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
					{(this.state.itemsToSell) ? <option>No Components to Sell</option> :
						this.state.itemsToSell.map(({ name, amount }, index) => 
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
