//@flow strict
import * as React from 'react';
import { getComponentType, verifyComponent } from '../globalComponents/GetInventoryInfo.js';
import type { SellingType } from './SellingType.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import SaleObject from '../globalComponents/typesAndClasses/SaleObject.js';
import { ToastContainer , toast } from 'react-toastify';
import { toTitleCase } from '../globalComponents/Utility.js';
import { getMarketSales, getMarketTanks, marketSale } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';

type Props = {|
	// This is the type of item we are buying
	sellerType: SellingType,
	onItemBought: () => void,
|};

type State = {|
	userId: string,
	// This allows for all the items that are for sale to be with in one array
	itemsForSale: Array<SaleObject>
|};


class ListingsView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state={
			userId: '',
			itemsForSale: [],
		}
	}

	// Once mounted, get the user's ID.
	componentDidMount() {
		this.getUserId();
	}

	// When sellerType is updated we need to get the new sells
	componentDidUpdate(prevProps: Props, prevState: State): void {
		if(prevProps !== this.props) {
			this.directSaleToProperFunction();
		}
	}

	// This function directs the view to the proper function
	// If we are in the tank view it directs it to getMarketSalesForTanks()
	// Else it directs it to getMarketSalesForComponents()
	directSaleToProperFunction(): void {
		if(this.props.sellerType === 'tanks') {
			this.getMarketSalesForTanks();
		}
		else {
			this.getMarketSalesForComponents();
		}
	}

	//This gets us the user's id 
	getUserId(): void {
		getUserAPICall(user => {
			if (user == null) {
				toast.error('Could not get logged in user!');
			}
			else {
				this.setState({userId: user.userId});
				this.directSaleToProperFunction();
			}
		});
	};

	//Gets all the sells and filters them based on what type we are currently looking at
	//This only works for components as tanks is a different api call
	getMarketSalesForComponents(): void  {
		getMarketSales(this.state.userId, sales => {
			if(sales == null) {
				toast.error('Could not get sales!');
			}
			else {
				this.setState({itemsForSale: sales.filter(sale => getComponentType(verifyComponent(sale.name)) === this.props.sellerType)}); 
			}
		});
	}

	//This function uses the users id and gets the tanks that are active in the marketplace
	getMarketSalesForTanks(): void  {
		getMarketTanks(this.state.userId, tanks => {
			if(tanks == null) {
				toast.error('Could not get sale tanks!');
			}
			else {
				this.setState({itemsForSale: tanks}); 
			}
		});
	}

	// This creates a card for every sale
	createCards = () => {
		const cards = []
		// Outer loop to create parent
		for (let i = 0; i < this.state.itemsForSale.length; i++) {
			// Create the parent and add the children
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

	// Handles purchases.
	buyItem (sellerId: string, saleId: string): void {
		marketSale(this.state.userId, sellerId, saleId, success => {
			if(success) {
				toast.success("Item Purchased.");
				this.directSaleToProperFunction();
				this.props.onItemBought();
			}
			else {
				toast.error("Could not buy item.");
			}
		});
	}

	//This formats the title of the listing views
	formatTitle(title:string) {
		//did this because title is a const and I need to reassign the title
		let formattedTitle = title;
		//Capitalizes the first letter
		formattedTitle = formattedTitle.charAt(0).toUpperCase() + formattedTitle.substring(1);
		//adds s to the end of the word if it doesn't contain an s
		if(formattedTitle.charAt(formattedTitle.length-1) !== 's') {
			formattedTitle = formattedTitle + 's';
		}
		//Add-ons is a weird case I am going to handle literally
		if(title === 'scannerAddon') {
			formattedTitle = "Scanner Add-Ons";
		}
		return formattedTitle;
	}

	render() { 
		return (
			<div>
				<h1>{this.formatTitle(this.props.sellerType)}</h1>
				{this.createCards()}
				<ToastContainer />
			</div>
		);
	}
}

export default ListingsView;
