//@flow strict

import Component from './Component.js';

class User {
	username: string;
	money: number;
	wager: number;
	userID: string;
	elo: number;
	inventory: Array<Component>

	constructor(username: string, money: number, wager: number, userID: string, elo: number, inventory: Array<Component>) {
		this.username = username;
		this.money = money;
		this.wager = wager;
		this.userID = userID;
		this.elo = elo;
		this.inventory = inventory;
	}
	
}

export default User;
