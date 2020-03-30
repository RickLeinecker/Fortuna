//@flow strict

import * as React from 'react';
import Replay from '../globalComponents/Replay.js';
import getReplayListAPICall from '../globalComponents/getReplayListAPICall.js';
import Cookies from 'universal-cookie'

type Props = {||};

type State = {|
	replays: Array<Replay>,
	myUsername: string
|};

class Replays extends React.Component<Props, State> {
	constructor() {
		super();
		this.state = {
			replays: [],
			myUsername: new Cookies().get('username')
		}
	}

	// Once mounted, get all replays.
	componentDidMount(): void {
		getReplayListAPICall(replays => {
			this.setState({replays: replays});
		});
	}

	getWinner(replay: Replay): string {
		switch(replay.winner) {
			case 2:
				return replay.playerTwoName + ' won';
			case 1:
				return replay.playerOneName + ' won';
			case 0:
				return 'tie';
			case -1:
				return 'in progress';
			default:
				console.log('Match result outside of range (-1 to 2).');
				break;
		}

		return 'Unable to get result.';
	}

	render(): React.Node {
		return (
			<div className="replayTable">
				<h4>{this.state.myUsername}'s Battle Record</h4>
				<div className="replayList">
				<table>
					<thead>
						<tr>
							<th>Opponent</th>
							<th>Result</th>
							<th></th>
							<th>Wager</th>
							<th>Elo Change</th>
						</tr>
					</thead>
					<tbody>
						{this.state.replays.map((replay, index) => 
							<tr key={index}>
								<td>{(this.state.myUsername === replay.playerOneName) ? replay.playerTwoName : replay.playerOneName}</td>
								<td>{this.getWinner(replay)}</td>
								<td><button className="smallbtn">View Replay</button></td>
								<td>{replay.prizeMoney}</td>
								<td>{(this.getWinner(replay) !== this.state.myUsername) ? '-' + replay.eloExchanged : '+' + replay.eloExchanged}</td>
							</tr>
						)}
					</tbody>
				</table>
				</div>
			</div>
		);
	}
}

export default Replays;