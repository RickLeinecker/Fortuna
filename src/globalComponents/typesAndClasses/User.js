//@flow strict

class User {
	username: string;
	money: number;
	wager: number;
	userID: string;
	elo: number;

	constructor(username: string, money: number, wager: number, userID: string, elo: number) {
		this.username = username;
		this.money = money;
		this.wager = wager;
		this.userID = userID;
		this.elo = elo;
	}
	
}

export default User;
