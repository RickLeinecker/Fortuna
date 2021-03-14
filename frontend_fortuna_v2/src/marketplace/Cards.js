import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import getMasterAccountId from '../globalComponents/getMasterAccountId.js';
import { toTitleCase } from '../globalComponents/Utility.js';
import Pagination from './Pagination.js'





function Cards({ items, buyItem, postsPerPage, totalPosts }) {

  const [cardsToDisplay, setCardsToDisplay] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);





  const testCard = () =>(
    <Card style={{width: "fit-content"}}>
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
  
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
  
  const createCard = (index, sellerId, saleName, description, price, amount, saleId, buyItem) => {
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

  
  
  const test = items.map((sale, index) => createCard(index, sale.sellerId, sale.name, sale.itemDesc, sale.price, sale.amount, sale.saleId, buyItem))

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentItemPosts = test.slice(indexOfFirstPost, indexOfLastPost);

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

export default Cards
