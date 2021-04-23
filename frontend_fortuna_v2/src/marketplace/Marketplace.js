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
import JoyRide, {ACTIONS, EVENTS, STATUS} from 'react-joyride'
import getFirstTimeMarketplaceAPICall from "../globalComponents/apiCalls/getFirstTimeMarketplaceAPICall";
import setFirstTimeMarketplaceAPICall from "../globalComponents/apiCalls/setFirstTimeMarketplaceAPICall";
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { TweenMax, Power3 } from 'gsap';
import Modal from 'react-modal'
import { ToastContainer , toast } from 'react-toastify';

function Marketplace() {

  const [marketplaceViewClicked, setMarketplaceViewClicked] = useState(null);
  const [run, setRun] = useState(false);
  const [componentModalOpen, setComponentModalOpen] = useState(false);
  const [tankModalOpen, setTankModalOpen] = useState(false);
  const [casusModalOpen, setCasusModalOpen] = useState(false);
  const [tourSteps, setTourSteps] = useState([
      {
          target: ".buy",
          disableBeacon: true,
          content: "Welcome to the Marketplace! Use this section to buy components, items, code, and tanks to use in the battlefield!"
      },
    {
        target: ".casusCode",
        content: "Click here to buy some starter code that goes with their corresponding default starter tank."
    },
      {
          target: ".sell",
          content: "Sell anything you own or create to make some extra cash."

      }
  ]);

  let navbarRef = useRef(null);
  let buyDown = useRef(null);
  let sellUp = useRef(null);

  useEffect(() => {
    verifyLogin();

      getFirstTimeMarketplaceAPICall((res) => {
          console.log("RES: ", res);
          setRun(res);
          if(res == true)
          {
              setFirstTimeMarketplaceAPICall();
          }

      })


    Modal.setAppElement('body');
    
    TweenMax.from(buyDown, 1, {opacity: 0, y: -200, ease: Power3.easeInOut});
    TweenMax.from(sellUp, 1, {opacity: 0, y: 200, ease: Power3.easeInOut});

  }, []);

  const openModals = (choice) => {
    switch(choice)
    {
      case 'component':
        setComponentModalOpen(true);
        break;
      case 'tank':
        setTankModalOpen(true);
        break;
      case 'casus':
        setCasusModalOpen(true);
        break;
      default:
        break;
    }
  }

  const closeModals = (choice) => {
    switch(choice)
    {
      case 'component':
        setComponentModalOpen(false);
        break;
      case 'tank':
        setTankModalOpen(false);
        break;
      case 'casus':
        setCasusModalOpen(false);
        break;
      default:
        break;
    }
  }



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

  const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '20%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      backgroundColor: "#012074",
      borderStyle: "solid",
      maxHeight: "100vh"
    }
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
  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRun(false);
    }}

  const enableJoyride =  ()  => {
    let test = true
    setRun(test)
  }

  if (marketplaceViewClicked)
  {
    return (
      <div id="Parent" className='background-image'>
        <br/>
        <MainNavbar
          className='background-image'
          linkName="/Marketplace"
          returnName="Back to Marketplace"
          pageName="Marketplace"
          ref={navbarRef}
          resetMpPageView={resetPageView}
        />
        {partView}
      </div>
    )
  }
  else {
      return (
        <div id="Parent" className='background-image' title="rootMainMarket">
          <br/>
          <MainNavbar
            className='background-image'
            linkName="/Login"
            returnName="Logout"
            pageName="Marketplace"
            ref={navbarRef}
          />
          <div className="navbar">
            <div className="navhelp">
              <button className="navbtn" onClick={()=>enableJoyride()} >Need Help?</button>
            </div>

          </div>
          <br/>
          <br/>
          <br/>
          <Container className="buy" ref={el => buyDown = el} title="marketContainer1">
            <h1 style={divStyle}>Buy</h1>
            <br/>
            <Row >
              <Col md={4}><button className="marketBtn" onClick={() => setMarketplaceViewClicked('weapon')}>Weapons</button></Col>
              <Col md={4}><button className="marketBtn" onClick={() => setMarketplaceViewClicked('scanner')}>Scanners</button></Col>
              <Col md={4}><button className="marketBtn" onClick={() => setMarketplaceViewClicked('scannerAddon')}>Scanner Add-Ons</button></Col>
            </Row>
            <br/>
            <br/>
            <Row >
              <Col><button className="marketBtn" onClick={() => setMarketplaceViewClicked('chassis')}>Chassis</button></Col>
              <Col><button className="marketBtn" onClick={() => setMarketplaceViewClicked('jammer')}>Jammers</button></Col>
              <Col><button className="marketBtn" onClick={() => setMarketplaceViewClicked('treads')}>Treads</button></Col>
            </Row>
            <br/>
            <br/>
            <Row >
              <Col><button className="marketBtn" onClick={() => setMarketplaceViewClicked('item')}>Items</button></Col>
              <Col className="casusCode"><button className="marketBtn" onClick={() => setMarketplaceViewClicked('casusCode')}>Casus Code</button></Col>
              <Col><button className="marketBtn" onClick={() => setMarketplaceViewClicked('tank')}>Tanks</button></Col>
            </Row>
          </Container>
          <br/>
          <br/>
          <Container className="sell" ref={el => sellUp = el} title="marketContainer2">
            <h1 style={divStyle}>Sell</h1>
            <br/>
            <Row >
              <Col md={3}>
                <button className="marketBtn" onClick={() => openModals('component')}>Sell a Component</button>
                <Modal
                  isOpen={componentModalOpen}
                  style={customStyles}
                  contentLabel="Sell Component"
                >
                  <MakeAComponentSaleView onItemSold={onMoneyChanged} />
                  <br/><br/>
                  <button style={{width: "50%", position: "relative", left: "80px"}} className="marketBtn" onClick={() => closeModals('component')}>Close</button>
                </Modal>
              </Col>
              <Col md={3}>
                <button className="marketBtn" onClick={() => openModals('casus')}>Sell Casus Code</button>
                <Modal
                  isOpen={casusModalOpen}
                  style={customStyles}
                  contentLabel="Sell Casus"
                >
                  <MakeCasusCodeSaleView onItemSold={onMoneyChanged} />
                  <br /><br />
                  <button style={{width: "50%", position: "relative", left: "80px"}} className="marketBtn" onClick={() => closeModals('casus')}>Close</button>
                </Modal>
              </Col>
              <Col md={3}>
                <button className="marketBtn" onClick={() => openModals('tank')}>Sell a Tank</button>
                <Modal
                  isOpen={tankModalOpen}
                  style={customStyles}
                  contentLabel="Sell Tank"
                >
                  <MakeATankSaleView onItemSold={onMoneyChanged} />
                  <br /><br />
                  <button style={{width: "50%", position: "relative", left: "80px"}} className="marketBtn" onClick={() => closeModals('tank')}>Close</button>
                </Modal>
              </Col>
              <Col md={3}><button className="marketBtn" onClick={() => setMarketplaceViewClicked('removeASale')}>Remove a Sale</button></Col>
            </Row>
          </Container>
            <JoyRide
                steps={tourSteps}
                run={run}
                continuous={true}
                callback={handleJoyrideCallback}
                showSkipButton
                showProgress
                styles={{
                    options: {
                        zIndex: 1000,
                        spotlightShadow: 'blue'
                    }
                }}
            />
          <ToastContainer />
        </div>
      );
    }
}

export default Marketplace