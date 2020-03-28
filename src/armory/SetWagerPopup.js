//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank.js';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';
import { getUser, setWager } from '../globalComponents/userAPIIntegration.js';
import { setFavoriteTank } from '../globalComponents/tankAPIIntegration.js';

type Props = {|
	wagerTank: Tank,
|};

type State = {|
	userCurrency: number,
	userWager: number,
	setWagerOpen: boolean,
	errorMessage: string,
|};

class SetWagerPopup extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			userCurrency: 0,
			userWager: 0,
			setWagerOpen: false,
			errorMessage: '',
		}
	}

	// Once mounted, get the user's currency.
	componentDidMount(): void {
		const responsePromise: Promise<Response> = getUser();
		responsePromise.then(
			response => response.json().then(data => {
				if(response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					this.setState({errorMessage: getErrorFromObject(data)});
				}
				else {
					this.setState({userCurrency: data.money});
				}
			})
		)
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
			this.setState({setWagerOpen: false});
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