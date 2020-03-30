//@flow strict

class Replay {
	tankOneName: string;
	tankTwoName: string;
	playerOneName: string;
	playerTwoName: string;
	winner: -1|0|1|2;
	prizeMoney: number;
	eloExchanged: number;

	constructor(
		tankOneName: string,
		tankTwoName: string,
		playerOneName: string,
		playerTwoName: string,
		winner: -1|0|1|2,
		prizeMoney: number,
		eloExchanged: number
	) {
		this.tankOneName=tankOneName;
		this.tankTwoName=tankTwoName;
		this.playerOneName=playerOneName;
		this.playerTwoName=playerTwoName;
		this.winner=winner;
		this.prizeMoney=prizeMoney;
		this.eloExchanged=eloExchanged;
	}
}

export default Replay;
