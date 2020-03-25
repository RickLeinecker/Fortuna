//@flow strict

// Class that will handle the import of the backend's inventory object.
class Component {
	componentName: string;
	numberOwned: number;

	constructor(componentName: string, numberOwned: number) {
		this.componentName = componentName;
		this.numberOwned = numberOwned;
	}
}

export default Component