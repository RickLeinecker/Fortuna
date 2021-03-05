//@flow strict
import * as React from 'react';
import { getComponentType, verifyComponent } from '../globalComponents/GetInventoryInfo.js';
import type { SellingType } from '../globalComponents/typesAndClasses/SellingType.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import SaleObject from '../globalComponents/typesAndClasses/SaleObject.js';
import { ToastContainer , toast } from 'react-toastify';
import { toTitleCase } from '../globalComponents/Utility.js';
import { getAllUsersTanks } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import { getMarketSales, marketSale, getMarketTanks, getMarketCasusCode } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';
import { allComponents } from '../globalComponents/typesAndClasses/TankComponent.js';
import Tank from '../tanks/Tank.js';
import { getTanksById } from '../globalComponents/apiCalls/tankAPIIntegration';
import TankDisplay from '../tanks/TankDisplay.js';
import getMasterAccountId from '../globalComponents/getMasterAccountId.js';
import {Container, Row, Col} from 'react-bootstrap';
import Pagination from './Pagination.js'
import {reviveAsContainer} from '../casus/reviveCasusBlock.js';
import PurchaseCasusCode from './PurchaseCasusCode.js';
import DisplayDescription from './DisplayDescription.js'


type Props = {|
	sellerType: SellingType,
	onItemBought: () => void,
|};

type State = {|
	userId: string,
	itemsForSale: Array<SaleObject>,
	casusCodeForSale: Array<SaleObject>,
	casusCodeTanks: Array<Tank>,
	tanksForSale: Array<Tank>,
	tanksToSell: Array<Tank>
|};


class ListingsView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			userId: '',
			itemsForSale: [],
			tanksForSale: [],
			casusCodeForSale: [],
			casusCodeTanks: [],
			currentPage: 1,
			postsPerPage: 3,
			postsPerPageCasus: 2,
			totalPosts: 0,
			userTanks: [],
		}

		this.getSales = this.getSales.bind(this);
	}

	// Once mounted, get the user's ID and set the sales.
	componentDidMount(): void {
		getUserAPICall(user => {
			this.setState({userId: user.userId},this.getSales);
			this.getAllUsersTanksForSell();
		});
	}

	getSales(): void {
		// Get Casus Code market sales.
		getMarketCasusCode(this.state.userId, sales => {
			this.setState({casusCodeForSale: sales});
			this.convertSalesToCasusCode(sales);
		});

		// Get the market sale tanks and make cards for them.
		getMarketTanks(this.state.userId, sales => {
			// If there are tanks to convert, then change them from SaleObject to Tank.
			if (sales.length !== 0) {
				this.convertSalesToTanks(sales);
			}
		});

		// Get the market sale components and make cards for them.
		getMarketSales(this.state.userId, sales => {
			// Set total posts for pagination format.
			this.setState({totalPosts: sales.length});

			// filter out tanks that are only selling casus code.
			let salesList = sales.filter(sale => sale.isCasusSale === false);
			this.setState({itemsForSale: salesList});
		});
	}

	// Get user's tanks to copy casus code if purchased.
	getAllUsersTanksForSell() : void {
		getAllUsersTanks(allTanks => {
				this.setState({userTanks: allTanks, tankCasusCode: allTanks[0]._id.casusCode});
		});
	};

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

	// Converts SaleObject to Tank.
	convertSalesToCasusCode(saleTanks: Array<SaleObject>): void {
		// Find the tank Ids from the Array of SaleObject.
		const casusIds: Array<string> = [];
		for(let i = 0; i < saleTanks.length; i++) {
			if(saleTanks[i].tankId == null) {
				throw new Error("Trying to get tanks when the items for sale have tank id equal to null");
			}
			casusIds.push(saleTanks[i].tankId);
		}

		// Get all of the tanks by Id.
		getTanksById(casusIds, tanksReturned => {
			this.setState({casusCodeTanks: tanksReturned});
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

	//This function finds the tank that we are looking for based on the id that is passed in
	findTank(id: string): ?Tank {
		for (let i = 0; i < this.state.tanksForSale.length; i++) {
			if (this.state.tanksForSale[i]._id === id) {
				return this.state.tanksForSale[i];
			}
		}
	}

	//This function finds the casus that we are looking for based on the id that is passed in
	findCasus(id: string): ?Tank {
		for (let i = 0; i < this.state.casusCodeTanks.length; i++) {
			if (this.state.casusCodeTanks[i]._id === id) {
				return this.state.casusCodeTanks[i];
			}
		}
	}

	setLoading(): void {
		this.setState({loading: true});
	}

	render(): React.Node  {
		this.state.itemsForSale.sort((a, b) => {
			const firstFactory = a.sellerId === getMasterAccountId();
			const secondFactory = b.sellerId === getMasterAccountId();
			if (firstFactory !== secondFactory) {
				return firstFactory?1:-1;
			}
			return a.price/a.amount-b.price/b.amount;
		});
		// Render tank sales
		const tankCards = this.state.itemsForSale.filter(sale => !(allComponents.includes(sale.name))).map((sale, index) => {
			const tankToUse = this.findTank(sale.name);
			return (
				<div className={sale.sellerId === getMasterAccountId() ? "masterCard mb-2" : "card mb-2"} key={index}>
					<div className="card-body">
						{sale.sellerId === getMasterAccountId() ? <h6>Purchase from Factory</h6> : null}
						{tankToUse == null ? <h5>Loading Tank...</h5> : <h5 className="card-title">{tankToUse.tankName}</h5>}
						<h5 className="card-title">Price: ${sale.price}</h5>
						<h5 className="card-title">Quantity: {sale.amount}</h5>
						{tankToUse== null ? <div></div> : <TankDisplay tankToDisplay={tankToUse} smallTank={true} />}
						<button className="btn btn-success mt-2" onClick={() => this.buyItem(sale.sellerId, sale.saleId)}>Buy</button>
					</div>
				</div>
			);
		});
		// Render casus code sales
		const casusCodeCards = this.state.casusCodeForSale.filter(sale => !(allComponents.includes(sale.name))).map((sale, index) => {
			const casusToUse = this.findCasus(sale.tankId);
			return (
				<div className={sale.sellerId === getMasterAccountId() ? "masterCard mb-2" : "card mb-2"} key={index}>
					<div className="card-body">
						{sale.sellerId === getMasterAccountId() ? <h6>Purchase from Factory</h6> : null}
						{<h5 className="card-title">{sale.name} Casus Code</h5>}
						<h5 className="card-title">Price: ${sale.price}</h5>
						<h5 className="card-title">Quantity: {sale.amount}</h5>
						{casusToUse == null ? <div></div> : <img src="/scroll.png" />}
						{ casusToUse == null ? <div>Loading Casus Code...</div> : <PurchaseCasusCode selectedTank={casusToUse} usersTanks={this.state.userTanks} sellerId={sale.sellerId} saleId={sale.saleId} userId={this.state.userId} setLoading={this.setLoading} getSales={this.getSales} onItemBought={this.props.onItemBought} />}
					</div>
				</div>
			);
		});
		// render item component sales
		const itemCards = this.state.itemsForSale.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === this.props.sellerType).map((sale, index) =>
			<div className={sale.sellerId === getMasterAccountId() ? "masterCard mb-2" : "card mb-2"} key={index}>
				<div className="card-body">
					{sale.sellerId === getMasterAccountId() ? <h6>Purchase from Factory</h6> : null}
					<h5 className="card-name">{toTitleCase(sale.name)}</h5>
					<h5 className="card-body">{sale.itemDesc} </h5>
					<h5 className="card-title">Price: ${sale.price} Quantity: {sale.amount}</h5>
					<button className="btn btn-success mt-2" onClick={() => this.buyItem(sale.sellerId, sale.saleId)}>Buy</button>
				</div>
			</div>
		);

		// Get current posts
		const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
		const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
		const currentItemPosts = itemCards.slice(indexOfFirstPost, indexOfLastPost);
		const currentTankPosts = tankCards.slice(indexOfFirstPost, indexOfLastPost);

		const indexOfLastPostCasus = this.state.currentPage * this.state.postsPerPageCasus;
		const indexOfFirstPostCasus = indexOfLastPostCasus - this.state.postsPerPageCasus;
		const currentCasusCodePosts = casusCodeCards.slice(indexOfFirstPostCasus, indexOfLastPostCasus);

		// Change page
		const paginate = (pageNumber) => this.setState({currentPage: pageNumber});

		// Actual return for the render
		if (this.state.loading === true) {
			return <img src="/spinner.gif" alt="image" width="600" height="300" />
		} else {
			return (
				<Container fluid>
					<h1>{this.formatTitle(this.props.sellerType)}</h1>
					{this.state.itemsForSale.length === 0 ? <h5>Loading sales...</h5> :
						<Row>
							{this.props.sellerType === 'tank' ?
								<Col>{tankCards.length === 0 ? <h5>No Active Sales</h5> : currentTankPosts}
								<Pagination className="pagination" postsPerPage={this.state.postsPerPage} totalPosts={tankCards.length} paginate={paginate} /> </Col> :
								this.props.sellerType === 'casusCode' ?
								<Col>{casusCodeCards.length === 0 ? <h5>No Active Sales</h5> : currentCasusCodePosts}
								<Pagination className="pagination" postsPerPage={this.state.postsPerPageCasus} totalPosts={casusCodeCards.length} paginate={paginate} /> </Col> :
								<Col>{itemCards.length === 0 ? <h5>No Active Sales</h5> : currentItemPosts}
								<div className="text-center"><Pagination className="pagination" postsPerPage={this.state.postsPerPage} totalPosts={itemCards.length} paginate={paginate} /> </div></Col>
							}
						</Row>
					}
					<ToastContainer />
				</Container>
			);
		}
	}
}

export default ListingsView;