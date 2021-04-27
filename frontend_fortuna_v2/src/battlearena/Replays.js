//@flow strict

import * as React from 'react';
import './BattleArena.css'
import Replay from '../globalComponents/typesAndClasses/Replay.js';
import getReplayListAPICall from '../globalComponents/apiCalls/getReplayListAPICall.js';
import Cookies from 'universal-cookie'
import { setMatchForBattleground } from '../battleground/setTanksToFightInBattleground.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import setReturnToFromBattlegroundLink from '../battleground/setReturnToFromBattlegroundLink.js';
import getUserAPICall from "../globalComponents/apiCalls/getUserAPICall";

type Props = {||};

type State = {|
	replays: Array<Replay>,
	username: string
|};

class Replays extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		const cookies = new Cookies();
		this.state = {
			replays: [],
			username: cookies.get('username')
		}
	}

	// Once mounted, get all replays.
	componentDidMount(): void {
		this.reloadReplay()
		getReplayListAPICall(replays => {
			this.setState({replays: replays});
		});

    // may need to try adding api call to get username instead of cookies
    // to prevent race condition
	}
	reloadReplay(): void {
		getUserAPICall(user => {
			const cookies = new Cookies();
			cookies.set('username', user.username);
			cookies.set('money', user.money);
			this.setState({username: user.username, userCurrency: user.money});
		});
	}
	getMatchResult(replay: Replay): string {
		switch(replay.winner) {
			case 2:
				return (replay.playerTwoName === this.state.username) ? 'Win' : 'Loss';
			case 1:
				return (replay.playerOneName === this.state.username) ? 'Win' : 'Loss';
			case 0:
				return 'tie';
			case -1:
				return 'Unfinished';
			default:
				console.log('Match result outside of range (-1 to 2).');
				break;
		}

		return 'Unable to get result.';
	}

	battleRecordTitle = {
		backgroundColor: "rgba(0,0,0,.5)",
		fontFamily: '"Press Start 2P", cursive',
		color:"white",
		minWidth: '455px',
		maxWidth: '80%',
		fontSize: 16,
    padding: "5px"
	}

	watchReplay(replay: Replay): void {
		setReturnToFromBattlegroundLink('/BattleArena');
		setMatchForBattleground(replay.replayId);
		window.location.href=verifyLink('/Battleground');
	}

	render(): React.Node {
		return (
			<div className="replayTable" data-testid="replayRoot">
				{this.state.username != null ? <h4 style={this.battleRecordTitle}>{this.state.username}'s Battle Record</h4> : <h4>Battle Record</h4>}
				<table>
					<thead>
						<tr>
							<th>Opponent</th>
							<th>Result</th>
							<th>Replay</th>
							<th>Prize</th>
							<th>ELO</th>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
						{this.state.replays.slice(0).reverse().map(replay => 
							<tr key={replay.replayId}>
								<td id="opponent" className="name">{(this.state.username === replay.playerOneName) ? replay.playerTwoName : replay.playerOneName}</td>
								<td id="result">{this.getMatchResult(replay)}</td>
								<td id="replay"><button className="reallySmallBtn" onClick={() => this.watchReplay(replay)}>View</button></td>
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
