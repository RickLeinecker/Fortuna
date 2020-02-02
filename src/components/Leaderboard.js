//@flow strict

import * as React from 'react';

type Props = {
	leaderNames: Array<string>;
}

// Leaderboard component. Displays top 10 players. The props takes a list of 10 players.
// 
// Prop Names:
// leaderNames (Pass the list of 10 top players to display on the leaderboard)
// 
// EXAMPLE PROP USAGE = <Leaderboard leaderNames={ ["John", "Bill", "Suck", "Big Suck", "HEhaw", "XXXXXfweckerXXXXX", "Yes", "2more", "9", "10haha"] } />
//
// Needs to be updated to pass actual Users to it.
class Leaderboard extends React.Component<Props> {
	render(): React.Node {
		return (
			<div className="leaderboard">
				<h4>Leaderboard</h4>
				<h6>1.&#9;{this.props.leaderNames[0]}</h6>
				<h6>2.&#9;{this.props.leaderNames[1]}</h6>
				<h6>3.&#9;{this.props.leaderNames[2]}</h6>
				<h6>4.&#9;{this.props.leaderNames[3]}</h6>
				<h6>5.&#9;{this.props.leaderNames[4]}</h6>
				<h6>6.&#9;{this.props.leaderNames[5]}</h6>
				<h6>7.&#9;{this.props.leaderNames[6]}</h6>
				<h6>8.&#9;{this.props.leaderNames[7]}</h6>
				<h6>9.&#9;{this.props.leaderNames[8]}</h6>
				<h6>10.&#9;{this.props.leaderNames[9]}</h6>
			</div>
		)
	}
}

export default Leaderboard;
