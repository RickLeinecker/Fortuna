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
import DisplayDescription from './DisplayDescription.js';

import ItemCards from './ItemCards.js'
import TankCards from './TankCards.js'
import CasusCards from './CasusCards.js';


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
			postsPerPageCasus: 3,
			totalPosts: 0,
			userTanks: [],
		}

		this.getSales = this.getSales.bind(this);
    this.buyItem = this.buyItem.bind(this);
    this.findCasus = this.findCasus.bind(this);
    this.findTank = this.findTank.bind(this);
    this.isMaster = this.isMaster.bind(this);
    this.getSalesBySellerType = this.getSalesBySellerType.bind(this);
	}

	// Once mounted, get the user's ID and set the sales.
	componentDidMount(): void {
		this.setState({loading: true});
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
				this.setState({userTanks: allTanks, tankCasusCode: allTanks[0]._id.casusCode, loading: false});
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
  
  isMaster = (sellerId) => {
    if (sellerId === getMasterAccountId())
    {
      return "Purchase From Factory";
    }
  }

  buttonStyle = {
    position: "relative",
    left: "80px"
  }
  
  centerStyle = {
    position: "relative",
    left: "100px"
  }

  descStyle = {
    position: "relative",
    left: "20px"
  }

  factoryStyle = {
    position: "relative",
    left: "60px"
  }

  getSalesBySellerType() {

    const {sellerType} = this.props;

    
    if (sellerType === 'tank')
    {
      const _tankCards = this.state.itemsForSale.filter(sale => !(allComponents.includes(sale.name)))

      return (
        <TankCards 
          sellerType={sellerType} 
          tanks={_tankCards}
          buyItem={this.buyItem} 
          postsPerPage={this.state.postsPerPage} 
          totalPosts={this.state.totalPosts}
          findTank={this.findTank}
          isMaster={this.isMaster}
        />
      )
    }
    else if (sellerType === 'casusCode')
    {
      const _casusCodeCards = this.state.casusCodeForSale.filter(sale => !(allComponents.includes(sale.name)));

      return (
        <CasusCards 
          sellerType={sellerType} 
          casusCode={_casusCodeCards}
          buyItem={this.buyItem} 
          postsPerPage={this.state.postsPerPageCasus} 
          totalPosts={this.state.totalPosts}
          findCasus={this.findCasus}
          userTanks={this.state.userTanks}
          userId={this.state.userId}
          getSales={this.getSales}
          onItemBought={this.props.onItemBought}
          isMaster={this.isMaster}
        />
      )
    }
    else
    {

      const _itemCards = this.state.itemsForSale.filter(sale => allComponents.includes(sale.name) && getComponentType(verifyComponent(sale.name)) === sellerType);

      return (
        <ItemCards 
          sellerType={sellerType} 
          items={_itemCards} 
          buyItem={this.buyItem} 
          postsPerPage={this.state.postsPerPage} 
          totalPosts={this.state.totalPosts}
          isMaster={this.isMaster}
        />
      )
    }
  }

  spinnerStyle = {
    opacity: "0.5",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
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

    if (this.state.loading)
    {
      return (
        <>
          <br/><br/><br/><br/>
          <img style={this.spinnerStyle} src="/spinner.gif" alt=""/> 
        </>
      )
    }
    else {
      return (
        <Container fluid>
          <br/><br/>
          <h1 style={{textAlign: "center"}}>{this.formatTitle(this.props.sellerType)}</h1>
          <br/><br/><br/><br/>
          {this.state.itemsForSale.length === 0 ? <h5>No sales to load</h5> : this.getSalesBySellerType()}
          <ToastContainer />
        </Container>
      );
    }


  }

}

export default ListingsView;