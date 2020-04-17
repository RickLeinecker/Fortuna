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
	// This is the type of item we are buying
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
	// This is used to hold all of the tanks for sale. Will be null when the sellerType is not tank
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
			cards: [<div><h5>Loading Sales...</h5></div>]
		}
	}

	// Once mounted, get the user's ID.
	componentDidMount(): void {
		getUserAPICall(user => {
			this.setState({userId: user.userId});
			this.getSales();
		});
	}

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
			console.log(sales);
			this.setState({tanksForSale: sales.filter(sale => !(allComponents.includes(sale.name)))});
			this.convertSalesToTanks(sales);
		});

		// Get the market sale components and make cards for them.
		getMarketSales(this.state.userId, sales => {
			console.log(sales);
			this.setState({
				chassisForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'chassis'),
				weaponsForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'weapon'),
				scannersForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'scanner'),
				scannerAddonsForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'scannerAddon'),
				jammersForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'jammer'),
				treadsForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'treads'),
				itemsForSale: sales.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === 'item')
			});
		});
	}

	//This function uses tanks id from the state , creates those tanks , and adds them to the array of tanks
	convertSalesToTanks(saleTanks: Array<SaleObject>): void { 
		const tankIds: Array<string> = [];
		for(let i = 0; i < saleTanks.length; i++) {
			if(saleTanks[i].tankId == null) {
				throw new Error("Trying to get tanks when the items for sale have tank id equal to null");
			}
			tankIds.push(saleTanks[i].tankId);
		}
		getTanksById(tankIds, tanksReturned => {
			this.setState({
				tanks: tanksReturned
			});
		});
	}

	// This creates a card for every sale
	createCards = (itemsForSale: Array<SaleObject>, saleType: MarketplaceViewType): Array<React.Element<'div'>> => {
		const cards: Array<React.Element<'div'>> = []
		//Check for no sales
		if (itemsForSale.length === 0) {
			return [<div><h5>No Sales Availiable At This Time</h5></div>];
		}
		// Outer loop to create parent
		for (let i = 0; i < itemsForSale.length; i++) {
			// Handle tank and components different to display tank 
			// Have to make sure that the tanks are being ready to be shown
			if(saleType === 'tank') {
				const tankObject = this.state.tanks[i];
				cards.push(
					<div className="card mb-2" key={i}>
						<div className="card-body">
							{itemsForSale[i].sellerId === '5e93b1d0d1125f22ecd469b7' ? <h6>Purchase from Factory</h6> : null}
							<h5 className="card-title">{toTitleCase(itemsForSale[i].name)}</h5>
							<h5 className="card-title">Price: ${itemsForSale[i].price}</h5>
							<h5 className="card-title">Quantity: {itemsForSale[i].amount}</h5>
							<TankDisplay tankToDisplay={tankObject} smallTank={false} />
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

	// Handles purchases.
	buyItem (sellerId: string, saleId: string): void {
		marketSale(this.state.userId, sellerId, saleId, success => {
			toast.success("Item Purchased.");
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
				{this.state.cards}
				<ToastContainer />
			</div>
		);
	}
}

export default ListingsView;
