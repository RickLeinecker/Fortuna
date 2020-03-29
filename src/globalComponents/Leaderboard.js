//@flow strict

import * as React from 'react';
import User from './User.js';
import { getLeaders } from './userAPIIntegration.js';

type Props = {||};

type State = {|
	leaders: Array<User>
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
			<div className="leaderboard">
				<h5>FORTUNA's Top Commanders</h5>
				<table>
					<tbody>
						{this.state.leaders.map(({username, elo}, index) =>
							<tr key={index}>
								<td>{index + 1}.</td>
								<td>{username}</td>
								<td>{elo}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Leaderboard;