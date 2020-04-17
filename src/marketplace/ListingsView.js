//@flow strict
import * as React from 'react';
import { getComponentType, verifyComponent } from '../globalComponents/GetInventoryInfo.js';
import type { SellingType } from '../globalComponents/typesAndClasses/SellingType.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import SaleObject from '../globalComponents/typesAndClasses/SaleObject.js';
import { ToastContainer , toast } from 'react-toastify';
import { toTitleCase } from '../globalComponents/Utility.js';
import { getMarketSales, marketSale, getMarketTanks } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';
import { allComponents } from '../globalComponents/typesAndClasses/TankComponent.js';
import Tank from '../tanks/Tank.js';
import { getTanksById } from '../globalComponents/apiCalls/tankAPIIntegration';
import TankDisplay from '../tanks/TankDisplay.js';
import type { MarketplaceViewType } from '../globalComponents/typesAndClasses/MarketplaceViewType.js';

type Props = {|
	sellerType: SellingType,
	onItemBought: () => void,
|};

type State = {|
	userId: string,
	chassisForSale: Array<SaleObject>,
	weaponsForSale: Array<SaleObject>,
	scannersForSale: Array<SaleObject>,
	scannerAddonsForSale: Array<SaleObject>,
	jammersForSale: Array<SaleObject>,
	treadsForSale: Array<SaleObject>,
	itemsForSale: Array<SaleObject>,
	tanksForSale: Array<SaleObject>,
	tanks: Array<Tank>,
	cards: Array<React.Element<'div'>>
|};


class ListingsView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state={
			userId: '',
			chassisForSale: [],
			weaponsForSale: [],
			scannersForSale: [],
			scannerAddonsForSale: [],
			jammersForSale: [],
			treadsForSale: [],
			itemsForSale: [],
			tanksForSale: [],
			tanks: [],
			cards: [<div key={0}><h5>Loading Sales...</h5></div>]
		}
	}

	// Once mounted, get the user's ID and set the sales.
	componentDidMount(): void {
		getUserAPICall(user => {
			this.setState({userId: user.userId});
			this.getSales();
		});
	}

	// When updating, update the cards according to the new seller type.
	componentDidUpdate(prevProps: Props, prevState: State): void {
		if (prevProps !== this.props) {
			switch (this.props.sellerType) {
				case 'chassis':
					this.setState({cards: this.createCards(this.state.chassisForSale, 'chassis')});
					break;
				case 'weapon':
					this.setState({cards: this.createCards(this.state.weaponsForSale, 'weapon')});
					break;
				case 'scanner':
					this.setState({cards: this.createCards(this.state.scannersForSale, 'scanner')});
					break;
				case 'scannerAddon':
					this.setState({cards: this.createCards(this.state.scannerAddonsForSale, 'scannerAddon')});
					break;
				case 'jammer':
					this.setState({cards: this.createCards(this.state.jammersForSale, 'jammer')});
					break;
				case 'treads':
					this.setState({cards: this.createCards(this.state.treadsForSale, 'treads')});
					break;
				case 'item':
					this.setState({cards: this.createCards(this.state.itemsForSale, 'item')});
					break;
				case 'tank':
					this.setState({cards: this.createCards(this.state.tanksForSale, 'tank')});
					break;
				default:
					break;
			}
		}
	}

	getSales(): void {
		// Get the market sale tanks and make cards for them.
		getMarketTanks(this.state.userId, sales => {
			this.setState({tanksForSale: sales});
			// Get the tanks to display them in the marketplace cards.
			this.convertSalesToTanks(sales);
		});

		// Get the market sale components and make cards for them.
		getMarketSales(this.state.userId, sales => {
			this.setState({
				chassisForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'chassis'),
				weaponsForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'weapon'),
				scannersForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'scanner'),
				scannerAddonsForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'scannerAddon'),
				jammersForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'jammer'),
				treadsForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'treads'),
				itemsForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'item')
			});

			// After getting the sales, reset the cards according to the sellerType.
			switch (this.props.sellerType) {
				case 'chassis':
					this.setState({cards: this.createCards(this.state.chassisForSale, 'chassis')});
					break;
				case 'weapon':
					this.setState({cards: this.createCards(this.state.weaponsForSale, 'weapon')});
					break;
				case 'scanner':
					this.setState({cards: this.createCards(this.state.scannersForSale, 'scanner')});
					break;
				case 'scannerAddon':
					this.setState({cards: this.createCards(this.state.scannerAddonsForSale, 'scannerAddon')});
					break;
				case 'jammer':
					this.setState({cards: this.createCards(this.state.jammersForSale, 'jammer')});
					break;
				case 'treads':
					this.setState({cards: this.createCards(this.state.treadsForSale, 'treads')});
					break;
				case 'item':
					this.setState({cards: this.createCards(this.state.itemsForSale, 'item')});
					break;
				default:
					break;
			}
		});
	}

	// Converts SaleObject to Tank.
	convertSalesToTanks(saleTanks: Array<SaleObject>): void {
		// Do not convert if there are no tanks to convert.
		if (saleTanks.length === 0) {
			return;
		}
		// Find the tank Ids from the Array of SaleObject.
		const tankIds: Array<string> = [];
		for(let i = 0; i < saleTanks.length; i++) {
			if(saleTanks[i].tankId == null) {
				throw new Error("Trying to get tanks when the items for sale have tank id equal to null");
			}
			tankIds.push(saleTanks[i].tankId);
		}

		// Get all of the tanks by Id.
		getTanksById(tankIds, tanksReturned => {
			this.setState({tanks: tanksReturned});

			// Setup the cards once the tanks have been received.
			if (this.props.sellerType === 'tank') {
				this.setState({cards: this.createCards(this.state.tanksForSale, 'tank')});
			}
		});
	}

	createCards = (itemsForSale: Array<SaleObject>, saleType: MarketplaceViewType): Array<React.Element<'div'>> => {
		console.log(itemsForSale);
		const cards: Array<React.Element<'div'>> = []
		// Check if there are no sales.
		if (itemsForSale.length === 0) {
			return [<div key={0}><h5>No Sales Availiable At This Time</h5></div>];
		}
		
		// Create cards.
		for (let i = 0; i < itemsForSale.length; i++) {
			// Handle tank and components different to display tank.
			if(saleType === 'tank') {
				const tankObject = this.state.tanks[i];
				cards.push(
					<div className="card mb-2" key={i}>
						<div className="card-body">
							{itemsForSale[i].sellerId === '5e93b1d0d1125f22ecd469b7' ? <h6>Purchase from Factory</h6> : null}
							<h5 className="card-title">{toTitleCase(itemsForSale[i].name)}</h5>
							<h5 className="card-title">Price: ${itemsForSale[i].price}</h5>
							<h5 className="card-title">Quantity: {itemsForSale[i].amount}</h5>
							{tankObject == null ? <div></div> : <TankDisplay tankToDisplay={tankObject} smallTank={false} />}
							<button className="btn btn-success mt-2" onClick={() => this.buyItem(itemsForSale[i].sellerId, itemsForSale[i].saleId)}>Buy</button>
						</div>
					</div>
				);
			}
			else {
				cards.push(
					<div className={itemsForSale[i].sellerId === '5e93b1d0d1125f22ecd469b7' ? "masterCard mb-2" : "card mb-2"} key={i}>
						<div className="card-body">
							{itemsForSale[i].sellerId === '5e93b1d0d1125f22ecd469b7' ? <h6>Purchase from Factory</h6> : null}
							<h5 className="card-title">{toTitleCase(itemsForSale[i].name)}</h5>
							<h5 className="card-title">Price: ${itemsForSale[i].price}</h5>
							<h5 className="card-title">Quantity: {itemsForSale[i].amount}</h5>
							<button className="btn btn-success mt-2" onClick={() => this.buyItem(itemsForSale[i].sellerId, itemsForSale[i].saleId)}>Buy</button>
						</div>
					</div>
				);
			}
		}
		return cards;
	}

	// When an item is purchased, update the sale listings.
	buyItem (sellerId: string, saleId: string): void {
		marketSale(this.state.userId, sellerId, saleId, success => {
			toast.success("Item Purchased.");
			this.props.onItemBought();
			this.getSales();
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
				{this.state.cards}
				<ToastContainer />
			</div>
		);
	}
}

export default ListingsView;
