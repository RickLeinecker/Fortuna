//@flow strict
import * as React from 'react';
import {getTankComponent, verifyComponent} from '../armory/GetInventoryInfo.js';
import Cookies from 'universal-cookie';

type Props = {||}; 
type State = {|
	userId: string,
|};
let itemsForSale = [];
class CannonsViews extends React.Component<Props, State> {
    constructor() {
		super();
		this.state={
			//This tank id is the one the user is currently working on
			userId: '',
		}
		this.getMarketSales();
		this.getUserId();
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
		const body = await response.text();
		const jsonObjectOfUser = JSON.parse(body);
		this.setState({userId:jsonObjectOfUser._id});
    };

	//Gets all the sells that we are looking at 
    getMarketSales = async ():Promise<void> => {
		itemsForSale = [];
		const response = await fetch('/api/marketplace/getMarketSales/', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
			},
		});
		const body = await response.text();
		const jsonObjectOfSells = JSON.parse(body);
		for (const sale in jsonObjectOfSells)
		{
			const typeOfItem = getTankComponent(verifyComponent(jsonObjectOfSells[sale].itemId));
			if(typeOfItem === 'weapon')
			{
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
		return cards
	  }

	  //This is the actual buy function
	  buyItem = async (sellerId:string, saleId:string):Promise<void> => {
		const response = await fetch('/api/marketplace/marketTransaction/', {
			method: 'put',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({ buyerId: this.state.userId, sellerId: sellerId, saleId:saleId}),
		});
        const body = await response.text();
		alert(body);
		this.forceUpdate(); 
	};


    render() { 
        return (
			<div>
				{this.createCards()}
			</div>
        );
    }
}

export default CannonsViews;