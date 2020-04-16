//@flow strict
import * as React from 'react';
import { getComponentType, verifyComponent } from '../globalComponents/GetInventoryInfo.js';
import type { SellingType } from './SellingType.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import SaleObject from '../globalComponents/typesAndClasses/SaleObject.js';
import { ToastContainer , toast } from 'react-toastify';
import { toTitleCase } from '../globalComponents/Utility.js';
import { getMarketSales, marketSale, getMarketTanks } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';
import { allComponents } from '../globalComponents/typesAndClasses/TankComponent.js';
import Tank from '../tanks/Tank.js';
import { getTanksById } from '../globalComponents/apiCalls/tankAPIIntegration';
import TankDisplay from '../tanks/TankDisplay.js';

type Props = {|
	// This is the type of item we are buying
	sellerType: SellingType,
	onItemBought: () => void,
|};

type State = {|
	userId: string,
	// This allows for all the items that are for sale to be with in one array
	itemsForSale: Array<SaleObject>,
	// This is used to hold all of the tanks for sale. Will be null when the sellerType is not tank
	tanksForSale: ?Array<Tank>
|};


class ListingsView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state={
			userId: '',
			itemsForSale: [],
			tanksForSale: null,
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
			this.setState({userId: user.userId});
			this.directSaleToProperFunction();
		});
	};

	//Gets all the sells and filters them based on what type we are currently looking at
	//This only works for components as tanks is a different api call
	getMarketSalesForComponents(): void  {
		getMarketSales(this.state.userId, sales => {
			this.setState({itemsForSale: sales.filter(sale => 
				allComponents.includes(sale.name)
				&& getComponentType(verifyComponent(sale.name)) === this.props.sellerType
			)}); 
		});
	}

	//This function uses the users id and gets the tanks that are active in the marketplace
	getMarketSalesForTanks(): void  {
		getMarketTanks(this.state.userId, sales => {
				this.setState({itemsForSale: sales.filter(sale => !(allComponents.includes(sale.name)))}); 
				this.getTanksToShow();
		});
	}

	//This function uses tanks id from the state , creates those tanks , and adds them to the array of tanks
	getTanksToShow() { 
		const arrayOfTankIds = [];
		for(let i = 0; i < this.state.itemsForSale.length; i++) {
			if(this.state.itemsForSale[i].tankId == null) {
				console.log("Loading Tanks...");
				return;
			}
			arrayOfTankIds.push(this.state.itemsForSale[i].tankId);
		}
		getTanksById(arrayOfTankIds, tanksReturned => {
			this.setState({
				tanksForSale: tanksReturned,
			});
		});
	}

	// This creates a card for every sale
	createCards = () => {
		const cards = []
		//Check for no sales
		if(this.state.itemsForSale.length === 0) {
			return(<h5>No Sales Availiable At This Time</h5>);
		}
		// Outer loop to create parent
		for (let i = 0; i < this.state.itemsForSale.length; i++) {
			// Handle tank and components different to display tank 
			// Have to make sure that the tanks are being ready to be shown
			if(this.props.sellerType === 'tanks') {
				if(this.state.tanksForSale == null) {
					return(<h5>Loading Tanks...</h5>);
				}
				else {
					const tankObject = this.state.tanksForSale[i];
					cards.push(
						<div className="card mb-2" key={i}>
							<div className="card-body">
								<h5 className="card-title">{toTitleCase(this.state.itemsForSale[i].name)}</h5>
								<h5 className="card-title">Price: ${this.state.itemsForSale[i].price}</h5>
								<h5 className="card-title">Quantity: {this.state.itemsForSale[i].amount}</h5>
								<TankDisplay tankToDisplay={tankObject} smallTank={false} />
								<button className="btn btn-success mt-2" onClick={() => this.buyItem(this.state.itemsForSale[i].sellerId, this.state.itemsForSale[i].saleId)}>Buy</button>
							</div>
						</div>
					);
				}
			}
			else {
				cards.push(
					<div className={this.state.itemsForSale[i].sellerId === '5e93b1d0d1125f22ecd469b7' ? "masterCard mb-2" : "card mb-2"} key={i}>
						<div className="card-body">
							{this.state.itemsForSale[i].sellerId === '5e93b1d0d1125f22ecd469b7' ? <h6>Master Listing: Unlimited Quantity</h6> : null}
							<h5 className="card-title">{toTitleCase(this.state.itemsForSale[i].name)}</h5>
							<h5 className="card-title">Price: ${this.state.itemsForSale[i].price}</h5>
							<h5 className="card-title">Quantity: {this.state.itemsForSale[i].amount}</h5>
							<button className="btn btn-success mt-2" onClick={() => this.buyItem(this.state.itemsForSale[i].sellerId, this.state.itemsForSale[i].saleId)}>Buy</button>
						</div>
					</div>
				);
			}
		}
		return cards;
	}


	// Handles purchases.
	buyItem (sellerId: string, saleId: string): void {
		marketSale(this.state.userId, sellerId, saleId, success => {
			toast.success("Item Purchased.");
			this.directSaleToProperFunction();
			this.props.onItemBought();
		});
	}

	//This formats the title of the listing views
	formatTitle(title:string) {
		// Did this because title is a const and I need to reassign the title
		let formattedTitle = title;
		// Capitalizes the first letter
		formattedTitle = formattedTitle.charAt(0).toUpperCase() + formattedTitle.substring(1);
		// Adds s to the end of the word if it doesn't contain an s
		if(formattedTitle.charAt(formattedTitle.length-1) !== 's') {
			formattedTitle = formattedTitle + 's';
		}
		// Add-ons is a weird case I am going to handle literally
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
