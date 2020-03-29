//@flow strict

class User {
	username: string;
	money: number;

	constructor(username: string, money: number) {
		this.username = username;
		this.money = money;
	}
}

export default User;
