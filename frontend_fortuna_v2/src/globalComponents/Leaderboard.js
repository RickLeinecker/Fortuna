//@flow strict

import * as React from 'react';
import User from './typesAndClasses/User.js';
import { getLeaders } from './apiCalls/userAPIIntegration.js';

type Props = {||};

type State = {|
	leaders: Array<User>
|};

// Leaderboard component. Displays top 10 players.
//
// State Names:
// leaders (Pass the list of 10 top players to display on the leaderboard)
//
// EXAMPLE PROP USAGE = <Leaderboard />
//
// Needs to be updated to pass actual Users to it.
class Leaderboard extends React.Component<Props, State> {

	constructor() {
		super();

		this.state = {
			leaders: []
		}
	}

	componentDidMount(): void {
		getLeaders(leaders => {
			this.setState({leaders: leaders});
		});
	}

	render(): React.Node {
		return (
			<div style={{color: "white", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>
				<h4 id = "title">Top Commanders</h4>
				<table>
					<tbody>
						{this.state.leaders.map(({username, elo}, index) =>
							<tr key={index}>
								<td id="index">{index + 1}.</td>
								<td id="name">{username}</td>
								<td id="elo">{elo}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Leaderboard;
