import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import getMasterAccountId from '../globalComponents/getMasterAccountId.js';
import { toTitleCase } from '../globalComponents/Utility.js';
import Pagination from './Pagination.js'
import TankDisplay from '../tanks/TankDisplay.js';





function Cards({ sellerType, items, buyItem, postsPerPage, postsPerPageCasus, totalPosts, findCasus, findTank }) {

  const [cardsToDisplay, setCardsToDisplay] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const sellingTypes = {
    TANK: 'tank',
    CASUS: 'casusCode'
  }
  
  const isMaster = (sellerId) => {
    if (sellerId === getMasterAccountId())
    {
      return "Purchase From Factory";
    }
  }

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

  let tankToUse = null;
  let casusToUse = null;
  
  const createCardItem = (index, sellerId, saleName, description, price, amount, saleId, buyItem) => {
    return (
      <Col md="auto" style={colStyle}>
        <Card style={style} key={index}>
          <Card.Header>{() => isMaster(sellerId)}</Card.Header>
          <Card.Body>
            <Card.Title>Price: ${price} Quantity: {amount}</Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
            <Button variant="primary" onClick={() => buyItem(sellerId, saleId)}>Buy</Button>
          </Card.Body>
        </Card>
      </Col>

    )
  }

  const createCardTank = (index, sellerId, saleName, price, amount, saleId, buyItem, tankToUse) => {
    return (
      <Col md="auto" style={colStyle}>
        <Card style={style} key={index}>
          <Card.Header>{() => isMaster(sellerId)}</Card.Header>
          <Card.Body>
            {tankToUse == null ? <h5>Loading Tank... </h5> : 
              <Card.Title>
                {tankToUse.tankName}
                Price: ${price} Quantity: ${amount}
              </Card.Title>
            }
            <Card.Text>
              {tankToUse == null ? <div></div> : <TankDisplay tankToDisplay={tankToUse} smallTank={true} />}
            </Card.Text>
            <Button variant="primary" onClick={() => buyItem(sellerId, saleId)}>Buy</Button>
          </Card.Body>
        </Card>
      </Col>

    )
  }



  // list of sales based on seller type
  const saleList = items.map((sale, index) => createCardItem(index, sale.sellerId, sale.name, sale.itemDesc, sale.price, sale.amount, sale.saleId, buyItem))
  const tankList = items.map((sale, index) => {
    tankToUse = findTank(sale.tankId);
    createCardTank(index, sale.sellerId, sale.name, sale.price, sale.amount, sale.saleId, buyItem, tankToUse);
  })

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentItemPosts = saleList.slice(indexOfFirstPost, indexOfLastPost);
  const currentTankPosts = tankList.slice(indexOfFirstPost, indexOfLastPost);

  // casus has different posts per page
  const indexOfLastPostCasus = currentPage * postsPerPageCasus;
  const indexOfFirstPostCasus = indexOfLastPostCasus - postsPerPageCasus;
  // const currentCasusCodePosts = casusCodeCards.slice(indexOfFirstPostCasus, indexOfLastPostCasus);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (sellerType === sellingTypes.TANK)
  {
    return (
      <>
        <Row>
          <Col/>
          {currentTankPosts}
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
  else if (sellerType === sellingTypes.CASUS)
  {
    return (
      <>
        <Row>
          <Col/>
          {/*currentCasusCodePosts*/}
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
  else {
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


}

export default Cards
