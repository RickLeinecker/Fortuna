//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import User from '../globalComponents/User.js';
import getAllUsers from '../globalComponents/getAllUsersAPICall.js';
import getUser from '../globalComponents/getUserAPICall.js';
import { ToastContainer , toast } from 'react-toastify';

type Props = {|
	playerChallenged: ?User,
	onChallengePlayer: (?User) => void,
|};

type State = {|
	challengePlayerOpen: boolean,
	quickplayPlayer: User,
	userElo: number
|};

// Challenge Player Component. Creates a Popup to prevent accidental challenges.
//
// Prop Names:
// playerChallenged: null if quickplay, or the player to challenge
// onChallengePlayer (function that handles challenging a player)
//
// State Names:
// challengPlayerOpen (tells if the popup is opened or closed)
// quickplayPlayer (if no playerChallenged, then a quickplay player will be found)
// userElo (the current user's elo)

class ChallengePlayerPopup extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		// Need a blank user to avoid null issues. Probably fix later.
		const blankUser = new User('', 0, 0, '', 0);

		this.state = {
			challengePlayerOpen: false,
			quickplayPlayer: blankUser,
			userElo: 0
		}
	}

	// Once mounted, get the current user's elo.
	componentDidMount(): void {
		getUser(user => {
			this.setState({userElo: user.elo});
		});
	}

	// If there this.props.playerChallenged is null, then it is quickplay.
	quickplay(): void {
		getAllUsers(users => {
			const similarSkilledUsers: Array<User> = [];
			for(const user of users) {
				if(((user.elo - this.state.userElo) >= -100 || (user.elo - this.state.userElo) <= 100) && user.wager > 0) {
					similarSkilledUsers.push(user);
				}
			}
			if(similarSkilledUsers == null) {
				toast.error('No users found.');
			} else {
				// If a user is found. Open the challenge popup and find a random user.
				this.setState({challengePlayerOpen: true, quickplayPlayer: similarSkilledUsers[Math.random() * Math.floor(similarSkilledUsers.length - 1)]});
			}
		});
	}

	render(): React.Node {
		const challengeButton = (
			<button 
				className="popupbtn" 
				onClick={
					(this.props.playerChallenged == null) ? 
					() => this.props.onChallengePlayer(this.state.quickplayPlayer) :
					() => this.props.onChallengePlayer(this.props.playerChallenged)
				}
			>
				Challenge
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({challengePlayerOpen: false})}>Cancel</button>
		);
		
		return (
			<div>
				<button 
					onClick={(this.props.playerChallenged == null) ? () => this.quickplay() : () => this.setState({challengePlayerOpen: true})} 
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
							Challenge {(this.props.playerChallenged?.username ?? this.state.quickplayPlayer.username + ' ')} 
							with ${this.props.playerChallenged?.wager ?? this.state.quickplayPlayer.wager}?
						</h4>
						{challengeButton}{cancelButton}
					</div>
				</Popup>
			</div>
		);
	}
}

export default ChallengePlayerPopup;
