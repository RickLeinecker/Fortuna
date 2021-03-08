//@flow strict
import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import { toTitleCase } from '../globalComponents/Utility.js';
import SaleObject from '../globalComponents/typesAndClasses/SaleObject.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import { getUsersCurrentSales, removeASale } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';
import { allComponents } from '../globalComponents/typesAndClasses/TankComponent.js';
import Pagination from './Pagination.js';
import { getComponentType, verifyComponent } from '../globalComponents/GetInventoryInfo.js';
import { Container, Row, Col } from 'react-bootstrap';
import getMasterAccountId from '../globalComponents/getMasterAccountId.js';

type Props = {|
	sellerType: SellingType,
	|}; 

type State = {|
	userId: string,
	itemsForSale: Array<SaleObject>
|};

class RemoveASaleView extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			userId: '',
			itemsForSale: [],
      currentPage: 1,
      postsPerPage: 3,
      totalPosts: 0
		}
	}

	componentDidMount(): void {
		//This gets the user's id and then gets the users current sales
		getUserAPICall(user => {
			this.setState({userId: user.userId}, this.getUsersCurrentSales);
		});
	}

	//This gets the users current sales
	getUsersCurrentSales() : void {
		getUsersCurrentSales(this.state.userId, data => {
			this.setState({itemsForSale: data});
		});
	};
	
	//This is the function to remove the tank sale from the marketplace
	removeSale (saleId: string): void {
		removeASale(saleId, () => {
			this.getUsersCurrentSales();
		});
	};

  divStyle = {
    textAlign: "center",
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  }

	render(): React.Node {

    const removeSales = this.state.itemsForSale.filter(sale => sale).map((sale, index) =>
      <div className="card mb-2" key={index}>
        <div className="card-body">
          {this.props.sellerType === 'casusCode' ? <h5 className="card-title">{toTitleCase(sale.name)}'s Casus Code</h5> : <h5 className="card-title">{toTitleCase(sale.name)}</h5> }
          <h5 className="card-title">Price: ${sale.price}</h5>
          <h5 className="card-title">Quantity: {sale.amount}</h5>
          <button className="btn btn-danger mt-2" onClick={() => this.removeSale(sale.saleId)}>Remove</button>
        </div>
      </div>
    );

		// Get current posts
		const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
		const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
		const currentRemovePosts = removeSales.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
		const paginate = (pageNumber) => this.setState({currentPage: pageNumber});

    return (
      <Container fluid>
        <br/><br/>
        <h1 style={this.divStyle}>Available Sales to Remove</h1>
        <br/><br/>
        {
          this.state.itemsForSale.length === 0 ?
            <div>
              <h5>No Active Sales</h5>
            </div> :
            <Row>
              <Col>
                {removeSales.length === 0 ? <h5>No Active Sales</h5> : currentRemovePosts}
                <br/>
                <Pagination className="pagination" postsPerPage={this.state.postsPerPage} totalPosts={removeSales.length} paginate={paginate} />  
              </Col>
            </Row>
        }
      </Container>
    )

		return (
			<div>
				{this.state.itemsForSale.length === 0 ?
					<div>
						<h5>No active sales</h5>
					</div> :
					<div>
            
					</div>
				}
				<ToastContainer />
			</div>
		);
	}
}

export default RemoveASaleView;
