//@flow strict

import * as React from 'react';

type Props = {|
	playerList: Array<string>,
|};

type State = {|
	searchName: string,
	searchList: Array<string>,
	displayList: React.Node
|};

// Search Players Component. Takes an array of all players.
//
// Prop Names:
// playerList (Array of all users)
// 
// EXAMPLE PROP USAGE = <SearchPlayers playerList={ ["jeffery", "jeff", "john", "illeatbutt", "childeatbigtime", "childconsumer"] }/>
//
// Needs to be updated to have a challenge player button.
class SearchPlayers extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			searchName: "",
			searchList: [""],
			displayList: <div className="searchPlayersList"></div>
		}
	}

	// When typing in the searchbar, update searchName.
	handleChange = (e: string) => {
		this.setState({
			searchName: e
		});

		console.log(e);
		console.log(this.state.searchName);
	}

	// When a user clicks search, handleSearch will activate.
	handleSearch = () => {

		const playerList: Array<string> = this.props.playerList;
		const searchName: string = this.state.searchName;
		
		// REMOVE
		console.log(playerList);
		console.log(searchName);

		// Create a filtered list showing user's desired results.
		let list: Array<string> = [""];

		let i: number = 0;
		for(i; i < playerList.length; i++) {
			if(playerList[i].includes(searchName)) {
				list.push(playerList[i]);
			}
		}

		// REMOVE
		console.log(list);

		// If no changes were made to list, then the search was empty.
		if(list.length == 1) {
			this.setState({ displayList:
				<div className="searchPlayersList">
					<h6>No users found.</h6>
				</div>
			});
		} else {
			// Map the users that were found.
			this.setState({ displayList:
				<div className="searchPlayersList">
					<ul>
						{list.map((name, index) => <button key={index} type="button" className="clearbtn" onClick={this.challengePlayer}>{name}</button>)}
					</ul>
				</div>
			});
		}
	}

	challengePlayer(): void {
		console.log("empty");
	}

	render(): React.Node {
		return (
			<div className="searchPlayers">
				<h6>Find a Player to Challenge</h6>
				<input type="text" className="inputText" onChange={(e) => this.handleChange(e.target.value)} placeholder="Search Players" />
				<button type="button" onClick={this.handleSearch} className="btn">Search</button>
				{this.state.displayList}
			</div>
		);
	}
}

export default SearchPlayers;