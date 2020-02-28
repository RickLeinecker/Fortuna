//@flow strict
/*
import * as React from 'react';

// components is all of the users currently owned components.
// tank is the user's currently selected tank.
type Props = {|
	components: ?Array<string>,
	tank: ?Array<string>
|};

type State = {|
	chassis: ?Array<string>,
	weapons: ?Array<string>,
	scanners: ?Array<string>,
	jammers: ?Array<string>,
	treads: ?Array<string>,
	items: ?Array<string>,
	currentTank: ?Array<string>,
	currentChassis: ?string,
	currentWeapons: ?Array<string>,
	currentScanners: ?Array<string>,
	currentJammers: ?string,
	currentTreads: ?string,
	currentItems: ?Array<string>
|};

// ComponentMenu Component.
class ComponentMenu extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		// Tracks points to each component.
		const componentPoints: Map<string, number> = new Map();
		// Chassis:
		componentPoints.set("moddableLight", -1);
		componentPoints.set("light", 0);
		componentPoints.set("moddable", -1);
		componentPoints.set("heavy", 0);
		componentPoints.set("moddableHeavy", -1);
		// Weapons:
		componentPoints.set("machineGun", 1);
		componentPoints.set("grenadeLauncher", 1);
		componentPoints.set("missile", 1);
		componentPoints.set("shotgun", 1);
		componentPoints.set("vulcanCannon", 1);
		componentPoints.set("laser", 1);
		componentPoints.set("plasma", 2);
		componentPoints.set("pulseLaser", 1);
		componentPoints.set("lancer", 2);
		componentPoints.set("deathRay", 2);
		// Scanner:
		componentPoints.set("shortRangeScanner", 1);
		componentPoints.set("mediumRangeScanner", 2);
		componentPoints.set("longRangeScanner", 3);
		componentPoints.set("itemScanner", 1);
		componentPoints.set("antiJammerScanner", 1);
		// Jammer:
		componentPoints.set("shortRangeJammer", 1);
		componentPoints.set("mediumRangeJammer", 1);
		componentPoints.set("longRangeJammer", 1);
		// Treads:
		componentPoints.set("advancedTreads", 2);
		componentPoints.set("fastTreads", 1);
		componentPoints.set("armoredTreads", 1);
		componentPoints.set("heavilyArmoredTreads", 2);
		// Items:
		componentPoints.set("mine", 1);
		componentPoints.set("c4", 2);
		componentPoints.set("nitroRepair", 1);
		componentPoints.set("overdrive", 2);
		componentPoints.set("missileTrackingBeacon", 2);

		// Tracks category for each component.
		const componentCategories: Map<string, string> = new Map();
		// Chassis:
		componentCategories.set("moddableLight", "chassis");
		componentCategories.set("light", "chassis");
		componentCategories.set("moddable", "chassis");
		componentCategories.set("heavy", "chassis");
		componentCategories.set("moddableHeavy", "chassis");
		// Weapons:
		componentCategories.set("machineGun", "weapon");
		componentCategories.set("grenadeLauncher", "weapon");
		componentCategories.set("missile", "weapon");
		componentCategories.set("shotgun", "weapon");
		componentCategories.set("vulcanCannon", "weapon");
		componentCategories.set("laser", "weapon");
		componentCategories.set("plasma", "weapon");
		componentCategories.set("pulseLaser", "weapon");
		componentCategories.set("lancer", "weapon");
		componentCategories.set("deathRay", "weapon");
		// Scanner:
		componentCategories.set("shortRangeScanner", "scanner");
		componentCategories.set("mediumRangeScanner", "scanner");
		componentCategories.set("longRangeScanner", "scanner");
		componentCategories.set("itemScanner", "scanner");
		componentCategories.set("antiJammerScanner", "scanner");
		// Jammer:
		componentCategories.set("shortRangeJammer", "jammer");
		componentCategories.set("mediumRangeJammer", "jammer");
		componentCategories.set("longRangeJammer", "jammer");
		// Treads:
		componentCategories.set("advancedTreads", "treads");
		componentCategories.set("fastTreads", "treads");
		componentCategories.set("armoredTreads", "treads");
		componentCategories.set("heavilyArmoredTreads", "treads");
		// Items:
		componentCategories.set("mine", "item");
		componentCategories.set("c4", "item");
		componentCategories.set("nitroRepair", "item");
		componentCategories.set("overdrive", "item");
		componentCategories.set("missileTrackingBeacon", "item");

		this.state = {
			chassis: null,
			weapons: null,
			scanners: null,
			jammers: null,
			treads: null,
			items: null,
			currentTank: this.props.tank,
			currentChassis: null,
			currentWeapons: null,
			currentScanners: null,
			currentJammers: null,
			currentTreads: null,
			currentItems: null
		}
	}

	componentDidMount(): ?Array<string> {
		this.setInventory();
		this.setCurrentTank();
	}

	// After Components mounts, the tank components are split up into sections based on their type.
	setInventory(): void {
		
		let inventory: ?Array<String> = this.props.components;

		// Setup inventory.
		let i: number = 0;
		for(i; i < inventory.length; i++) {
			switch(this.componentCategories.get(inventory[i])) {
				case "chassis":
					this.setState({chassis: this.state.chassis.push(inventory[i])});
					break;
				case "weapon":
					this.setState({weapons: this.state.weapons.push(inventory[i])});
					break;
				case "scanner":
					this.setState({scanners: this.state.scanners.push(inventory[i])});
					break;
				case "jammer":
					this.setState({jammers: this.state.jammers.push(inventory[i])});
					break;
				case "treads":
					this.setState({treads: this.state.treads.push(inventory[i])});
					break;
				case "item":
					this.setState({items: this.state.items.push(inventory[i])});
					break;
				default:
					console.log("Unexepected Component.");
			}
		}
	}

	setCurrentTank(): void {
		
		let tank: ?Array<string> = this.state.currentTank;

		let i: number = 0;
		for(i; i < tank.length; i++) {
			switch(this.componentCategories.get(tank[i])) {
				case "chassis":
					this.setState({currentChassis: tank[i]});
					break;
				case "weapon":
					this.setState({currentWeapons: this.state.currentWeapons.push(tank[i])});
					break;
				case "scanner":
					this.setState({currentScanners: this.state.currentScanners.push(tank[i])});
					break;
				case "jammer":
					this.setState({currentJammers: tank[i]});
					break;
				case "treads":
					this.setState({currentTreads: tank[i]});
					break;
				case "item":
					this.setState({currentItems: this.state.currentItems.push(tank[i])});
					break;
				default:
					console.log("Invalid Component.");
			}
		}
	}

	_updateComponents(): void {

	}

	render(): React.Node {
		return (
			<div>
				<h6>Chassis</h6>
				<select className="tankComponentMenu">
					<option defaultValue={this.state.currentChassis}>{this.state.currentChassis}</option>
				</select>
			</div>
		)
	}
}

export default ComponentMenu;
*/