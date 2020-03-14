//@flow strict

import * as React from 'react';
import User from './User.js';

type Props = {||};

type State = {|
	leaderNames: Array<User>
|};

// Leaderboard component. Displays top 10 players.
// 
// State Names:
// leaders (Pass the list of 10 top players to display on the leaderboard)
// 
// EXAMPLE PROP USAGE = <Leaderboard />

class Leaderboard extends React.Component<Props, State> {

	constructor() {
		super();

		this.state = {
			leaders: []
		}
	}

	// Once mounted, populate the leaderNames array.
	componentDidMount() {
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
					this.setState({leaders: data});
				}
			})
		).catch(
			(error) => {
				console.log('Couldnt connect to server!');
				console.log(error);
			}
		);
	}

	render(): React.Node {
		return (
			<div className="leaderboard">
				<h5>FORTUNA's Top Commanders</h5>
				<table>
					<tbody>
						{this.state.leaders.map((user, index) =>
							<tr key={index}>
								<td>{index+1}.</td>
								<td>{user.userName}</td>
								<td>{user.stats.elo}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Leaderboard;