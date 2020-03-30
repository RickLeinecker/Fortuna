//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import User from '../globalComponents/User.js';

type Props = {|
	playerChallenged: ?User,
	onChallengePlayer: (?User) => void,
|};

type State = {|
	challengePlayerOpen: boolean
|};

// Challenge Player Component. Creates a Popup to prevent accidental challenges.
//
// Prop Names:
// playerChallenged: null if quickplay, or the player to challenge
// onChallengePlayer (function that handles challenging a player)

class ChallengePlayerPopup extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			challengePlayerOpen: false
		}
	}

	render(): React.Node {
		const challengeButton = (
			<button className="popupbtn" onClick={() => this.props.onChallengePlayer(this.props.playerChallenged)}>
				Create
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({challengePlayerOpen: false})}>Cancel</button>
		);
		
		return (
			<div>
				<button 
					onClick={(this.props.playerChallenged == null) ? () => this.props.onChallengePlayer(this.props.playerChallenged) : () => this.setState({challengePlayerOpen: true})} 
					className={(this.props.playerChallenged == null) ? "btn" : "clearbtn"}
				>
					{this.props.playerChallenged?.username  ?? "Quickplay"}
				</button>
				<Popup
					open={this.state.challengePlayerOpen}
					onClose={() => this.setState({challengePlayerOpen: false})}
				>
					<div className="popup">
						<h4>
							Challenge {(this.props.playerChallenged?.username ?? ' a random person')+' '} 
							with ${this.props.playerChallenged?.wager ?? ''}?
						</h4>
						{challengeButton}{cancelButton}
					</div>
				</Popup>
			</div>
		);
	}
}

export default ChallengePlayerPopup;
