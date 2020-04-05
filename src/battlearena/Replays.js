//@flow strict

import * as React from 'react';
import Replay from '../globalComponents/typesAndClasses/Replay.js';
import getReplayListAPICall from '../globalComponents/apiCalls/getReplayListAPICall.js';
import Cookies from 'universal-cookie'
import { setMatchForBattleground } from '../battleground/setTanksToFightInBattleground.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import setReturnToFromBattlegroundLink from '../battleground/setReturnToFromBattlegroundLink.js';

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

	watchReplay(replay: Replay): void {
		setReturnToFromBattlegroundLink('/BattleArena');
		setMatchForBattleground(replay.replayId);
		window.location.href=verifyLink('/Battleground');
	}

	render(): React.Node {
		return (
			<div className="replayList">
				<h4>{this.state.myUsername}'s Battle Record</h4>
				<div className="replayTable">
					<table>
						<thead>
							<tr>
								<th>Opponent</th>
								<th>Result</th>
								<th>Replay</th>
								<th>Prize</th>
								<th>Elo Change</th>
							</tr>
						</thead>
						<tbody>
							{this.state.replays.slice(0).reverse().map(replay => 
								<tr key={replay.replayId}>
									<td>{(this.state.myUsername === replay.playerOneName) ? replay.playerTwoName : replay.playerOneName}</td>
									<td>{this.getWinner(replay)}</td>
									<td><button className="smallbtn" onClick={() => this.watchReplay(replay)}>View</button></td>
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
