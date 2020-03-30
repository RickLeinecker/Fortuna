//@flow strict

import * as React from 'react';
import ChallengePlayerPopup from './ChallengePlayerPopup.js';
import getAllUsersAPICall from '../globalComponents/getAllUsersAPICall.js';
import User from '../globalComponents/User.js';
import Cookie from 'universal-cookie';

type Props = {|
	onChallengePlayer: (?User) => void
|};

type State = {|
	queryString: string,
	playerList: Array<User>,
|};

// Search Players Component. Takes an array of all players.
//
// State Names:
// playerList (API call to get all usernames)
// searchList (list of all users that match searchName)
// 
// EXAMPLE PROP USAGE = <SearchPlayers />
//
// Needs to be updated to have a challenge player button and API call implemented.
class SearchPlayers extends React.Component<Props, State> {

	constructor() {
		super();

		this.state = {
			queryString: '',
			playerList: [],
		}
	}

	componentDidMount(): void {
		//set by navbar
		const myUsername=new Cookie().get('username');
		getAllUsersAPICall(allUsers => {
			const usersWithWager = allUsers.filter(user => user.username !== myUsername && user.wager>0);
			this.setState({playerList: usersWithWager});
		});
	}

	handleKeyPress = (e: SyntheticKeyboardEvent<HTMLInputElement>):void => {
		this.setState({queryString: e.currentTarget.value});
	}

	render(): React.Node {
		const playersToRender = this.state.playerList.filter(
			user => user.username.includes(this.state.queryString)
		);
		return (
			<div className="searchPlayers">
				<h6>Click the Player's Name you wish to Challenge</h6>
				<input 
					type="text" 
					className="inputText" 
					placeholder="Search Players" 
					onKeyPress={this.handleKeyPress}
				/>
				<div className="searchPlayersList">
					<h6>Press Enter to Search</h6>
					<ul>
						{playersToRender.map((user, index) =>
							<div className="searchPlayerListItem" key={index}>
								<ChallengePlayerPopup 
									onChallengePlayer={user => this.props.onChallengePlayer(user)}
									playerChallenged={user}
								/>
							</div>
						)}
					</ul>
				</div>
			</div>
		);
	}
}

export default SearchPlayers;
