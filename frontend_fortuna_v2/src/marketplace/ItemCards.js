import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FORWARD_MOVEMENT_VAR_NAME } from '../casus/userInteraction/CasusSpecialVariables.js';
import Pagination from './Pagination.js'
import ListingsView from "./ListingsView";
import MakeAComponentSaleView from "./MakeAComponentSaleView";
import MakeCasusCodeSaleView from "./MakeCasusCodeSaleView";
import MakeATankSaleView from "./MakeATankSaleView";
import RemoveASaleView from "./RemoveASaleView";





function ItemCards({ sellerType, items, buyItem, postsPerPage, totalPosts, isMaster }) {


  const [currentPage, setCurrentPage] = useState(1);

  const cardStyle = {
    width: "fit-content",
    backgroundColor: "#012074",
    border: "4px solid #1969e5",
    padding: "10px",

  }

  const colStyle = {
    padding: "5px",
    margin: "5px",

  }

  // Format itemCard title names
  const formatTitle = (title) => {
    let formattedTitle = title.replace(/([a-z])([A-Z])/g, '$1 $2');
    formattedTitle = formattedTitle.charAt(0).toUpperCase() + formattedTitle.substring(1);
    return formattedTitle;
  }



  const createCardItem = (index, sellerId, saleName, description, price, amount, saleId, buyItem) => {



    let picture
    switch(saleName) {
      case 'machineGun':
        picture = (<img src="/Gun2.png" width="100" height="100"/>);
        break;
      case 'grenadeLauncher':
        picture = (<img src="/Gun1.png" width="100" height="100"/>);
        break;
      case 'missile':
        picture = (<img src="/Gun9.png" width="100" height="100"/>);
        break;
      case 'laser':
        picture = (<img src="/Gun3.png" width="100" height="100"/>);
        break;
      case 'plasma':
        picture = (<img src="/Gun4.png" width="100" height="100"/>);
        break;
      case 'shotgun':
        picture = (<img src="/Gun7.png" width="100" height="100"/>);
        break;
      case 'lancer':
        picture = (<img src="/Gun8.png" width="100" height="100"/>);
        break;
      case 'vulcanCannon':
        picture = (<img src="/Gun5.png" width="100" height="100"/>);
        break;
      case 'pulseLaser':
        picture = (<img src="/Gun10.png" width="100" height="100"/>);
        break;
      case 'deathRay':
        picture = (<img src="/Gun6.png" width="100" height="100"/>);
        break;
      case 'shortRangeScanner':
        picture = (<img src="/scannerSmall.png" width="100" height="100"/>);
        break;
      case 'mediumRangeScanner':
        picture = (<img src="/MediumScanner.png" width="100" height="100"/>);
        break;
      case 'longRangeScanner':
        picture = (<img src="/LargeScanner.png" width="100" height="100"/>);
        break;
      case 'antiJammerScanner':
        picture = (<img src="/AntiJammerBubble.png" width="100" height="100"/>);
        break;
      case 'itemScanner':
        picture = (<img src="/LargeItemsScanner.png" width="100" height="100"/>);
        break;
      case 'moddable':
        picture = (<img src="/Chassis3.png" width="100" height="100"/>);
        break;
      case 'moddableLight':
        picture = (<img src="/Chassis5.png" width="100" height="100"/>);
        break;
      case 'moddableHeavy':
        picture = (<img src="/Chassis4.png" width="100" height="100"/>);
        break;
      case 'light':
        picture = (<img src="/Chassis1Blue.png" width="100" height="100"/>);
        break;
      case 'heavy':
        picture = (<img src="/Chassis2.png" width="100" height="100"/>);
        break;
      case 'shortRangeJammer':
        picture = (<img src="/JammerSmall.png" width="100" height="100"/>);
        break;
      case 'mediumRangeJammer':
        picture = (<img src="/JammerMedium.png" width="100" height="100"/>);
        break;
      case 'longRangeJammer':
        picture = (<img src="/JammerLarge.png" width="100" height="100"/>);
        break;
      case 'armoredTreads':
        picture = (<img src="/Tread4.png" width="100" height="100"/>);
        break;
      case 'heavilyArmoredTreads':
        picture = (<img src="/Tread1Gray.png" width="100" height="100"/>);
        break;
      case 'fastTreads':
        picture = (<img src="/Tread3.png" width="100" height="100"/>);
        break;
      case 'advancedTreads':
        picture = (<img src="/Tread2.png" width="100" height="100"/>);
        break;
      case 'overdrive':
        picture = (<img src="/Electricity.png" width="100" height="100"/>);
        break;
      case 'mine':
        picture = (<img src="/mine.png" width="100" height="100"/>);
        break;
      case 'c4':
        picture = (<img src="/c4.png" width="100" height="100"/>);
        break;
      case 'nitroRepair':
        picture = (<img src="/GreenParticle.png" width="100" height="100"/>);
        break;
      case 'missileTrackingBeacon':
        picture = (<img src="/MissileTrackingDart.png" width="100" height="100"/>);
        break;

      default:
        break;
    }


    return (
      <Col md="auto" style={colStyle}>
        <Card  style={cardStyle} key={index}>
          <Card.Header style={{textAlign: "center"}}>{isMaster(sellerId)}</Card.Header>
          <Card.Body style={{textAlign: "center"}}>
            <Card.Title> {formatTitle(saleName)} </Card.Title>
            <Card.Title>Price: ${price} Quantity: {amount}</Card.Title>
            <Card.Text >
              {picture}
              <br/>
              {description}
            </Card.Text>
            <Button  variant="primary" onClick={() => buyItem(sellerId, saleId)}>Buy</Button>
          </Card.Body>
        </Card>
      </Col>

    )
  }

  // list of sales based on seller type
  const saleList = items.map((sale, index) => createCardItem(index, sale.sellerId, sale.name, sale.itemDesc, sale.price, sale.amount, sale.saleId, buyItem));

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentItemPosts = saleList.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Row>
        <Col/>
          {currentItemPosts}
        <Col/>
      </Row>
      <br/><br/><br/><br/>
      <div className="text-center">
          <Pagination 
            className="pagination" 
            postsPerPage={postsPerPage} 
            totalPosts={items.length} 
            paginate={paginate} /> 
      </div>
    </>
  );


}

export default ItemCards
