//@flow strict

import * as React from 'react';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';

type Props = {||};

type State = {|
	leaderNames: Array<string>
|};

// Leaderboard component. Displays top 10 players.
// 
// State Names:
// leaderNames (Pass the list of 10 top players to display on the leaderboard)
// 
// EXAMPLE PROP USAGE = <Leaderboard />
//
// Needs to be updated to pass actual Users to it.
class Leaderboard extends React.Component<Props, State> {

	constructor() {
		super();

		this.state = {
			leaderNames: [] // NEED AN API CALL HERE
		}
	}

	componentDidMount() {
		this.getLeaders();
	}

	//This function gets the leaders for the leaderboard
	getLeaders(): void {
		const responsePromise: Promise<Response> = fetch('/api/user/leaderboard', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
				}
				else {
					let leaders = [];
					for(let i = 0; i < data.length; i++) {
						leaders.push(data[i].userName);
					}
					this.setState({leaderNames:leaders});
				}
			})
		).catch(
			(error) => {
				console.log('Couldnt connect to server!');
				console.log(error);
			}
		);
	};

	render(): React.Node {
		return (
			<div className="leaderboard">
				<h5>FORTUNA's Top Commanders</h5>
				{this.state.leaderNames.map((name, index) =>
					<h6 key={index}>
						{index + 1}.&#9;{name}
					</h6>
				)}
			</div>
		)
	}
}

export default Leaderboard;