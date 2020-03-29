//@flow strict

class User {
	username: string;
	money: number;
	wager: number;

	constructor(username: string, money: number, wager: number) {
		this.username = username;
		this.money = money;
		this.wager = wager;
	}
}

export default User;
