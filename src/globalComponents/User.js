//@flow strict

class User {
	username: string;
	money: number;
	wager: number;
	userID: string;

	constructor(username: string, money: number, wager: number, userID: string) {
		this.username = username;
		this.money = money;
		this.wager = wager;
		this.userID = userID;
	}
	
}

export default User;
