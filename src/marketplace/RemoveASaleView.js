//@flow strict
import * as React from 'react';
import { ToastContainer , toast } from 'react-toastify';
import { getUsersCurrentSales } from './marketPlaceAPIConnections.js';
import { toTitleCase } from '../globalComponents/Utility.js';
import SaleObject from '../globalComponents/typesAndClasses/SaleObject.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';

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
		const responsePromise = getUsersCurrentSales(this.state.userId);
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
				}
				else {
					this.setState({itemsUserHasForSale:data}); 
				}
			})
		).catch(
			error => {
				toast.error('Couldnt connect to server!');
				console.log(error);
			}
		);
	};


	//This creates a card for every sale the user has
	createCards = () => {
		const cards = [];
		console.log(this.state.itemsUserHasForSale);
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
		}
		return cards;
	}
	
	//This is the function to remove the tank sale from the marketplace
	removeSale (saleId: string): void {
		const responsePromise: Promise<Response> = fetch('/api/marketplace/removeAMarketSale/', {
			method: 'put',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
			},
			body: JSON.stringify({ saleId:saleId }),
		});
		responsePromise.then(
			response => response.json().then(data => {
				toast.error(data.msg);
				this.getUsersCurrentSales();
			})
		).catch(
			error => {
				toast.error('Couldnt connect to server!');
				console.log(error);
			}
		); 
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
