//@flow strict
import * as React from 'react';
import Tank from '../tanks/Tank.js';
import { getAllUsersTanks, getFavoriteTank } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import { makeASale } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';
import { ToastContainer , toast } from 'react-toastify';

type Props = {|
	onItemSold: () => void,
|}; 

type State = {|
	userId: string,
	salePrice: number,
	tankBeingSoldId: string,
	itemAmount: number,
	tanksToSell: Array<Tank>,
	favTankId: string
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
			favTankId: ''
		}
	}

	// Once mounted, get the userId and favorite tank id.
	componentDidMount(): void {
		getUserAPICall(user => {
			this.setState({userId: user.userId});
			this.getAllUsersTanksForSell();
		});

		getFavoriteTank(tank => {
			this.setState({ favTankId: tank._id});
		});
	}

	// Get all of a user's tanks, besides the favorite tank.
	getAllUsersTanksForSell() : void {
		getAllUsersTanks(allTanks => {
				// Find the favorite tank and remove it if it exists.
				const index = allTanks.map(tank => tank._id).indexOf(this.state.favTankId);
				if (index > -1) {
					allTanks.splice(index, 1);
				}
			
				this.setState({tanksToSell: allTanks});
		});
	};

	//This will make a sale for a tank
	makeASaleOfATank = (): void => {
		//Check for if last tank can't allow them to sell tank
		if(this.state.tanksToSell.length === 1) {
			toast.error("Can't sell last tank");
			return;
		}

		makeASale(
			this.state.userId, 
			this.state.salePrice, 
			this.state.tankBeingSoldId, 
			"tank", 
			1,
			() => {
				toast.success("Tank Placed in Market.");
				this.getAllUsersTanksForSell();
				this.setState({salePrice: 0});
				this.props.onItemSold();
			}
		);
	}
	
	render(): React.Node  { 
		return (
			<div id="Parent">
				<label>Select a tank to Sell</label>
				<select 
					className="dropdownMenu" 
					onChange={e => this.setState({tankBeingSoldId: e.target.value})}
				>
					{this.state.tanksToSell.map(({ tankName, _id }, index) => 
						<option key={index}  value={_id}>{tankName}</option>
					)}
				</select>
				<br/>
				<label>Selling Price</label>
				<input 
					type="number" 
					value={this.state.salePrice} 
					className="inputText" 
					onChange={e => this.setState({salePrice: e.target.value})}
				></input>
				<br/><br/>
				<button className="primarybtn" onClick={this.makeASaleOfATank}>Sell</button>
				<ToastContainer />
			</div>
		);
	}
}

export default MakeATankSaleView;
