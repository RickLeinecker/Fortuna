//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank.js';
import { setWager } from '../globalComponents/apiCalls/userAPIIntegration.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall';
import { setFavoriteTankId, getFavoriteTank } from '../globalComponents/apiCalls/tankAPIIntegration.js';

type Props = {|
	wagerTank: Tank,
|};

type State = {|
	userCurrency: number,
	userWager: number,
	currentWager: number,
	currentWagerTank: ?Tank,
	setWagerOpen: boolean,
	errorMessage: string,
|};

class SetWagerPopup extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			userCurrency: 0,
			userWager: 0,
			currentWager: 0,
			currentWagerTank: null,
			setWagerOpen: false,
			errorMessage: '',
		}
	}

	// Once mounted, get the user's currency, wager, and favorite tank.
	componentDidMount(): void {
		getUserAPICall(user => {
			this.setState({userCurrency: user.money, currentWager: user.wager});
		});

		getFavoriteTank(tank => {
			this.setState({currentWagerTank: tank});
		});
	}

	// If the name of the wager tank is changed, update the currentWagerTank.
	updateWagerTankName(newName: string): void {
		if(this.state.currentWagerTank == null) {
			console.log('Cannot find a selected tank');
			return;
		}
		const newWagerTank: Tank = this.state.currentWagerTank;
		newWagerTank.tankName = newName;
		this.setState({currentWagerTank: newWagerTank});
	}

	handleWagerClick(): void {
		// Error handling.
		if (this.state.userWager > this.state.userCurrency) {
			this.setState({errorMessage: 'Not enough currency.'});
			return;
		}
		else if (this.state.userWager === 0) {
			this.setState({errorMessage: 'Wager cannot be 0.'});
			return;
		}

		// Check if the wager was set. Close the popup if it is.
		setWager(this.state.userWager, setSuccessful => {
			if (setSuccessful) {
				this.setState({currentWager: this.state.userWager});
			}
			else {
				this.setState({errorMessage: 'Could not set wager.'});
			}
		});
		setFavoriteTankId(this.props.wagerTank._id, setSuccessful => {
			if (setSuccessful) {
				this.setState({setWagerOpen: false, currentWagerTank: this.props.wagerTank, errorMessage: ''});
			}
			else {
				this.setState({errorMessage: 'Could not set wager tank.'});
			}
		});
	}

	render(): React.Node {
		const wagerButton = (
			<button className="popupbtn" onClick={() => this.handleWagerClick()}>
				Wager
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({setWagerOpen: false})}>
				Cancel
			</button>
		);

		return (
			<div>
				<h5>Set a Wager Tank</h5>
				<button className="smallbtn" onClick={() => this.setState({setWagerOpen: true})}>
					Setup
				</button>
				<br/><br/>
				<label>Current Wager:&emsp;</label>
				<label>{this.state.currentWagerTank == null ?
					'No set wager tank' : 
					<div className="wagerTank">
						{this.state.currentWagerTank.tankName + ' '} 
						<label>
							for {this.state.currentWager}
						</label>
					</div>
				}</label>
				<div className="wagerPopup">
					<Popup 
						open={this.state.setWagerOpen}
						onClose={() => this.setState({setWagerOpen: false})}
					>
						<div className="popup">
							<h4>Enter amount to wager {this.props.wagerTank.tankName} for</h4>
							<br/>
							<input 
								type="number" 
								className="inputText"
								onChange={e => this.setState({ userWager: e.target.value})} 
							/>
							<div className="fixedHeight">
								{this.state.errorMessage}
							</div>
							{wagerButton}{cancelButton}
						</div>
					</Popup>
				</div>
			</div>
		);
	}
}

export default SetWagerPopup;
