//@flow strict

class User {
	inventory: Object;
	stats: Object;
	isVerified: boolean;
	money: number;
	wager: number;
	_id: string;
	userName: string;
	email: string;
	dateCreated: string;

	constructor(inventory: Object, stats: Object, isVerified: boolean, money: number, wager: number, _id: string, userName: string, email: string, dateCreated: string) {
		this.inventory = inventory;
		this.stats = stats;
		this.isVerified = isVerified;
		this.money = money;
		this.wager = wager;
		this._id = _id;
		this.userName = userName;
		this.email = email;
		this.dateCreated = dateCreated;
	}
}

export default User;