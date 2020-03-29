//@flow strict
import * as React from 'react';
import Tank from '../tanks/Tank.js';
import {getAllUsersTanks} from '../globalComponents/tankAPIIntegration.js';
import {getUser} from '../globalComponents/userAPIIntegration.js';
import {makeASale} from './marketPlaceAPIConnections.js';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

type Props = {|
	onItemSold: () => void,
|}; 

type State = {|
	userId: string,
	salePrice: number,
	tankBeingSoldId: string,
	itemAmount: number,
	tanksToSell: Array<Tank>,
|};

class MakeATankSaleView extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			userId: '',
			salePrice: 0,
			tankBeingSoldId: '',
			itemAmount: 0,
			tanksToSell: [],
		}
		this.getUserID();
	}

	//this gets the user id
	getUserID() : void {
		const responsePromise = getUser();
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					return data;
				}
				else {
					const jsonObjectOfUser = data;
					//set the users id
					this.setState({userId:jsonObjectOfUser._id});
					//gets the tanks that the user has currently to sell
					this.getAllUsersTanksForSell();
				}
			})
		).catch(
			error => {
				toast.error('Couldnt connect to server!');
				console.log(error);
			}
		);
	};

	//This gets all of the users tanks and then adds them to the dropdown
	getAllUsersTanksForSell() : void {
		getAllUsersTanks((successful, allTanks) => {
			if (successful) {
				this.setState({tanksToSell: allTanks});
			}
		});
	};

	//This will make a sale for a tank
	makeASaleOfATank = (): void => {
		//Check for if last tank can't allow them to sell tank
		if(this.state.tanksToSell.length === 1) {
			toast.error("Can't sell last tank");
			return;
		}
		const responsePromise = makeASale(this.state.userId, this.state.salePrice, this.state.tankBeingSoldId, 'tank', 1);
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 201) {
					console.log(response.status);
					toast.error(data.msg);
					console.log(data);
				}
				else {
					toast.success("Tank Listed!");
					//lets get the new tanks that we have since we lost the current one
					this.getAllUsersTanksForSell();
					//set the new selling price to zero 
					this.setState({salePrice: 0});
					this.props.onItemSold();
				}
			})
		).catch(
			error => {
				toast.error('Couldnt connect to server!');
				console.log(error);
			}
		);
	};

	handleChangeInSaleItem = ({ target }:{target:HTMLInputElement }) => {this.setState({tankBeingSoldId: target.value});}
	handleChangeInSalePrice = ({ target }:{target:HTMLInputElement }) => {this.setState({salePrice: parseInt(target.value)});}
	
	render(): React.Node  { 
		return (
			<div id="Parent">
				<label>Select a tank to Sell</label>
				<select className="tankForSell" onChange={this.handleChangeInSaleItem}>{this.state.tanksToSell.map(({ tankName, _id }, index) => <option key={index}  value={_id}>{tankName}</option>)}</select>
				<label>Selling Price</label>
				<input type="number" value={this.state.salePrice} className="form-control" onChange={this.handleChangeInSalePrice}></input>
				<button className="btn btn-success mt-2" onClick={this.makeASaleOfATank}>Sell</button>
				<ToastContainer />
			</div>
		);
	}
}

export default MakeATankSaleView;
