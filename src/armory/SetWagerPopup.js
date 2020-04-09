//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank.js';
import { setWager } from '../globalComponents/apiCalls/userAPIIntegration.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall';
import { setFavoriteTankId, getFavoriteTank, removeFavoriteTankId } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import { ToastContainer , toast } from 'react-toastify';

type Props = {|
	wagerTank: Tank,
	onWagerUpdate: () => void;
|};

type State = {|
	userCurrency: number,
	userWager: number,
	currentWager: number,
	currentWagerTank: ?Tank,
	setWagerOpen: boolean,
	removeWagerOpen: boolean,
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
			removeWagerOpen: false,
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
			console.log('No set wager tank.');
			return;
		}
		const newWagerTank: Tank = this.state.currentWagerTank;
		newWagerTank.tankName = newName;
		this.setState({currentWagerTank: newWagerTank});
	}

	// Set the user's wager and favorite tank.
	handleWagerClick(): void {
		// Error handling.
		if (this.state.userWager > this.state.userCurrency) {
			toast.error('Not enough currency.');
			return;
		}
		else if (this.state.userWager < 50) {
			toast.error('Wager cannot be less than 50.');
			return;
		}

		// Check if the wager was set. Close the popup if it is.
		setWager(this.state.userWager, () => {
			this.setState({currentWager: this.state.userWager});
			// Update user currency in the navbar.
			this.props.onWagerUpdate();
		});
		setFavoriteTankId(this.props.wagerTank._id, () => {
			this.setState({setWagerOpen: false, currentWagerTank: this.props.wagerTank});
		});
	}

	// Remove the user's wager and favorite tank.
	handleRemoveClick(): void {
		removeFavoriteTankId(() => {
			this.setState({removeWagerOpen: false, currentWagerTank: null, currentWager: 0});
			this.props.onWagerUpdate();
		});
	}

	render(): React.Node {
		const wagerButton = (
			<button className="popupbtn" onClick={() => this.handleWagerClick()}>
				Wager
			</button>
		);
		const removeButton = (
			<button className="popupbtn" onClick={() => this.handleRemoveClick()}>
				Remove
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({setWagerOpen: false, removeWagerOpen: false})}>
				Cancel
			</button>
		);

		return (
			<div>
				<h5>Wager a Tank</h5>
				<div className="row rowPadding">
					<button className="smallbtn" onClick={() => this.setState({setWagerOpen: true})}>
						Setup
					</button>
					&emsp;
					<button 
						disabled={(this.state.currentWagerTank == null) ? true : false}
						className="smallbtn"
						onClick={() => this.setState({removeWagerOpen: true})}
					>
						Remove
					</button>
				</div>
				<br/>
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
							<br/>
							<h4>Enter amount to wager {this.props.wagerTank.tankName} for</h4>
							<br/>
							<input 
								type="number" 
								className="inputText"
								onChange={e => this.setState({ userWager: e.target.value})} 
							/>
							{wagerButton}{cancelButton}
						</div>
					</Popup>
				</div>
				<div className="deletePopup">
					<Popup 
						open={this.state.removeWagerOpen}
						onClose={() => this.setState({removeWagerOpen: false})}
					>
						<div className="popup">
							<br/>
							<h4>Remove the wager for {this.props.wagerTank.tankName}?</h4>
							{removeButton}{cancelButton}
						</div>
					</Popup>
				</div>
				<ToastContainer />
			</div>
		);
	}
}

export default SetWagerPopup;
