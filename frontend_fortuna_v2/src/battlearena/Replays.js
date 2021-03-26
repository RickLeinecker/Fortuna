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
	constructor(props) {
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

    // may need to try adding api call to get username instead of cookies
    // to prevent race condition
	}

	getMatchResult(replay: Replay): string {
		switch(replay.winner) {
			case 2:
				return (replay.playerTwoName === this.state.myUsername) ? 'Win' : 'Loss';
			case 1:
				return (replay.playerOneName === this.state.myUsername) ? 'Win' : 'Loss';
			case 0:
				return 'tie';
			case -1:
				return 'Unfinished: view to see result';
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
			<div className="replayTable" style={this.props.styling}>
				{this.state.myUsername != null ? <h4>{this.state.myUsername}'s Battle Record</h4> : <h4>Battle Record</h4>}
				<table>
					<thead>
						<tr>
							<th>Opponent</th>
							<th>Result</th>
							<th>Replay</th>
							<th>Prize</th>
							<th>Elo</th>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
						{this.state.replays.slice(0).reverse().map(replay => 
							<tr key={replay.replayId}>
								<td id="opponent" className="name">{(this.state.myUsername === replay.playerOneName) ? replay.playerTwoName : replay.playerOneName}</td>
								<td id="result">{this.getMatchResult(replay)}</td>
								<td><button className="reallySmallBtn" style={{fontSize: "x-small"}} onClick={() => this.watchReplay(replay)}>View</button></td>
								<td id="prize">{this.getMatchResult(replay) === 'Win' ? '+' + replay.prizeMoney : '-' + replay.prizeMoney}</td>
								<td id="elo">{this.getMatchResult(replay) === 'Win' ? '+' + replay.eloExchanged : '-' + replay.eloExchanged}</td>
								<td id="type">{replay.tankOneName == null ? '3v3' : '1v1'}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Replays;
