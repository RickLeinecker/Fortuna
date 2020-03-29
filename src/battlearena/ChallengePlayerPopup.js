//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';

type Props = {|
	playerChallenged: string,
	onChallengePlayer: (string) => void
|};

type State = {|
	playerList: Array<string>,
	playerChallengedWager: number,
	userCurrency: number
|};

// Challenge Player Component. Creates a Popup to prevent accidental challenges.
//
// Prop Names:
// playerChallenged (name of player being challenged. If Quickplay, then it will be "")
// onChallengePlayer (function that handles challenging a player)
//
// State Names:
// playerList (gets a list of players in similar elo)
// playerChallengedWager (wager that the challenged player put up)
// userCurrency (current user's currency)

class ChallengePlayerPopup extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			playerList: [],
			playerChallengedWager: 20,
			userCurrency: 30
		};
	}

	render(): React.Node {
		return (
			<Popup
				trigger = {
					<button type="button" className={(this.props.playerChallenged === "") ? "btn" : "clearbtn"}>
						{(this.props.playerChallenged === "") ? "Quickplay" : this.props.playerChallenged}
					</button>
				} modal>
				{close => (
					<div className="popup">
						<h3>Challenge {this.props.playerChallenged} with ${this.state.playerChallengedWager}?</h3>
						<button 
							className={
								(this.state.playerChallengedWager > this.state.userCurrency) ? "popupbtn disabled" : "popupbtn"
							} 
							type="button" 
							onClick={() => this.props.onChallengePlayer(this.props.playerChallenged)}
						>
							Challenge
						</button>
						<button className="cancelbtn" type="button" onClick={() => {close();}}>
							Cancel
						</button>
					</div>
				)}
			</Popup>
		);
	}
}

export default ChallengePlayerPopup;
