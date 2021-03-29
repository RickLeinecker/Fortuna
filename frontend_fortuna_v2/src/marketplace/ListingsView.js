//@flow strict
import * as React from 'react';
import { getComponentType, verifyComponent } from '../globalComponents/GetInventoryInfo.js';
import type{ SellingType } from '../globalComponents/typesAndClasses/SellingType.js';
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
	sellerDesc: '',
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
    this.getSalesTypeDesc = this.getSalesTypeDesc.bind(this);
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
    this.setState({ loading: true })
		marketSale(this.state.userId, sellerId, saleId, success => {
			toast.success("Item Purchased.");
			this.props.onItemBought();
			this.getSales();
      this.setState({ loading: false })
		},() =>{
			this.setState({loading:false})
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

	sellerDesc: "";

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
  getSalesTypeDesc(salesType){
	  switch(salesType){
		  case 'weapon' :
			  this.sellerDesc = 'Here you can buy different weapons, each with their own advantages and disadvantages versus enemy tanks'
			  break;
		  case 'scanner' :
			  this.sellerDesc = 'Scanners help you detect enemy tanks. Their range is dependent on what tier you purchase, so save up to get a easy advantage!'
			  break;
		  case 'scannerAddon' :
			  this.sellerDesc = 'These are enhancements for your scanner that can be used to scan for traps or prevent your scanner from being jammed'
			  break;
		  case 'chassis' :
			  this.sellerDesc = 'Chassis determine how much armor and speed your tanks have, so try out different chassis for different play styles!'
			  break;
		  case 'jammer' :
			  this.sellerDesc = 'Jammers function similar to scanners, but counter enemy scanners instead of revealing enemy tanks'
			  break;
		  case 'treads' :
			  this.sellerDesc = 'Treads can add armor or speed to help out a bulky chassis move faster or a speedy chassis get additional armor'
			  break;
		  case 'item' :
			  this.sellerDesc = 'Items give some extra versatility and functionality in battle such as speed boosting heal, mines, etc...'
			  break;
		  case 'casusCode' :
			  this.sellerDesc = 'Buy another players Casus code and modify it as your own! Be sure to check the code to make sure you have the necessary equipment to make the code work'
			  break;
		  case 'tank' :
			  this.sellerDesc = 'Have a lot of money but struggling with battles? Purchase another players tank that comes with their coded casus code!'
			  break;
		  case 'casusBlock' :
			  this.sellerDesc = 'Chassis determine how much armor and speed your tanks have, so try out different chassis for different play styles!'
			  break;
		  case 'makeAComponentSale' :
			  this.sellerDesc = 'Sell any component on the marketplace for other players to purchase'
			  break;
		  case 'makeCasusCodeSale' :
			  this.sellerDesc = 'Sell your own Casus code to make some cash just for programming! Just like real life!'
			  break;
		  case 'makeATankSale' :
			  this.sellerDesc = 'Sell you any tanks you own with their currently attached equipment and Casus code'
			  break;
		  case 'removeASale' :
			  this.sellerDesc = 'And click here to remove any sale you have up on the marketplace'
			  break;
		  default :
			  this.sellerDesc = ''
			  break;
	  }
	  return this.sellerDesc
  }
	style1 = {
		width: "fit-content",
		backgroundColor: "#012074",
		border: "4px solid #1969e5",
		padding: "10px",
		textAlign: "center"
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
			<br/>
			<div className="description">
			<h3 style={this.style1}>{this.getSalesTypeDesc(this.props.sellerType)}</h3>
			</div>
          <br/><br/><br/><br/>
          {this.state.itemsForSale.length === 0 ? <h5>No sales to load</h5> : this.getSalesBySellerType()}
          <ToastContainer />
        </Container>
      );
    }


  }

}

export default ListingsView;