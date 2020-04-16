//@flow strict

import * as React from 'react';
import ChallengePlayerPopup from './ChallengePlayerPopup.js';
import getAllUsersAPICall from '../globalComponents/apiCalls/getAllUsersAPICall.js';
import User from '../globalComponents/typesAndClasses/User.js';
import Cookie from 'universal-cookie';
import type { BattleType } from '../globalComponents/typesAndClasses/BattleType.js';

type Props = {|
	onChallengePlayer: (?User) => void,
	battleType: BattleType
|};

type State = {|
	queryString: string,
	player1v1List: Array<User>,
	player3v3List: Array<User>
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
			player1v1List: [],
			player3v3List: []
		}
	}

	componentDidMount(): void {
		//set by navbar
		const myUsername=new Cookie().get('username');
		getAllUsersAPICall(allUsers => {
			this.setState({
				player1v1List: allUsers.filter(user => user.username !== myUsername && user.wager > 0),
				player3v3List: allUsers.filter(user => user.username !== myUsername && user.wager3v3 > 0)
			});
		});
	}

	handleKeyPress = (e: SyntheticKeyboardEvent<HTMLInputElement>):void => {
		this.setState({queryString: e.currentTarget.value});
	}

	render(): React.Node {
		const playersToRender = (this.props.battleType === '1 vs 1' ? 
			this.state.player1v1List.filter(user => user.username.includes(this.state.queryString)) :
			this.state.player3v3List.filter(user => user.username.includes(this.state.queryString))
		);
		return (
			<div className="searchPlayers">
				<h6>Click the Player to Challenge</h6>
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
									battleType={this.props.battleType}
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
