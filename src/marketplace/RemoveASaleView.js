//@flow strict
import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import { toTitleCase } from '../globalComponents/Utility.js';
import SaleObject from '../globalComponents/typesAndClasses/SaleObject.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import { getUsersCurrentSales, removeASale } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';

type Props = {||}; 

type State = {|
	userId: string,
	itemsForSale: Array<SaleObject>
|};

class RemoveASaleView extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			userId: '',
			itemsForSale: []
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

	render(): React.Node { 
		return (
			<div>
				{this.state.itemsForSale.length === 0 ?
					<div>
						<h5>No active sales</h5>
					</div> :
					<div>
						{this.state.itemsForSale.map((sale, index) =>
							<div className="card mb-2" key={index}>
								<div className="card-body">
									<h5 className="card-title">{toTitleCase(sale.name)}</h5>
									<h5 className="card-title">Price: ${sale.price}</h5>
									<h5 className="card-title">Quantity: {sale.amount}</h5>
									<button className="btn btn-danger mt-2" onClick={() => this.removeSale(sale.saleId)}>Remove</button>
								</div>
							</div>
						)}
					</div>
				}
				<ToastContainer />
			</div>
		);
	}
}

export default RemoveASaleView;
