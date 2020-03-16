//@flow strict
import * as React from 'react';
import {getTankComponent, verifyComponent} from '../armory/GetInventoryInfo.js';
import Cookies from 'universal-cookie';
import type {ComponentType} from '../armory/ComponentType.js';

type Props = {|
	//This is the type of item we are buying
	sellerType: ComponentType,
|};
type State = {|
	userId: string,
|};

//This allows for all the items that are for sale to be with in one array
let itemsForSale = [{name: '', price: 0, amount: 0, sellerId: '', saleId: ''}];
class ListingsView extends React.Component<Props, State> {
	constructor(props:Props) {
		super(props);
		this.state={
			userId: '',
		}
	}

	//This is the initial functions that we call
	componentDidMount() {
		this.getUserId();
		this.getMarketSales();
	}

	//When sellerType is updated we need to get the new sells
	componentDidUpdate(prevProps:Props) {
		if (prevProps.sellerType !== this.props.sellerType) {
			this.getMarketSales();
		}
	}

	//This gets us the user's id 
	getUserId = async ():Promise<void> => {
		const cookies = new Cookies();
		const token = cookies.get('token');
		const response = await fetch('/api/user/getUser/', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': token
			},
		});
		const jsonObjectOfUser = await response.json();
		this.setState({userId:jsonObjectOfUser._id});
	};

	//Gets all the sells and filters them based on what type we are currently looking at
	getMarketSales = async ():Promise<void> => {
		itemsForSale = [];
		const response = await fetch('/api/marketplace/getMarketSales/' + this.state.userId, {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
			},
		});
		const jsonObjectOfSells = await response.json();
		for (const sale in jsonObjectOfSells)
		{
			const typeOfItem = getTankComponent(verifyComponent(jsonObjectOfSells[sale].itemId));
			if(typeOfItem === this.props.sellerType)
			{
				//This is a temp obj used to create an object of what a sell item would need to have. It is pushed into an array of all of the items for sell that fall in the current seller type
				let obj = {};
				obj['name'] = jsonObjectOfSells[sale].itemId;
				obj['price'] = jsonObjectOfSells[sale].salePrice;
				obj['amount'] = jsonObjectOfSells[sale].amount;
				obj['sellerId'] = jsonObjectOfSells[sale].sellerId;
				obj['saleId'] = jsonObjectOfSells[sale]._id;
				itemsForSale.push(obj);
			}
		}
		//Need this to deal with the asynch nature of api calling......fun times
		//Makes sure that we create the cards after we get the sells
		this.forceUpdate();     
	}
	
	//This creates a card for every sale
	createCards = () => {
		let cards = []
		// Outer loop to create parent
		for (let i = 0; i < itemsForSale.length; i++) {
			//Create the parent and add the children
			cards.push(
				<div className="card mb-2" key={i}>
					<div className="card-body">
						<h5 className="card-title">Item to buy: {itemsForSale[i].name}</h5>
						<h5 className="card-title">Price: ${itemsForSale[i].price}</h5>
						<h5 className="card-title">Quantity: {itemsForSale[i].amount}</h5>
						<button className="btn btn-success mt-2" onClick={this.buyItem.bind(this,itemsForSale[i].sellerId, itemsForSale[i].saleId)}>Buy</button>
					</div>
				</div>
			)
		}
		return cards;
	}

	//This is the actual buy function
	buyItem (sellerId:string, saleId:string):void {
		const responsePromise: Promise<Response> = fetch('/api/marketplace/marketTransaction/', {
			method: 'put',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
			},
			body: JSON.stringify({ buyerId: this.state.userId, sellerId: sellerId, saleId:saleId}),
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 201) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
				}
				else {
					console.log("success");
				}
			})
		).catch(
			(error) => {
				console.log('Couldnt connect to server!');
				console.log(error);
			}
		); 
	};


	render() { 
		return (
			<div>
				{this.createCards()}
			</div>
		);
	}
}
export default ListingsView;
