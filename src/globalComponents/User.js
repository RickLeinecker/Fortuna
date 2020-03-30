//@flow strict

class User {
	username: string;
	money: number;
	wager: number;
	elo: number;

	constructor(username: string, money: number, wager: number, elo: number) {
		this.username = username;
		this.money = money;
		this.wager = wager;
		this.elo = elo;
	}
}

export default User;
