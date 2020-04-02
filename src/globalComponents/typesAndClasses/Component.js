//@flow strict

import type { TankComponent } from './TankComponent.js';

// Class that will handle the import of the backend's inventory object.
class Component {
	componentName: TankComponent;
	numberOwned: number;

	constructor(componentName: TankComponent, numberOwned: number) {
		this.componentName = componentName;
		this.numberOwned = numberOwned;
	}
}

export default Component