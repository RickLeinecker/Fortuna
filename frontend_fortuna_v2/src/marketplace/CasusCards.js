import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import getMasterAccountId from '../globalComponents/getMasterAccountId.js';
import { toTitleCase } from '../globalComponents/Utility.js';
import Pagination from './Pagination.js'
import TankDisplay from '../tanks/TankDisplay.js';
import { imageLoaderInit } from '../battleground/ImageLoader.js';
import PurchaseCasusCode from './PurchaseCasusCode.js';

function CasusCards({ sellerType, casusCode, buyItem, postsPerPage, totalPosts, findCasus, userTanks, userId, getSales, onItemBought, isMaster }) {

  const [currentPage, setCurrentPage] = useState(1);

  const style = {
    width: "fit-content",
    backgroundColor: "#012074",
    border: "4px solid #1969e5",
    padding: "10px",
  }

  const colStyle = {
    padding: "5px",
    margin: "5px"
  }

  let casusToUse = null;
  
  const createCardCasus = (index, sellerId, saleName, price, amount, saleId, casusToUse) => {
    return (
      <Col md="auto" style={colStyle}>
        <Card style={style} key={index}>
          <Card.Header style={{textAlign: "center"}}>{isMaster(sellerId)}</Card.Header>
          <Card.Body style={{textAlign: "center"}}>
            <Card.Title>{saleName} Casus Code</Card.Title>
            <Card.Title>Price: ${price}</Card.Title>
            <Card.Title>Quantity: {amount}</Card.Title>
            <Card.Text>
              {casusToUse == null ? <div></div> : <img src="/scroll.png"/>}
              {casusToUse == null ? <div>Loading Casus Code...</div> : <PurchaseCasusCode selectedTank={casusToUse} usersTanks={userTanks} sellerId={sellerId} saleId={saleId} userId={userId} getSales={getSales} onItemBought={onItemBought} />}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
  }

  const casusList = casusCode.map((sale, index) => {
    casusToUse = findCasus(sale.tankId);
    return createCardCasus(index, sale.sellerId, sale.name, sale.price, sale.amount, sale.saleId, casusToUse)
  })

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCasusCodePosts = casusList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Row>
        <Col/>
          {currentCasusCodePosts}
        <Col/>
      </Row>
      <br/><br/><br/><br/>
      <div className="text-center">
          <Pagination 
            className="pagination" 
            postsPerPage={postsPerPage} 
            totalPosts={casusCode.length} 
            paginate={paginate} /> 
      </div>
    </>
  );
}

export default CasusCards
