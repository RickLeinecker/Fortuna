//@flow strict
import * as React from 'react';
import {getComponentType, verifyComponent} from '../armory/GetInventoryInfo.js';
import Cookies from 'universal-cookie';
import type { SellingType } from './SellingType.js';
import SaleObject from './SaleObject.js';
import { toTitleCase } from '../globalComponents/Utility.js';
type Props = {|
	//This is the type of item we are buying
	sellerType: SellingType,
|};
type State = {|
	userId: string,
	//This allows for all the items that are for sale to be with in one array
	itemsForSale: Array<SaleObject>
|};


class ListingsView extends React.Component<Props, State> {
	constructor(props:Props) {
		super(props);
		this.state={
			userId: '',
			itemsForSale : [],
		}
	}

	//This is the initial functions that we call
	componentDidMount() {
		this.getUserId();
	}

	//When sellerType is updated we need to get the new sells
	componentDidUpdate(prevProps:Props) : void {
		if(prevProps !== this.props) {
			this.directSaleToProperFunction();
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


	//This function directs the view to the proper function
	//If we are in the tank view it directs it to getMarketSalesForTanks()
	//Else it directs it to getMarketSalesForComponents()
	directSaleToProperFunction() : void {
		if(this.props.sellerType === 'tanks') {
			this.getMarketSalesForTanks();
		}
		else {
			this.getMarketSalesForComponents();
		}
	}


	//Gets all the sells and filters them based on what type we are currently looking at
	//This only works for components as tanks is a different api call
	getMarketSalesForComponents() : void  {
		const  responsePromise: Promise<Response> = fetch('/api/marketplace/getMarketSales/' + this.state.userId, {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
			},
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					return data;
				}
				else {
					const jsonObjectOfSells = data;
					const itemsForSaleArray = [];
					for (const sale in jsonObjectOfSells) {
						//Need to make sure that this sale involves a component and not a tank
						if(getComponentType(jsonObjectOfSells[sale].itemId) != null) {
						const typeOfItem = getComponentType(verifyComponent(jsonObjectOfSells[sale].itemId));
							if(typeOfItem === this.props.sellerType) {
								const sellingObject = new SaleObject(
									jsonObjectOfSells[sale].itemId,
									jsonObjectOfSells[sale].salePrice,
									jsonObjectOfSells[sale].amount,
									jsonObjectOfSells[sale].sellerId,
									jsonObjectOfSells[sale]._id
								);
								itemsForSaleArray.push(sellingObject);
							}
						}
					}
					this.setState({itemsForSale:itemsForSaleArray}); 
				}
			})
		).catch(
			error => {
				console.log('Couldnt connect to server!');
				console.log(error);
				return error;
			}
		); 
	}

	//This function uses the users id and gets the tanks that are active in the marketplace
	getMarketSalesForTanks() : void  {
		const  responsePromise: Promise<Response> = fetch('/api/marketplace/getTankMarketSales/' + this.state.userId, {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
			},
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					return data;
				}
				else {
					const jsonObjectOfSells = data;
					const itemsForSaleArray = [];
					for (const sale in jsonObjectOfSells) {
						//if this isn't a component it must be a tank so we can process it here
						if(getComponentType(jsonObjectOfSells[sale].itemId._id) == null) {
							const sellingObject = new SaleObject(
								jsonObjectOfSells[sale].itemId.tankName,
								jsonObjectOfSells[sale].salePrice,
								jsonObjectOfSells[sale].amount,
								jsonObjectOfSells[sale].sellerId,
								jsonObjectOfSells[sale]._id);
							itemsForSaleArray.push(sellingObject);
						}
					} 
					this.setState({itemsForSale:itemsForSaleArray}); 
				}
			})
		).catch(
			error => {
				console.log('Couldnt connect to server!');
				console.log(error);
				return error;
			}
		); 
	}

	//This creates a card for every sale
	createCards = () => {
		const cards = []
		// Outer loop to create parent
		for (let i = 0; i < this.state.itemsForSale.length; i++) {
			//Create the parent and add the children
			cards.push(
				<div className="card mb-2" key={i}>
					<div className="card-body">
						<h5 className="card-title">Item to buy: {toTitleCase(this.state.itemsForSale[i].name)}</h5>
						<h5 className="card-title">Price: ${this.state.itemsForSale[i].price}</h5>
						<h5 className="card-title">Quantity: {this.state.itemsForSale[i].amount}</h5>
						<button className="btn btn-success mt-2" onClick={() => this.buyItem(this.state.itemsForSale[i].sellerId, this.state.itemsForSale[i].saleId)}>Buy</button>
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
