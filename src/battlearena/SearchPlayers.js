//@flow strict

import * as React from 'react';
import ChallengePlayerPopup from './ChallengePlayerPopup.js';
import Cookies from 'universal-cookie';
import type {user} from '../globalComponents/user.js';

type Props = {|
	onChallengePlayer: (user) => void
|};

type State = {|
	playerList: Array<user>,
	searchList: Array<user>
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

		this.handleSearch.bind(this);
		this.handleKeyPress.bind(this);

		this.state = {
			playerList: [],
			searchList: []
		}
	}

	// Once the component mounts, fill the player list with all usernames.
	// Might need to be updated to see if a wager is set.
	componentDidMount(): void {

		// Set the cookie and update state.
		const cookies = new Cookies();
		const token = cookies.get('token');
		const responsePromise: Promise<Response> = fetch('/api/user/allUsers', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': token
			},
		});
		responsePromise.then (
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
				}
				else {
					this.setState({playerList: data});
				}
			})
		)
	}

	// When a key is pressed, update the search results with handleSearch.
	handleKeyPress = (e: SyntheticKeyboardEvent<HTMLInputElement>):void => {
		if(e.key === 'Enter') {
			this.handleSearch(e.currentTarget.value);
		}
	}

	// When a user clicks search, handleSearch will activate.
	handleSearch(searchName: string): void {

		const playerList: Array<user> = this.state.playerList;

		// Create a filtered list showing user's desired results.
		let list: Array<user> = [];

		for(const player of playerList) {
			if(player.userName.includes(searchName)) {
				list.push(player);
			}
		}

		// Set the search result into the state.
		this.setState({ searchList: list });
	}

	render(): React.Node {
		return (
			<div className="searchPlayers">
				<h6>Click the Player's Name you wish to Challenge</h6>
				<input 
					type="text" 
					className="inputText" 
					placeholder="Search Players" 
					onKeyPress={this.handleKeyPress}
				/>
				<h6>Press Enter to Search</h6>
				<div className="searchPlayersList">
					<ul>
						{(this.state.searchList.map(usernames => usernames.userName)).map((name, index) =>
							<div className="searchPlayerListItem" key={index}>
								<ChallengePlayerPopup 
									onChallengePlayer={this.props.onChallengePlayer}
									playerChallenged={name}
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