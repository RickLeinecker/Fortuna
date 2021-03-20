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
    getUserAPICall(user => {
      setUserId(user.userId);
    })
  }, []);

  useEffect(() => {
    if (userId)
    {
      _getUsersCurrentSales();
    }
  }, [userId])

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

  const removeSaleItem = (index, saleName, price, amount, saleId, isCasusSale) => {
    return (
      <Col md="auto" style={colStyle} key={index}>
        <Card style={style}>
          <Card.Body>
            <Card.Title>{isCasus(isCasusSale, saleName)}</Card.Title>
            <Card.Title>Price: ${price}</Card.Title>
            <Card.Title>Quantity: {amount}</Card.Title>
            <Button variant="primary" onClick={() => removeSale(saleId)}>Remove</Button>
          </Card.Body>
        </Card>
      </Col>
    )
  }

  const salesRemoved = itemsForSale.filter(sale => sale).map((sale, index) => {
    return removeSaleItem(index, sale.name, sale.price, sale.amount, sale.saleId, sale.isCasusSale)
  })

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentRemovePosts = salesRemoved.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <h1 style={divStyle}>No Sales to Remove</h1>
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
                totalPosts={itemsForSale.length} 
                paginate={paginate} /> 
          </div>
        </>
      )
    }

}

export default RemoveASaleView