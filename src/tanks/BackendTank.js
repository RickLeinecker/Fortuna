//@flow strict

import type { TankComponent } from '../armory/TankComponent.js';

// Class used for handling the backend tank object.
class BackendTank {
	_id: string;
	components: Array<TankComponent>;
	casusCode: Object;
	isBot: boolean;
	userId: string;
	tankName: string;

	constructor(
		_id: string,
		components: Array<TankComponent>,
		casusCode: Object,
		isBot: boolean,
		userId: string,
		tankName: string
	) {
		this._id = _id;
		this.components = components;
		this.casusCode = casusCode;
		this.isBot = isBot;
		this.userId = userId;
		this.tankName = tankName;
	}

}

export default BackendTank;
