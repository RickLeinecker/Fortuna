//@flow strict
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toTitleCase } from '../globalComponents/Utility.js';
import SaleObject from '../globalComponents/typesAndClasses/SaleObject.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import { getUsersCurrentSales, removeASale } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';
import { allComponents } from '../globalComponents/typesAndClasses/TankComponent.js';
import Pagination from './Pagination.js';
import { getComponentType, verifyComponent } from '../globalComponents/GetInventoryInfo.js';
import { Spinner, Card, Container, Row, Col, Button } from 'react-bootstrap';
import getMasterAccountId from '../globalComponents/getMasterAccountId.js';

function RemoveASaleView() {

  const [userId, setUserId] = useState('');
  const [itemsForSale, setItemsForSale] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserAPICall(user => {
      setUserId(user.userId);
    })
  }, []);

  useEffect(() => {
    if (userId)
    {
      _getUsersCurrentSales();
    }
  }, [userId]);

  const _getUsersCurrentSales = () => {
    setLoading(true);
    getUsersCurrentSales(userId, data => {
      setItemsForSale(data);
      setLoading(false);
    })
  }

  const removeSale = (saleId) => {
    removeASale(saleId, () => {
      _getUsersCurrentSales();
    })
  }

  const divStyle = {
    textAlign: "center",
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black"
  }

  const cardStyle = {
    width: "fit-content",
    backgroundColor: "#012074",
    border: "4px solid #1969e5",
    padding: "10px",
  }

  const colStyle = {
    padding: "5px",
    margin: "5px"
  }

  const spinnerStyle = {
    opacity: "0.5",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }

  const isCasus = (isCasusSale, saleName) => {
    return isCasusSale ? 
      `${toTitleCase(saleName)}'s Casus Code` :
      `${toTitleCase(saleName)}`
  }

  const getImage = (saleName) => {

    switch(saleName) {
      case 'machineGun':
        return (<img src="/Gun2.png" width="100" height="100"/>);
      case 'grenadeLauncher':
        return (<img src="/Gun1.png" width="100" height="100"/>);
      case 'missile':
        return (<img src="/Gun9.png" width="100" height="100"/>);
      case 'laser':
        return (<img src="/Gun3.png" width="100" height="100"/>);
      case 'plasma':
        return (<img src="/Gun4.png" width="100" height="100"/>);
      case 'shotgun':
        return (<img src="/Gun7.png" width="100" height="100"/>);
      case 'lancer':
        return (<img src="/Gun8.png" width="100" height="100"/>);
      case 'vulcanCannon':
        return (<img src="/Gun5.png" width="100" height="100"/>);
      case 'pulseLaser':
        return (<img src="/Gun10.png" width="100" height="100"/>);
      case 'deathRay':
        return (<img src="/Gun6.png" width="100" height="100"/>);
      case 'shortRangeScanner':
        return (<img src="/scannerSmall.png" width="100" height="100"/>);
      case 'mediumRangeScanner':
        return (<img src="/MediumScanner.png" width="100" height="100"/>);
      case 'longRangeScanner':
        return (<img src="/LargeScanner.png" width="100" height="100"/>);
      case 'antiJammerScanner':
        return (<img src="/AntiJammerBubble.png" width="100" height="100"/>);
      case 'itemScanner':
        return (<img src="/LargeItemsScanner.png" width="100" height="100"/>);
      case 'moddable':
        return (<img src="/Chassis3.png" width="100" height="100"/>);
      case 'moddableLight':
        return (<img src="/Chassis5.png" width="100" height="100"/>);
      case 'moddableHeavy':
        return (<img src="/Chassis4.png" width="100" height="100"/>);
      case 'light':
        return (<img src="/Chassis1Blue.png" width="100" height="100"/>);
      case 'heavy':
        return (<img src="/Chassis2.png" width="100" height="100"/>);
      case 'shortRangeJammer':
        return (<img src="/JammerSmall.png" width="100" height="100"/>);
      case 'mediumRangeJammer':
        return (<img src="/JammerMedium.png" width="100" height="100"/>);
      case 'longRangeJammer':
        return (<img src="/JammerLarge.png" width="100" height="100"/>);
      case 'armoredTreads':
        return (<img src="/Tread4.png" width="100" height="100"/>);
      case 'heavilyArmoredTreads':
        return (<img src="/Tread1Gray.png" width="100" height="100"/>);
      case 'fastTreads':
        return (<img src="/Tread3.png" width="100" height="100"/>);
      case 'advancedTreads':
        return (<img src="/Tread2.png" width="100" height="100"/>);
      case 'overdrive':
        return (<img src="/Electricity.png" width="100" height="100"/>);
      case 'mine':
        return (<img src="/mine.png" width="100" height="100"/>);
      case 'c4':
        return (<img src="/c4.png" width="100" height="100"/>);
      case 'nitroRepair':
        return (<img src="/GreenParticle.png" width="100" height="100"/>);
      case 'missileTrackingBeacon':
        return (<img src="/MissileTrackingDart.png" width="100" height="100"/>);
      default:
        return;
    }
  }


  const removeSaleItem = (index, saleName, price, amount, saleId, isCasusSale, description) => {

    return (
      <Col md="auto" style={colStyle} key={index}>
        <Card style={cardStyle}>
          <Card.Body style={{textAlign: "center"}}>
            <Card.Title>{isCasus(isCasusSale, saleName)}</Card.Title>
            <Card.Title>Price: ${price}</Card.Title>
            <Card.Title>Quantity: {amount}</Card.Title>
            <Card.Text>
              {getImage(saleName)}
              <br/>
              {description}
            </Card.Text>
            <Button variant="primary" onClick={() => removeSale(saleId)}>Remove</Button>
          </Card.Body>
        </Card>
      </Col>
    )
  }

  const salesRemoved = itemsForSale.filter(sale => sale).map((sale, index) => {
    return removeSaleItem(index, sale.name, sale.price, sale.amount, sale.saleId, sale.isCasusSale, sale.itemDesc)
  })

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentRemovePosts = salesRemoved.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    if (loading)
    {
      return (
        <>
          <br/><br/><br/><br/>
          <img style={spinnerStyle} src="/spinner.gif" alt=""/> 
        </>
      )
    }
    else if (salesRemoved.length === 0)
    {
      return (
        <>
          <br/><br/>
          <h1 style={divStyle}>You have no sales on the market!</h1>
        </>
      )
    }
    else {
      return (
        <>
          <br/><br/>
          <h1 style={divStyle}>Available Sales to Remove</h1>
          <br/><br/>
          <Row>
            <Col/>
              {currentRemovePosts}
            <Col/>
          </Row>
          <br/><br/><br/><br/>
          <div className="text-center">
            <Pagination 
              className="pagination" 
              postsPerPage={postsPerPage}
              totalPosts={salesRemoved.length} 
              paginate={paginate} /> 
          </div>
        </>
      )
    }

}

export default RemoveASaleView