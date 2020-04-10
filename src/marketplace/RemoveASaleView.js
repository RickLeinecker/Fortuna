//@flow strict
import * as React from 'react';
import { ToastContainer , toast } from 'react-toastify';
import { toTitleCase } from '../globalComponents/Utility.js';
import SaleObject from '../globalComponents/typesAndClasses/SaleObject.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import { getUsersCurrentSales, removeASale } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';

type Props = {|
|}; 

type State = {|
	userId: string,
	itemsUserHasForSale: Array<SaleObject>
|};

class RemoveASaleView extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			userId: '',
			itemsUserHasForSale: [],
		}
	}

	componentDidMount() {
		this.getUserID();
	}


	//this gets the user id
	getUserID() : void {
		getUserAPICall(user => {
			this.setState({userId: user.userId});
			this.getUsersCurrentSales();
		});
	};

	//This gets the users current sales
	getUsersCurrentSales() : void {
		getUsersCurrentSales(this.state.userId, data => {
			this.setState({itemsUserHasForSale:data})
		});
	};

	//This creates a card for every sale the user has
	createCards = () => {
		const cards = [];
		for (let i = 0; i < this.state.itemsUserHasForSale.length; i++) {
			//Have to handle tanks and items differently
			if(this.state.itemsUserHasForSale[i].itemType === "component") {
				cards.push(
					<div className="card mb-2" key={i}>
						<div className="card-body">
							<h5 className="card-title">Item Being Sold: {toTitleCase(this.state.itemsUserHasForSale[i].itemId)}</h5>
							<h5 className="card-title">Price: ${this.state.itemsUserHasForSale[i].salePrice}</h5>
							<h5 className="card-title">Quantity: {this.state.itemsUserHasForSale[i].amount}</h5>
							<button className="btn btn-danger mt-2" onClick={() => this.removeSale(this.state.itemsUserHasForSale[i]._id)}>Remove</button>
						</div>
					</div>
				)
			}		
			else if(this.state.itemsUserHasForSale[i].itemType === "tank") {
				cards.push(
					<div className="card mb-2" key={i}>
						<div className="card-body">
							<h5 className="card-title">Tank Being Sold: {toTitleCase(this.state.itemsUserHasForSale[i].itemId.tankName)}</h5>
							<h5 className="card-title">Price: ${this.state.itemsUserHasForSale[i].salePrice}</h5>
							<h5 className="card-title">Quantity: {this.state.itemsUserHasForSale[i].amount}</h5>
							<button className="btn btn-danger mt-2" onClick={() => this.removeSale(this.state.itemsUserHasForSale[i]._id)}>Remove</button>
						</div>
					</div>
				)
			}		
		}
		return cards;
	}
	
	//This is the function to remove the tank sale from the marketplace
	removeSale (saleId: string): void {
		removeASale(saleId);
	};

	render(): React.Node  { 
		return (
			<div id="Parent">
				{this.createCards()}
				<ToastContainer />
			</div>
		);
	}
}

export default RemoveASaleView;
