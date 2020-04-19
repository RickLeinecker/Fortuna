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

const MASTER_ACCOUNT_ID = '5e7ff4a9c6c3700959497009';

type Props = {|
	sellerType: SellingType,
	onItemBought: () => void,
|};

type State = {|
	userId: string,
	itemsForSale: Array<SaleObject>,
	tanksForSale: Array<Tank>
|};


class ListingsView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			userId: '',
			itemsForSale: [],
			tanksForSale: []
		}
	}

	// Once mounted, get the user's ID and set the sales.
	componentDidMount(): void {
		getUserAPICall(user => {
			this.setState({userId: user.userId}, this.getSales);
		});
	}

	getSales(): void {
		// Get the market sale tanks and make cards for them.
		getMarketTanks(this.state.userId, sales => {
			// If there are tanks to convert, then change them from SaleObject to Tank.
			if (sales.length !== 0) {
				this.convertSalesToTanks(sales);
			}
		});

		// Get the market sale components and make cards for them.
		getMarketSales(this.state.userId, sales => {
			this.setState({itemsForSale: sales});
		});
	}

	// Converts SaleObject to Tank.
	convertSalesToTanks(saleTanks: Array<SaleObject>): void {
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
			this.setState({tanksForSale: tanksReturned});
		});
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
		this.state.itemsForSale.sort((a, b) => {
			const firstFactory = a.sellerId === MASTER_ACCOUNT_ID;
			const secondFactory = b.sellerId === MASTER_ACCOUNT_ID;
			if (firstFactory ^ secondFactory) {
				return firstFactory?1:-1;
			}
			return a.price/a.amount-b.price/b.amount;
		});
		const tankCards = this.state.itemsForSale.filter(sale => !(allComponents.includes(sale.name))).map((sale, index) => 
			<div className={sale.sellerId === MASTER_ACCOUNT_ID ? "masterCard mb-2" : "card mb-2"} key={index}>
				<div className="card-body">
					{sale.sellerId === MASTER_ACCOUNT_ID ? <h6>Purchase from Factory</h6> : null}
					{this.state.tanksForSale[index] == null ? <h5>Loading Tank...</h5> : <h5 className="card-title">{this.state.tanksForSale[index].tankName}</h5>}
					<h5 className="card-title">Price: ${sale.price}</h5>
					<h5 className="card-title">Quantity: {sale.amount}</h5>
					{this.state.tanksForSale[index] == null ? <div></div> : <TankDisplay tankToDisplay={this.state.tanksForSale[index]} smallTank={true} />}
					<button className="btn btn-success mt-2" onClick={() => this.buyItem(sale.sellerId, sale.saleId)}>Buy</button>
				</div>
			</div>
		);
		const itemCards = this.state.itemsForSale.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === this.props.sellerType).map((sale, index) =>
			<div className={sale.sellerId === MASTER_ACCOUNT_ID ? "masterCard mb-2" : "card mb-2"} key={index}>
				<div className="card-body">
					{sale.sellerId === MASTER_ACCOUNT_ID ? <h6>Purchase from Factory</h6> : null}
					<h5 className="card-title">{toTitleCase(sale.name)}</h5>
					<h5 className="card-title">Price: ${sale.price}</h5>
					<h5 className="card-title">Quantity: {sale.amount}</h5>
					<button className="btn btn-success mt-2" onClick={() => this.buyItem(sale.sellerId, sale.saleId)}>Buy</button>
				</div>
			</div>
		);
		return (
			<div>
				<h1>{this.formatTitle(this.props.sellerType)}</h1>
				{this.state.itemsForSale.length === 0 ? <h5>Loading sales...</h5> :
					<div>
						{this.props.sellerType === 'tank' ? 
							<div>{tankCards.length === 0 ? <h5>No Tanks for Sale</h5> : tankCards}</div> : 
							<div>{itemCards.length === 0 ? <h5>No Active Sales</h5> : itemCards}</div>
						}
					</div>
				}
				<ToastContainer />
			</div>
		);
	}
}

export default ListingsView;
