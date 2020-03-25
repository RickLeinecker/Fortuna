//@flow strict

class BackendTank {
	_id: string;
	components: Array<string>;
	casusCode: Object;
	isBot: boolean;
	userId: string;
	tankName: string;

	constructor(tank: Object) {
		this._id = tank._id;
		this.components = tank.components;
		this.casusCode = tank.casusCode;
		this.isBot = tank.isBot;
		this.userId = tank.userId;
		this.tankName = tank.tankName;
	}
}

export default BackendTank;