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
}

export default BackendTank;