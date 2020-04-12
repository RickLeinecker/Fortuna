//@flow strict

import Component from './Component.js';

class User {
	username: string;
	money: number;
	wager: number;
	wager3v3: number;
	userId: string;
	elo: number;
	inventory: Array<Component>

	constructor(username: string, money: number, wager: number, wager3v3: number, userId: string, elo: number, inventory: Array<Component>) {
		this.username = username;
		this.money = money;
		this.wager = wager;
		this.wager3v3 = wager3v3;
		this.userId = userId;
		this.elo = elo;
		this.inventory = inventory;
	}
	
}

export default User;
