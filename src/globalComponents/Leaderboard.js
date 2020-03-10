//@flow strict

import * as React from 'react';

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
			leaderNames: ["BILL", "JOHN", "gosh", "dang", "bro", "Emil", "Baylor", "Adam", "David", "Jorge"] // NEED AN API CALL HERE
		}
	}

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