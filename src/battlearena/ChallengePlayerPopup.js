//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import User from '../globalComponents/User.js';

type Props = {|
	playerChallenged: ?User,
	onChallengePlayer: (?User) => void
|};

// Challenge Player Component. Creates a Popup to prevent accidental challenges.
//
// Prop Names:
// playerChallenged: null if quickplay, or the player to challenge
// onChallengePlayer (function that handles challenging a player)

class ChallengePlayerPopup extends React.Component<Props> {

	render(): React.Node {
		return (
			<Popup
				trigger = {
					<button type="button" className={(this.props.playerChallenged == null) ? "btn" : "clearbtn"}>
						{this.props.playerChallenged?.username  ?? "Quickplay"}
					</button>
				} modal>
				{close => (
					<div className="popup">
						<h3>
							Challenge {(this.props.playerChallenged?.username ?? ' a random person')+' '} 
							with ${this.props.playerChallenged?.wager ?? '??? '}?
						</h3>
						<button 
							className={"popupbtn"} 
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
