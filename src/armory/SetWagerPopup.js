//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';

type Props = {|
	setWager(number): void,
	selectedTankName: string,
	userCurrency: number,
|};

type State = {|
	wager: number,
|};

class SetWagerPopup extends React.Component<Props, State> {
	constructor() {
		super();

		this.state = {
			wager: 0,
		}
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
							<h3>Choose how much to wager for {this.props.selectedTankName}</h3>
							<input type="number" className="inputText" value={this.state.wager} onChange={e => this.setState({wager: e.target.value})}></input>
							<br/>
							<button className="popupbtn" onClick={this.props.setWager(this.state.wager)}>Wager</button>
							<button className="cancelbtn" onClick={() => {close();}}>Cancel</button>
						</div>
					)}
				</Popup>
			</div>
		);
	}
}

export default SetWagerPopup;