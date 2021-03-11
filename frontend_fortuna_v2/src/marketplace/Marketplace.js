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
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

type Props = {||};

type State = {|
	marketplaceViewClicked: ?MarketplaceViewType,
|};


// Marketplace component.
class Marketplace extends React.Component<Props, State> {

	componentDidMount(): void {
		document.body.style.backgroundImage = "url('/login_background.gif')"
	}

	constructor() {
		super();
		verifyLogin();
		this.state = {
			marketplaceViewClicked: null
		}

    this.resetPageView = this.resetPageView.bind(this);
	}

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
        <>
          <MainNavbar
            linkName="/Marketplace"
            returnName="Back to MarketPlace"
            pageName="Marketplace"
            ref="navbar"
            resetMpPageView={this.resetPageView}
          />
          {partView}
        </>
      )
    }
    else {
        return (
          <div id="Parent">
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
              <h1 style={this.divStyle}>Buy</h1>
              <br/>
              <Row fluid>
                <Col md={4}><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'weapon'})}>Weapons</button></Col>
                <Col md={4}><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'scanner'})}>Scanners</button></Col>
                <Col md={4}><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'scannerAddon'})}>Scanner Add-Ons</button></Col>
              </Row>
              <br/>
              <br/>
              <Row fluid>
                <Col><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'chassis'})}>Chassis</button></Col>
                <Col><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'jammer'})}>Jammers</button></Col>
                <Col><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'treads'})}>Treads</button></Col>
              </Row>
              <br/>
              <br/>
              <Row fluid>
                <Col><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'item'})}>Items</button></Col>
                <Col><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'casusCode'})}>Casus Code</button></Col>
                <Col><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'tank'})}>Tanks</button></Col>
              </Row>
            </Container>
            <br/>
            <br/>
            <Container>
              <h1 style={this.divStyle}>Sell</h1>
              <br/>
              <Row fluid>
                <Col md={3}><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'makeAComponentSale'})}>Sell a Component</button></Col>
                <Col md={3}><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'makeCasusCodeSale'})}>Sell Casus Code</button></Col>
                <Col md={3}><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'makeATankSale'})}>Sell a Tank</button></Col>
                <Col md={3}><button className="marketBtn" onClick={() => this.setState({marketplaceViewClicked:'removeASale'})}>Remove a Sale</button></Col>
              </Row>
            </Container>
          </div>
        );
      }
    }

}

export default Marketplace;
