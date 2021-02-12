//@flow strict
import * as React from 'react';
import Tank from '../tanks/Tank.js';
import { getAllUsersTanks, getFavoriteTank, getFavoriteTankTeam } from '../globalComponents/apiCalls/tankAPIIntegration.js';
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
	favTankId: string,
	favTankTeamIds: Array<string>
|};

class MakeCasusCodeSaleView extends React.Component<Props, State> {

	constructor() {
		super();
		this.state = {
			userId: '',
			salePrice: 0,
			tankBeingSoldId: '',
			itemAmount: 0,
			tanksToSell: [],
			favTankId: '',
			favTankTeamIds: ['', '', '']
		}
	}

	// Once mounted, get the userId, favorite tank id, and favorite tank team ids.
	componentDidMount(): void {
		getUserAPICall(user => {
			this.setState({userId: user.userId});
			this.getAllUsersTanksForSell();
		});

		getFavoriteTank(tank => {
			if (tank != null) {
				this.setState({ favTankId: tank._id});
			}
		});

		getFavoriteTankTeam(tanks => {
			const favTankIds: Array<string> = ['', '', ''];
			for (let i: number = 0; i < 3; i++) {
				if (tanks[i] != null) {
					favTankIds[i] = tanks[i]._id;
				}
			}
			this.setState({favTankTeamIds: favTankIds});
		})
	}

	// Get all of a user's tanks, besides the favorite tank.
	getAllUsersTanksForSell() : void {
		getAllUsersTanks(allTanks => {
				// Find the favorite tank and remove it if it exists.
				const index = allTanks.map(tank => tank._id).indexOf(this.state.favTankId);
				if (index > -1) {
					allTanks.splice(index, 1);
				}

				this.setState({tanksToSell: allTanks, tankBeingSoldId: (allTanks.length === 0) ? '' : allTanks[0]._id, tankCasusCode: allTanks[0]._id.casusCodeId});
		});
	};

	//This will make a sale for a tank's casus code
	makeASaleOfCasusCode = (): void => {
		makeASale(
			this.state.userId,
			this.state.salePrice,
			this.state.tankBeingSoldId,
			"casus",
			1,
			() => {
				toast.success("Casus Code Placed in Market.");
				this.getAllUsersTanksForSell();
				this.setState({salePrice: 0});
				this.props.onItemSold();
			}
		);
	}

	render(): React.Node  {
		return (
			<div id="Parent">
				<label>Select a tank's casus code to Sell</label>
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
				<button className="primarybtn" onClick={this.makeASaleOfCasusCode}>Sell</button>
				<ToastContainer />
			</div>
		);
	}
}

export default MakeCasusCodeSaleView;
