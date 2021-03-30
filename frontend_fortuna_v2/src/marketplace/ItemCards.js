import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FORWARD_MOVEMENT_VAR_NAME } from '../casus/userInteraction/CasusSpecialVariables.js';
import Pagination from './Pagination.js'





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
    margin: "5px"
  }

  // Format itemCard title names
  const formatTitle = (title) => {
    let formattedTitle = title.replace(/([a-z])([A-Z])/g, '$1 $2');
    formattedTitle = formattedTitle.charAt(0).toUpperCase() + formattedTitle.substring(1);
    return formattedTitle;
  }

  const createCardItem = (index, sellerId, saleName, description, price, amount, saleId, buyItem) => {
    return (
      <Col md="auto" style={colStyle}>
        <Card style={cardStyle} key={index}>
          <Card.Header>{isMaster(sellerId)}</Card.Header>
          <Card.Body>
            <Card.Title> {formatTitle(saleName)} </Card.Title>
            <Card.Title>Price: ${price} Quantity: {amount}</Card.Title>
            <Card.Text style={{}}>
              {description}
            </Card.Text>
            <Button variant="primary" onClick={() => buyItem(sellerId, saleId)}>Buy</Button>
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
