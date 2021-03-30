//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import User from '../globalComponents/typesAndClasses/User.js';
import getAllUsers from '../globalComponents/apiCalls/getAllUsersAPICall.js';
import getUser from '../globalComponents/apiCalls/getUserAPICall.js';
import { ToastContainer , toast } from 'react-toastify';
import type { BattleType } from '../globalComponents/typesAndClasses/BattleType.js';

type Props = {|
	playerChallenged: ?User,
	onChallengePlayer: (?User) => void,
	battleType: BattleType
|};

type State = {|
	challengePlayerOpen: boolean,
	quickplayPlayer: User,
	userElo: number,
	myUsername: string
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
		const blankUser = new User('', 0, 0, 0, '', 0, []);

		this.state = {
			challengePlayerOpen: false,
			quickplayPlayer: blankUser,
			userElo: 0,
			myUsername: ''
		}
	}

	// Once mounted, get the current user's elo.
	componentDidMount(): void {
		getUser(user => {
			this.setState({userElo: user.elo, myUsername: user.username});
		});
	}

	// If there this.props.playerChallenged is null, then it is quickplay.
	quickplay(): void {
		// Check battle type and filter users appropriately.
		if (this.props.battleType === '1 vs 1') {
			getAllUsers(users => {
				const similarSkilledUsers: Array<User> = users.filter(user => 
					((user.elo - this.state.userElo) >= -100 
					&& (user.elo - this.state.userElo) <= 100) 
					&& user.wager > 0
					&& user.username !== this.state.myUsername
				);

				if(similarSkilledUsers.length === 0) {
					toast.error('No users found with similar skill level.');
					return;
				} 
				else {
					// If a user is found. Open the challenge popup and find a random user.
					this.setState({challengePlayerOpen: true, quickplayPlayer: similarSkilledUsers[Math.floor(Math.random() * similarSkilledUsers.length)]});
				}
			});
		}
		else {
			getAllUsers(users => {
				const similarSkilledUsers: Array<User> = users.filter(user => 
					((user.elo - this.state.userElo) >= -100 
					&& (user.elo - this.state.userElo) <= 100) 
					&& user.wager3v3 > 0
					&& user.username !== this.state.myUsername
				);
				if(similarSkilledUsers.length === 0) {
					toast.error('No users found with similar skill level.');
					return;
				} 
				else {
					// If a user is found. Open the challenge popup and find a random user.
					this.setState({challengePlayerOpen: true, quickplayPlayer: similarSkilledUsers[Math.floor(Math.random() * similarSkilledUsers.length)]});
				}
			});
		}
	}

  divStyle = {
    color: "white",
    textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
  }

  buttonDivStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
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
				<ToastContainer />
				<button 
					onClick={(this.props.playerChallenged == null) ? () => this.quickplay() : () => this.setState({challengePlayerOpen: true})} 
					className={(this.props.playerChallenged == null) ? "primarybtn" : "clearbtn"}
          style={this.divStyle}
				>
					{this.props.playerChallenged?.username  ?? "Quickplay"}
				</button>
				<Popup
					open={this.state.challengePlayerOpen}
					onClose={() => this.setState({challengePlayerOpen: false})}
				>
					<div className="popup">
						<h4>
							Challenge {(this.props.playerChallenged?.username ?? this.state.quickplayPlayer.username) + ' '} 
							with ${this.props.battleType === '1 vs 1' ? 
								this.props.playerChallenged?.wager ?? this.state.quickplayPlayer.wager :
								this.props.playerChallenged?.wager3v3 ?? this.state.quickplayPlayer.wager3v3
							}?
						</h4>
						{challengeButton}{cancelButton}
					</div>
				</Popup>
			</div>
		);
	}
}

export default ChallengePlayerPopup;
