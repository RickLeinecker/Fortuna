//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank.js';
import BackendTank from '../tanks/BackendTank.js';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';
import { getUser, setWager } from '../globalComponents/userAPIIntegration.js';
import { setFavoriteTank, getFavoriteTank } from '../globalComponents/tankAPIIntegration.js';
import { getTank } from '../tanks/TankLoader.js';

type Props = {|
	wagerTank: Tank,
|};

type State = {|
	userCurrency: number,
	userWager: number,
	currentWager: number,
	currentWagerTank?: Tank,
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
		const responsePromiseUser: Promise<Response> = getUser();
		responsePromiseUser.then(
			response => response.json().then(data => {
				if(response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					this.setState({errorMessage: getErrorFromObject(data)});
				}
				else {
					this.setState({userCurrency: data.money, currentWager: data.wager});
				}
			})
		);

		const responsePromiseTank: Promise<Response> = getFavoriteTank();
		responsePromiseTank.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					this.setState({errorMessage: getErrorFromObject(data)});
				}
				else if (data == null) {
					// If the favorite tank is null, then leave.
					return;
				}
				else {
					this.setState({currentWagerTank: getTank(new BackendTank(
						data._id,
						data.components,
						data.casusCode,
						data.isBot,
						data.userId,
						data.tankName
					))});
				}
			})
		);
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
		if (setWager(this.state.userWager) && setFavoriteTank(this.props.wagerTank)) {
			this.setState({
				setWagerOpen: false, 
				currentWagerTank: this.props.wagerTank, 
				currentWager: this.state.userWager
			});
		}
		else {
			this.setState({errorMessage: 'Could not set wager.'});
		}
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
				<label>Setup a Wager&emsp;</label>
				<button className="smallbtn" onClick={() => this.setState({setWagerOpen: true})}>
					Setup
				</button>
				<h6>Current Wager</h6>
				<label>{this.state.currentWagerTank == null ?
					'No set wager tank' : 
					this.state.currentWagerTank.tankName + 'for' + this.state.currentWager
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