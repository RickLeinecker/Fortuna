//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Cookies from 'universal-cookie';

type Props = {|
	setWager(number): void,
	selectedTankName: string,
|};

type State = {|
	wager: number,
	userCurrency: number,
|};

class SetWagerPopup extends React.Component<Props, State> {
	constructor() {
		super();

		this.state = {
			wager: 0,
			userCurrency: 0,
		}

		this.getCurrency();
	}

	getCurrency(): void {
		const cookie = new Cookies();
		this.setState({userCurrency: cookie.get('money')});
	}

	render(): React.Node {
		return (
			<div>
				<h6>Setup a Tank to be Challenged</h6>
				<Popup
					trigger = {
						<button className="btn">Setup</button>
					} modal>
					{close => (
						<div className="popup">
							{console.log(this.props.selectedTankName)}
							<h3>Choose how much to wager for {this.props.selectedTankName}?</h3>
							<input type="number" className="inputText" value={this.state.wager} onChange={e => this.setState({wager: e.target.value})}></input>
							<br/>
							{(this.state.wager <= this.state.userCurrency) ?
								<button className="popupbtn" onClick={this.props.setWager(this.state.wager)}>Wager</button> :
								<button className="popupbtn disabled">Wager</button>
							}
							<button className="cancelbtn" onClick={() => {close();}}>Cancel</button>
						</div>
					)}
				</Popup>
			</div>
		);
	}
}

export default SetWagerPopup;