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
			cards.push(
				<div className="card mb-2" key={i}>
					<div className="card-body">
						<h5 className="card-title">Tank Being Sold: {toTitleCase(this.state.itemsUserHasForSale[i].name)}</h5>
						<h5 className="card-title">Price: ${this.state.itemsUserHasForSale[i].price}</h5>
						<h5 className="card-title">Quantity: {this.state.itemsUserHasForSale[i].amount}</h5>
						<button className="btn btn-danger mt-2" onClick={() => this.removeSale(this.state.itemsUserHasForSale[i].saleId)}>Remove</button>
					</div>
				</div>
			)	
		}
		if(cards.length === 0) {
			cards.push(
				<h1>No Active Sales!</h1>
			)	
		}
		return cards;
	}
	
	//This is the function to remove the tank sale from the marketplace
	removeSale (saleId: string): void {
		removeASale(saleId);
		this.getUsersCurrentSales();
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
