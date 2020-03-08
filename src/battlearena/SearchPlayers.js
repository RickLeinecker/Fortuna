//@flow strict

import * as React from 'react';

type Props = {||};

type State = {|
	playerList: Array<string>,
	searchList: Array<string>
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
			playerList: ["Jim", "John", "Jimfrey", "Eich", "Eichers", "Baylor", "Jorge", "David", "Emil", "Adam"], // NEEDS API CALL HERE
			searchList: []
		}
	}

	// When a key is pressed, update the search results with handleSearch.
	handleKeyPress = (e: SyntheticKeyboardEvent<HTMLInputElement>):void => {
		if(e.key === 'Enter') {
			this.handleSearch(e.currentTarget.value);
		}
	}

	// When a user clicks search, handleSearch will activate.
	handleSearch(searchName: string): void {

		const playerList: Array<string> = this.state.playerList;

		// Create a filtered list showing user's desired results.
		let list: Array<string> = [];

		for(const player of playerList) {
			if(player.includes(searchName)) {
				list.push(player);
			}
		}

		// Set the search result into the state.
		this.setState({ searchList: list });
	}

	// Challenge the player chosen.
	challengePlayer(): void {
		// NEEDS TO HANDLE THE BATTLEGROUND SIMULATION.
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
						{this.state.searchList.map((name, index) => 
							<button 
								key={index} 
								type="button" 
								className="clearbtn searchPlayerListItem" 
								onClick={this.challengePlayer}
							>
							{name}
							</button>
						)}
					</ul>
				</div>
			</div>
		);
	}
}

export default SearchPlayers;