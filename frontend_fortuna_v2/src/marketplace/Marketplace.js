//@flow strict

import React, { useState, useEffect, useRef } from 'react';
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
import { TweenMax, Power3, TweenLite } from 'gsap'

function Marketplace() {

  const [marketplaceViewClicked, setMarketplaceViewClicked] = useState(null);
  const [tourSteps, setTourSteps] = useState([

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

  ])
  let navbarRef = useRef(null);
  let buyDown = useRef(null);
  let sellUp = useRef(null);

  useEffect(() => {
    verifyLogin();
    document.body.style.backgroundImage = "url('/login_background.gif')"

    TweenLite.from(buyDown, 1, {opacity: 0, y: -200, ease: Power3.easeInOut});
    TweenLite.from(sellUp, 1, {opacity: 0, y: 200, ease: Power3.easeInOut});

  }, [])

  const divStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    textAlign: "center",
    right: "70px",
    position: "relative"
  }

  const onMoneyChanged = () => {
    const navbar = navbarRef.current;
    navbar.reloadNavbar();
  }

  const resetPageView = () => {
    setMarketplaceViewClicked(null);
  }

  let partView = null;
  switch(marketplaceViewClicked) {
    case 'chassis':
      partView = (<ListingsView sellerType='chassis' onItemBought={onMoneyChanged} />);
      break;
    case 'weapon':
      partView = (<ListingsView sellerType='weapon' onItemBought={onMoneyChanged} />);
      break;
    case 'scanner':
      partView = (<ListingsView sellerType='scanner' onItemBought={onMoneyChanged} />);
      break;
    case 'scannerAddon':
      partView = (<ListingsView sellerType='scannerAddon' onItemBought={onMoneyChanged} />);
      break;
    case 'jammer':
      partView = (<ListingsView sellerType='jammer' onItemBought={onMoneyChanged} />);
      break;
    case 'treads':
      partView = (<ListingsView sellerType='treads' onItemBought={onMoneyChanged} />);
      break;
    case 'item':
      partView = (<ListingsView sellerType='item' onItemBought={onMoneyChanged} />);
      break;
    case 'casusCode':
      partView = (<ListingsView sellerType='casusCode' onItemBought={onMoneyChanged} />);
      break;
    case 'tank':
      partView = (<ListingsView sellerType='tank' onItemBought={onMoneyChanged} />);
      break;
    case 'casusBlock':
      partView = (<ListingsView sellerType='casus' onItemBought={onMoneyChanged} />);
      break;
    case 'makeAComponentSale':
      partView = (<MakeAComponentSaleView onItemSold={onMoneyChanged} />);
      break;
    case 'makeCasusCodeSale':
      partView = (<MakeCasusCodeSaleView onItemSold={onMoneyChanged} />);
      break;
    case 'makeATankSale':
      partView = (<MakeATankSaleView onItemSold={onMoneyChanged} />);
      break;
    case 'removeASale':
      partView = (<RemoveASaleView />);
      break;
    default:
      partView = (<h2>Select a type</h2>);
      break;
  }

  if (marketplaceViewClicked)
  {
    return (
      <>
        <MainNavbar
          linkName="/Marketplace"
          returnName="Back to MarketPlace"
          pageName="Marketplace"
          ref={navbarRef}
          resetMpPageView={resetPageView}
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
            ref={navbarRef}
          />
          <br/>
          <br/>
          <br/>
          <Container className="buy" ref={el => buyDown = el}>
            <h1 style={divStyle}>Buy</h1>
            <br/>
            <Row fluid>
              <Col md={4}><button className="marketBtn" onClick={() => setMarketplaceViewClicked('weapon')}>Weapons</button></Col>
              <Col md={4}><button className="marketBtn" onClick={() => setMarketplaceViewClicked('scanner')}>Scanners</button></Col>
              <Col md={4}><button className="marketBtn" onClick={() => setMarketplaceViewClicked('scannerAddon')}>Scanner Add-Ons</button></Col>
            </Row>
            <br/>
            <br/>
            <Row fluid>
              <Col><button className="marketBtn" onClick={() => setMarketplaceViewClicked('chassis')}>Chassis</button></Col>
              <Col><button className="marketBtn" onClick={() => setMarketplaceViewClicked('jammer')}>Jammers</button></Col>
              <Col><button className="marketBtn" onClick={() => setMarketplaceViewClicked('treads')}>Treads</button></Col>
            </Row>
            <br/>
            <br/>
            <Row fluid>
              <Col><button className="marketBtn" onClick={() => setMarketplaceViewClicked('item')}>Items</button></Col>
              <Col><button className="marketBtn" onClick={() => setMarketplaceViewClicked('casusCode')}>Casus Code</button></Col>
              <Col><button className="marketBtn" onClick={() => setMarketplaceViewClicked('tank')}>Tanks</button></Col>
            </Row>
          </Container>
          <br/>
          <br/>
          <Container className="sell" ref={el => sellUp = el}>
            <h1 style={divStyle}>Sell</h1>
            <br/>
            <Row fluid>
              <Col md={3}><button className="marketBtn" onClick={() => setMarketplaceViewClicked('makeAComponentSale')}>Sell a Component</button></Col>
              <Col md={3}><button className="marketBtn" onClick={() => setMarketplaceViewClicked('makeCasusCodeSale')}>Sell Casus Code</button></Col>
              <Col md={3}><button className="marketBtn" onClick={() => setMarketplaceViewClicked('makeATankSale')}>Sell a Tank</button></Col>
              <Col md={3}><button className="marketBtn" onClick={() => setMarketplaceViewClicked('removeASale')}>Remove a Sale</button></Col>
            </Row>
          </Container>
        </div>
      );
    }
}

export default Marketplace