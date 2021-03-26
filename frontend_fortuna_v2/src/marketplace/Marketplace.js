//@flow strict

import * as React from 'react';
import './Marketplace.css';
import MainNavbar from '../globalComponents/MainNavbar.js';
import ListingsView from './ListingsView.js';
import MakeAComponentSaleView from './MakeAComponentSaleView.js';
import MakeATankSaleView from './MakeATankSaleView.js';
import MakeCasusCodeSaleView from './MakeCasusCodeSaleView.js';
import RemoveASaleView from './RemoveASaleView.js';
import type { MarketplaceViewType } from '../globalComponents/typesAndClasses/MarketplaceViewType.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import JoyRide from "react-joyride";
import getFirstTimeMarketplaceAPICall from "../globalComponents/apiCalls/getFirstTimeMarketplaceAPICall";
import setFirstTimeMarketplaceAPICall from "../globalComponents/apiCalls/setFirstTimeMarketplaceAPICall";
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

type Props = {||};

type State = {|
	marketplaceViewClicked: ?MarketplaceViewType,
|};


// Marketplace component.
class Marketplace extends React.Component<Props, State> {

	componentDidMount(): void {
		//getFirstTimeMarketplaceAPICall((res) => {
		//	console.log("RES: ", res);
		//	this.setState({run:res});
		//})

		setFirstTimeMarketplaceAPICall();
	}

	constructor() {
		super();
		verifyLogin();
		this.state = {
			marketplaceViewClicked: null,
			tour_steps: [
				{
					target: ".title",
					content: "Welcome to the Marketplace!"
				},
				{
					target: ".weapons",
					content: "Here you can buy different weapons, each with their own advantages and disadvantages versus enemy tanks"
				},
				{
					target: ".scanners",
					content: "Scanners help you detect enemy tanks. Their range is dependent on what tier you purchase, so save up to get a easy advantage!"
				},
				{
					target: ".scanneraddons",
					content: "These are enhancements for your scanner that can be used to scan for traps or prevent your scanner from being jammed"
				},
				{
					target: ".chassis",
					content: "Chassis determine how much armor and speed your tanks have, so try out different chassis for different play styles!"
				},
				{
					target: ".jammers",
					content: "Jammers function similar to scanners, but counter enemy scanners instead of revealing enemy tanks"
				},
				{
					target: ".treads",
					content: "Treads can add armor or speed to help out a bulky chassis move faster or a speedy chassis get additional armor "
				},
				{
					target: ".items",
					content: "Items give some extra versatility and functionality in battle such as speed boosting heal, mines, etc..."
				},
				{
					target: ".casus",
					content: "Buy another players Casus code and modify it as your own! Be sure to check the code to make sure you have the necessary equipment to make the code work"
				},
				{
					target: ".tanks",
					content: "Have a lot of money but struggling with battles? Purchase another players tank that comes with their coded casus code!"
				},
				{
					target: ".sellcomponent",
					content: "Sell any component on the marketplace for other players to purchase"
				},
				{
					target: ".sellcasus",
					content: "Sell your own Casus code to make some cash just for programming! Just like real life!"
				},
				{
					target: ".selltank",
					content: "Sell you any tanks you own with their currently attached equipment and Casus code"
				},
				{
					target: ".remove",
					content: "And click here to remove any sale you have up on the marketplace"
				},
			],
			run: true
		}

		this.resetPageView = this.resetPageView.bind(this);



		};





	// When a transaction takes place, update the navbar currency.
	onMoneyChanged = (): void => {
		const navbar = this.refs.navbar;
		navbar.reloadNavbar();
	}


  resetPageView = () => {
    this.setState({ marketplaceViewClicked: null });
  }

  divStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    textAlign: "center",
    right: "70px",
    position: "relative"
  }

	render(): React.Node {
		// Partview stores the current listings that are shown.
		let partView = null;
		switch(this.state.marketplaceViewClicked) {
			case 'chassis':
				partView = (<ListingsView sellerType='chassis' onItemBought={this.onMoneyChanged} />);
				break;
			case 'weapon':
				partView = (<ListingsView sellerType='weapon' onItemBought={this.onMoneyChanged} />);
				break;
			case 'scanner':
				partView = (<ListingsView sellerType='scanner' onItemBought={this.onMoneyChanged} />);
				break;
			case 'scannerAddon':
				partView = (<ListingsView sellerType='scannerAddon' onItemBought={this.onMoneyChanged} />);
				break;
			case 'jammer':
				partView = (<ListingsView sellerType='jammer' onItemBought={this.onMoneyChanged} />);
				break;
			case 'treads':
				partView = (<ListingsView sellerType='treads' onItemBought={this.onMoneyChanged} />);
				break;
			case 'item':
				partView = (<ListingsView sellerType='item' onItemBought={this.onMoneyChanged} />);
				break;
			case 'casusCode':
				partView = (<ListingsView sellerType='casusCode' onItemBought={this.onMoneyChanged} />);
				break;
			case 'tank':
				partView = (<ListingsView sellerType='tank' onItemBought={this.onMoneyChanged} />);
				break;
			case 'casusBlock':
				partView = (<ListingsView sellerType='casus' onItemBought={this.onMoneyChanged} />);
				break;
			case 'makeAComponentSale':
				partView = (<MakeAComponentSaleView onItemSold={this.onMoneyChanged} />);
				break;
			case 'makeCasusCodeSale':
				partView = (<MakeCasusCodeSaleView onItemSold={this.onMoneyChanged} />);
				break;
			case 'makeATankSale':
				partView = (<MakeATankSaleView onItemSold={this.onMoneyChanged} />);
				break;
			case 'removeASale':
				partView = (<RemoveASaleView />);
				break;
			default:
				partView = (<h2>Select a type</h2>);
				break;
		}

    if (this.state.marketplaceViewClicked)
    {
      return (
        <div className='background-image'>
          <MainNavbar
            linkName="/Marketplace"
            returnName="Back to MarketPlace"
            pageName="Marketplace"
            ref="navbar"
            resetMpPageView={this.resetPageView}
          />
          {partView}
        </div>
      )
    }
    else {
        return (
          <div id="Parent" className='background-image'>
            <MainNavbar
              linkName="/Login"
              returnName="Logout"
              pageName="Marketplace"
              ref="navbar"
            />
            <br/>
            <br/>
            <br/>
            <Container>
              <h1 style={this.divStyle} className="title">Buy</h1>
              <br/>
              <Row fluid>
                <Col md={4}><button className="marketBtn weapons"  onClick={() => this.setState({marketplaceViewClicked:'weapon'})}>Weapons</button></Col>
                <Col md={4}><button className="marketBtn scanners" onClick={() => this.setState({marketplaceViewClicked:'scanner'})}>Scanners</button></Col>
                <Col md={4}><button className="marketBtn scanneraddons" onClick={() => this.setState({marketplaceViewClicked:'scannerAddon'})}>Scanner Add-Ons</button></Col>
              </Row>
              <br/>
              <br/>
              <Row fluid>
                <Col><button className="marketBtn chassis" onClick={() => this.setState({marketplaceViewClicked:'chassis'})}>Chassis</button></Col>
                <Col><button className="marketBtn jammers" onClick={() => this.setState({marketplaceViewClicked:'jammer'})}>Jammers</button></Col>
                <Col><button className="marketBtn treads" onClick={() => this.setState({marketplaceViewClicked:'treads'})}>Treads</button></Col>
              </Row>
              <br/>
              <br/>
              <Row fluid>
                <Col><button className="marketBtn items" onClick={() => this.setState({marketplaceViewClicked:'item'})}>Items</button></Col>
                <Col><button className="marketBtn casus" onClick={() => this.setState({marketplaceViewClicked:'casusCode'})}>Casus Code</button></Col>
                <Col><button className="marketBtn tanks" onClick={() => this.setState({marketplaceViewClicked:'tank'})}>Tanks</button></Col>
              </Row>
            </Container>
            <br/>
            <br/>
            <Container>
              <h1 style={this.divStyle}>Sell</h1>
              <br/>
              <Row fluid>
                <Col md={3}><button className="marketBtn sellcomponent" onClick={() => this.setState({marketplaceViewClicked:'makeAComponentSale'})}>Sell a Component</button></Col>
                <Col md={3}><button className="marketBtn sellcasus" onClick={() => this.setState({marketplaceViewClicked:'makeCasusCodeSale'})}>Sell Casus Code</button></Col>
                <Col md={3}><button className="marketBtn selltank" onClick={() => this.setState({marketplaceViewClicked:'makeATankSale'})}>Sell a Tank</button></Col>
                <Col md={3}><button className="marketBtn remove" onClick={() => this.setState({marketplaceViewClicked:'removeASale'})}>Remove a Sale</button></Col>
              </Row>
            </Container>
			  <JoyRide
				  steps={this.state.tour_steps}
				  run={this.state.run}
				  continuous={true}
				  styles={{
					  options: {
						  zIndex: 1000,
						  spotlightShadow: 'blue'
					  }
				  }}
			  />
          </div>
        );
      }
    }

}

export default Marketplace;
