//@flow strict
import type { ArenaType } from '../../battleground/ArenaType.js';

class Replay {
	tankOneName: ?string;
	tankTwoName: ?string;
	playerOneName: string;
	playerTwoName: string;
	winner: -1|0|1|2;
	prizeMoney: number;
	eloExchanged: number;
	replayId: string;
	map: ArenaType;
	tankTeamOneNames: Array<?string>;
	tankTeamTwoNames: Array<?string>;

	constructor(
		tankOneName: ?string,
		tankTwoName: ?string,
		playerOneName: string,
		playerTwoName: string,
		winner: -1|0|1|2,
		prizeMoney: number,
		eloExchanged: number,
		replayId: string,
		map: ArenaType,
		tankTeamOneNames: Array<?string>,
		tankTeamTwoNames: Array<?string>
	) {
		this.tankOneName=tankOneName;
		this.tankTwoName=tankTwoName;
		this.playerOneName=playerOneName;
		this.playerTwoName=playerTwoName;
		this.winner=winner;
		this.prizeMoney=prizeMoney;
		this.eloExchanged=eloExchanged;
		this.replayId=replayId;
		this.map = map;
		this.tankTeamOneNames = tankTeamOneNames;
		this.tankTeamTwoNames = tankTeamTwoNames;
	}
}

export default Replay;
