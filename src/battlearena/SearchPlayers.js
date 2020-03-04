//@flow strict

import * as React from 'react';

type Props = {|
	playerList: Array<string>,
|};

type State = {|
	searchName: string,
	searchList: Array<string>
|};

// Search Players Component. Takes an array of all players.
//
// Prop Names:
// playerList (Array of all users)
//
// State Names:
// searchName (the keyword the user is searching with)
// searchList (list of all users that match searchName)
// 
// EXAMPLE PROP USAGE = <SearchPlayers playerList={ ["jeffery", "jeff", "john", "illeatbutt", "childeatbigtime", "childconsumer"] }/>
//
// Needs to be updated to have a challenge player button.
class SearchPlayers extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			searchName: "",
			searchList: []
		}
	}

	// When typing in the searchbar, update searchName.
	handleChange = (e: string) => {
		this.setState({
			searchName: e
		});
	}

	// When a user clicks search, handleSearch will activate.
	handleSearch = () => {

		const playerList: Array<string> = this.props.playerList;
		const searchName: string = this.state.searchName;

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
		
	}

	render(): React.Node {
		return (
			<div className="searchPlayers">
				<h6>Click the Player's Name you wish to Challenge</h6>
				<input type="text" className="inputText" onChange={(e) => this.handleChange(e.target.value)} placeholder="Search Players" />
				<button type="button" onClick={this.handleSearch} className="btn">Search</button>
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