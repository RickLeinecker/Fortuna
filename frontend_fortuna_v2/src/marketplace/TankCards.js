import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import getMasterAccountId from '../globalComponents/getMasterAccountId.js';
import { toTitleCase } from '../globalComponents/Utility.js';
import Pagination from './Pagination.js'
import TankDisplay from '../tanks/TankDisplay.js';
import { imageLoaderInit } from '../battleground/ImageLoader.js';

function TankCards({sellerType, tanks, buyItem, postsPerPage, totalPosts, findTank, isMaster}) {
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

  let tankToUse = null;

  const createCardTank = (index, sellerId, price, amount, saleId, buyItem, tankToUse) => {
    return (
      <Col md="auto" style={colStyle}>
        <Card style={style} key={index}>
          <Card.Header>{isMaster(sellerId)}</Card.Header>
          <Card.Body>
            {tankToUse == null ? <h5>Loading Tank... </h5> : 
              <>
                <Card.Title>{tankToUse.tankName}</Card.Title>
                <Card.Title>Quantity: ${amount}</Card.Title>
                <Card.Title>Price: ${price}</Card.Title>
              </>
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

  const tankList = tanks.map((sale, index) => {
    tankToUse = findTank(sale.name);
    console.log("tank: ", tankToUse)
    return createCardTank(index, sale.sellerId, sale.price, sale.amount, sale.saleId, buyItem, tankToUse);
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTankPosts = tankList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
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
            totalPosts={tanks.length} 
            paginate={paginate} /> 
      </div>
    </>
  );
}

export default TankCards
