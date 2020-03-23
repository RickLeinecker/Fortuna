//@flow strict

// React
import * as React from 'react';
import { Link } from 'react-router-dom';
// CSS
import './Armory.css';
// Components
import Navbar from '../globalComponents/Navbar.js';
import CreateNewTankPopup from './CreateNewTankPopup.js';
// Functions
import { getOptionsOfType, getInventory, getComponentPoints, verifyComponent } from './GetInventoryInfo.js';
import { getUser } from '../globalComponents/userAPIIntegration.js';
import { getAllUsersTanks } from '../globalComponents/tankAPIIntegration.js';
import { getTank } from '../tanks/TankLoader.js';
// Types and Classes
import type { TankComponent } from './TankComponent.js';
import Component from './Component.js';
import Tank from '../tanks/Tank.js';
import Cookies from 'universal-cookie';
import Chassis from '../tanks/Chassis.js';
import Gun from '../tanks/Gun.js';
import Scanner from '../tanks/Scanner.js';
import Jammer from '../tanks/Jammer.js';
import Item from '../tanks/Item.js';
import Treads from '../tanks/Treads.js';

type Props = {||};

type State = {|
	selectedTank: ?Tank,
	allTanks: ?Array<Tank>,
	inventory: Array<Component>,
	chassis: Array<Component>,
	weapons: Array<Component>,
	scanners: Array<Component>,
	scannerAddons: Array<Component>,
	jammers: Array<Component>,
	treads: Array<Component>,
	items: Array<Component>,
	points: number,
|};

// Armory page. Showcases player's tanks and components. Links to Casus.
class Armory extends React.Component<Props, State> {

	constructor() {
		super();

		this.state = {
			selectedTank: null,
			allTanks: null,
			inventory: [],
			chassis: [],
			weapons: [],
			scanners: [],
			scannerAddons: [],
			jammers: [],
			treads: [],
			items: [],
			points: 0,
		}

		// Functions to get all user tanks and user inventory.
		this.getTanks();
		this.getInventory();
	}

	// Gets all user tanks and sets them to the state.
	getTanks(): void {
		const responsePromise = getAllUsersTanks();
		
		responsePromise.then (
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
				}
				else {
					let allTanks: Array<Tank> = [];
					for(const tank of data) {
						allTanks.push(getTank(tank));
					}
					this.setState({allTanks: data});
					// If no tank is set, set the first tank found as the selectedTank.
					if(this.state.selectedTank == null) {
						this.setState({selectedTank: getTank(data[0])});
						// Set point value.
						for(const component of data[0].components) {
							if(component != null) {
								this.updatePoints(verifyComponent(component));
							}
						}
					}
				}
			})
		)
	}

	// Gets all of the user's inventory.
	getInventory(): void {
		const responsePromise = getUser();

		responsePromise.then (
			response => response.json().then(data => {
				if(response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
				}
				else {
					this.setState({
						inventory: getInventory(data.inventory.tankComponents),
						chassis: getOptionsOfType(data.inventory.tankComponents, 'chassis'),
						weapons: getOptionsOfType(data.inventory.tankComponents, 'weapon'),
						scanners: getOptionsOfType(data.inventory.tankComponents, 'scanner'),
						scannerAddons: getOptionsOfType(data.inventory.tankComponents, 'scannerAddon'),
						jammers: getOptionsOfType(data.inventory.tankComponents, 'jammer'),
						treads: getOptionsOfType(data.inventory.tankComponents, 'treads'),
						items: getOptionsOfType(data.inventory.tankComponents, 'item'),
					});
				}
			})
		)
	}

	// Converts camel case to title case.
	toTitleCase(str: string): string {
		// Check for undefined strings.
		if(str == null) {
			return '';
		}

		let newStr = str.replace( /([A-Z])/g, " $1");
		return newStr.charAt(0).toUpperCase() + newStr.slice(1);
	}

	// Find the tank via its name and set it to the selectedTank and in a Cookie for Casus.
	changeSelectedTank(newTankId: string): void {
		// Null check for if the user has no tanks.
		// We should probably make it impossible for users to have none.
		if(this.state.allTanks == null) {
			console.log('No tanks found!');
			return;
		}

		// Find the new tank via its id and set it to selectedTank and a cookie.
		const newTank: Tank = getTank(this.state.allTanks.find(tank => tank._id === newTankId));
		// Set point value.
		for(const component of newTank.components) {
			if(component != null) {
				this.updatePoints(verifyComponent(component));
			}
		}
		this.setState({ selectedTank: newTank});
		const cookies = new Cookies();
		cookies.set('tank', newTank);
	}

	// Function that will save the selectedTank.
	saveTank(): void {
		// Null check for selectedTank.
		if(this.state.selectedTank == null) {
			console.log('No selected tank!');
			return;
		}

		// Save tank.
		fetch('/api/tank/tankUpdate/' + this.state.selectedTank._id, {
			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ 
				tankName: this.state.selectedTank.tankName, 
				userId: this.state.selectedTank.userId, 
				components: this.state.selectedTank.components, 
				casusCode: this.state.selectedTank.casusCode, 
				isBot: false 
			}),
		});
	}

	// Ensure that the new point value doesn't go over the limit.
	checkPoints(newComponent: TankComponent, oldComponent: ?TankComponent): boolean {
		// Check if there is an old component being removed.
		let newPoints: number = 0;
		if(oldComponent == null) {
			newPoints = this.state.points + getComponentPoints(newComponent);
		}
		else {
			newPoints = this.state.points + getComponentPoints(newComponent) - getComponentPoints(oldComponent);
		}

		// Check if the points are greater than 10.
		if(newPoints > 10) {
			return true;
		} else {
			return false;
		}
	}

	// Update the points in the state.
	// Since the options that are too many points are disabled, no range checking is necessary.
	updatePoints(newComponent: TankComponent, oldComponent?: TankComponent): void {
		// Check if there is an old component that is being removed.
		let newPoints: number = 0;
		if(oldComponent == null) {
			newPoints = this.state.points + getComponentPoints(newComponent);
		}
		else {
			newPoints = this.state.points + getComponentPoints(newComponent) - getComponentPoints(oldComponent);
		}

		this.setState({points: newPoints});
	}

	// ALL UPDATES NEED API CALL TO UPDATE INVENTORY.
	updateChassis(chassis: TankComponent): void {
		// Set the newChassis.
		const newChassis: Chassis = new Chassis(chassis);

		// Update the selected tank with the new chassis.
		if(this.state.selectedTank == null) {
			console.log('No selected tank found!');
			return;
		}
		// Update points.
		const selectedTank: Tank = this.state.selectedTank;
		this.updatePoints(chassis, selectedTank.chassis.name);
		// Setup a new tank that will be updated and set to the selected tank.
		let updatedTank: Tank = getTank(selectedTank);
		// Update the chassis, parts, and components array.
		updatedTank.chassis = newChassis;
		updatedTank.parts[0] = newChassis;
		updatedTank.components[0] = newChassis.name;
		this.setState({selectedTank: updatedTank});

		// Save the tank.
		this.saveTank();
	}

	updateWeaponOne(weapon: TankComponent): void {
		// Set the newWeapon.
		const newWeapon: Gun = new Gun(weapon);

		// Update the selected tank with the new weapon.
		if(this.state.selectedTank == null) {
			console.log('No selected tank found!');
			return;
		}
		// Update points.
		const selectedTank: Tank = this.state.selectedTank;
		this.updatePoints(weapon, selectedTank.mainGun.name);
		// Setup a new tank that will be updated and set to the selected tank.
		let updatedTank: Tank = getTank(selectedTank);
		// Update the mainGun, parts, and components array.
		updatedTank.mainGun = newWeapon;
		updatedTank.parts[1] = newWeapon;
		updatedTank.components[1] = newWeapon.name;
		this.setState({selectedTank: updatedTank});

		// Save the tank.
		this.saveTank();
	}

	updateWeaponTwo(weapon: TankComponent): void {
		// Set the newWeapon.
		const newWeapon: Gun = new Gun(weapon);

		// Update the selected tank with the new weapon.
		if(this.state.selectedTank == null) {
			console.log('No selected tank found!');
			return;
		}
		// Update points.
		const selectedTank: Tank = this.state.selectedTank;
		this.updatePoints(weapon, selectedTank.secondaryGun.name);
		// Setup a new tank that will be updated and set to the selected tank.
		let updatedTank: Tank = getTank(selectedTank);
		// Update the mainGun, parts, and components array.
		updatedTank.secondaryGun = newWeapon;
		updatedTank.parts[2] = newWeapon;
		updatedTank.components[2] = newWeapon.name;
		this.setState({selectedTank: updatedTank});

		// Save the tank.
		this.saveTank();
	}

	updateScanner(scanner: TankComponent): void {
		// Set the newScanner.
		const newScanner: Scanner = new Scanner(scanner, false, false);

		// Update the selected tank with the new scanner.
		if(this.state.selectedTank == null) {
			console.log('No selected tank found!');
			return;
		}
		// Update points.
		const selectedTank: Tank = this.state.selectedTank;
		this.updatePoints(scanner, selectedTank.scanner.name);
		// Setup a new tank that will be updated and set to the selected tank.
		let updatedTank: Tank = getTank(selectedTank);
		// Update the scanner, parts, and components array.
		updatedTank.scanner = newScanner;
		updatedTank.parts[3] = newScanner;
		updatedTank.components[3] = newScanner.name;
		this.setState({selectedTank: updatedTank});

		// Save the tank.
		this.saveTank();
	}

	updateScannerAddonOne(scannerAddon: TankComponent): void {
		// Set the newScannerAddon.
		const newScannerAddon: Scanner = new Scanner(scannerAddon, false, false);

		// Update the selected tank with the new scanner addon.
		if(this.state.selectedTank == null) {
			console.log('No selected tank found!');
			return;
		}
		// Update points.
		const selectedTank: Tank = this.state.selectedTank;
		this.updatePoints(scannerAddon, selectedTank.scannerAddonOne.name);
		// Setup a new tank that will be updated and set to the selected tank.
		let updatedTank: Tank = getTank(selectedTank);
		// Update the scannerAddonOne, parts, and components array.
		updatedTank.scannerAddonOne = newScannerAddon;
		updatedTank.parts[4] = newScannerAddon;
		updatedTank.components[4] = newScannerAddon.name;
		this.setState({selectedTank: updatedTank});

		// Save the tank.
		this.saveTank();
	}

	updateScannerAddonTwo(scannerAddon: TankComponent): void {
		// Set the newScannerAddon.
		const newScannerAddon: Scanner = new Scanner(scannerAddon, false, false);

		// Update the selected tank with the new scanner addon.
		if(this.state.selectedTank == null) {
			console.log('No selected tank found!');
			return;
		}
		// Update points.
		const selectedTank: Tank = this.state.selectedTank;
		this.updatePoints(scannerAddon, selectedTank.scannerAddonTwo.name);
		// Setup a new tank that will be updated and set to the selected tank.
		let updatedTank: Tank = getTank(selectedTank);
		// Update the ScannerAddonTwo, parts, and components array.
		updatedTank.scannerAddonTwo = newScannerAddon;
		updatedTank.parts[5] = newScannerAddon;
		updatedTank.components[5] = newScannerAddon.name;
		this.setState({selectedTank: updatedTank});

		// Save the tank.
		this.saveTank();
	}

	updateJammer(jammer: TankComponent): void {
		// Set the newJammer.
		const newJammer: Jammer = new Jammer(jammer);

		// Update the selected tank with the new jammer.
		if(this.state.selectedTank == null) {
			console.log('No selected tank found!');
			return;
		}
		// Update points.
		const selectedTank: Tank = this.state.selectedTank;
		this.updatePoints(jammer, selectedTank.jammer.name);
		// Setup a new tank that will be updated and set to the selected tank.
		let updatedTank: Tank = getTank(selectedTank);
		// Update the jammer, parts, and components array.
		updatedTank.jammer = newJammer;
		updatedTank.parts[6] = newJammer;
		updatedTank.components[6] = newJammer.name;
		this.setState({selectedTank: updatedTank});

		// Save the tank.
		this.saveTank();
	}

	updateTreads(treads: TankComponent): void {
		// Set the newTreads.
		const newTreads: Treads = new Treads(treads);

		// Update the selected tank with the new treads.
		if(this.state.selectedTank == null) {
			console.log('No selected tank found!');
			return;
		}
		// Update points.
		const selectedTank: Tank = this.state.selectedTank;
		this.updatePoints(treads, selectedTank.treads.name);
		// Setup a new tank that will be updated and set to the selected tank.
		let updatedTank: Tank = getTank(selectedTank);
		// Update the treads, parts, and components array.
		updatedTank.treads = newTreads;
		updatedTank.parts[7] = newTreads;
		updatedTank.components[7] = newTreads.name;
		this.setState({selectedTank: updatedTank});

		// Save the tank.
		this.saveTank();
	}
	updateItemOne(item: TankComponent): void {
		// Set the newItem.
		const newItem: Item = new Item(item);

		// Update the selected tank with the new item.
		if(this.state.selectedTank == null) {
			console.log('No selected tank found!');
			return;
		}
		// Update points.
		const selectedTank: Tank = this.state.selectedTank;
		this.updatePoints(item, selectedTank.itemOne.name);
		// Setup a new tank that will be updated and set to the selected tank.
		let updatedTank: Tank = getTank(selectedTank);
		// Update the itemOne, parts, and components array.
		updatedTank.itemOne = newItem;
		updatedTank.parts[8] = newItem;
		updatedTank.components[8] = newItem.name;
		this.setState({selectedTank: updatedTank});

		// Save the tank.
		this.saveTank();
	}
	updateItemTwo(item: TankComponent): void {
		// Set the newItem.
		const newItem: Item = new Item(item);

		// Update the selected tank with the new item.
		if(this.state.selectedTank == null) {
			console.log('No selected tank found!');
			return;
		}
		// Update points.
		const selectedTank: Tank = this.state.selectedTank;
		this.updatePoints(item, selectedTank.itemTwo.name);
		// Setup a new tank that will be updated and set to the selected tank.
		let updatedTank: Tank = getTank(selectedTank);
		// Update the itemTwo, parts, and components array.
		updatedTank.itemTwo = newItem;
		updatedTank.parts[9] = newItem;
		updatedTank.components[9] = newItem.name;
		this.setState({selectedTank: updatedTank});

		// Save the tank.
		this.saveTank();
	}

	updateItemThree(item: TankComponent): void {
		// Set the newItem.
		const newItem: Item = new Item(item);

		// Update the selected tank with the new item.
		if(this.state.selectedTank == null) {
			console.log('No selected tank found!');
			return;
		}
		// Update points.
		const selectedTank: Tank = this.state.selectedTank;
		this.updatePoints(item, selectedTank.itemThree.name);
		// Setup a new tank that will be updated and set to the selected tank.
		let updatedTank: Tank = getTank(selectedTank);
		// Update the itemOne, parts, and components array.
		updatedTank.itemThree = newItem;
		updatedTank.parts[10] = newItem;
		updatedTank.components[10] = newItem.name;
		this.setState({selectedTank: updatedTank});

		// Save the tank.
		this.saveTank();
	}

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar 
					linkName="MainMenu" 
					returnName="Back to Main Menu" 
					pageName="Armory"
				/>
				<div className="column armoryleft">
					<h3>Select a Tank to Edit</h3>
					<select className="dropdownMenu"  onChange={(e) => this.changeSelectedTank(e.target.value)}>
						{(this.state.allTanks != null) ?
							this.state.allTanks.map(({tankName, _id}) => ({tankName, _id})).map(({tankName, _id}, index) =>
								<option key={index} value={_id}>{tankName}</option>) :
							<option></option>
						}
					</select>
					<h6>Setup a Wager</h6>
					<button type="button" className="btn">Setup</button>
					<CreateNewTankPopup 
						ref="CreateNewTankPopup" 
						chassis={this.state.chassis} 
						scanners={this.state.scanners} 
						treads={this.state.treads}
					/>
					<br/>
					<h6>Edit Selected Tank's Code</h6>
					<Link to="Casus">
						<button type="button" className="primarybtn">Casus</button>
					</Link>
				</div>
				<div className="column armorymiddle">
					<h1>{(this.state.selectedTank != null) ? this.state.selectedTank.tankName : 'No Tank Selected'}</h1>
				</div>
				<div className="column armoryright">
					<h5>{this.state.points}/10 Points Used</h5>
					<h6>Chassis</h6>
					<select className="tankComponentMenu" onChange={(e) => this.updateChassis(e.target.value)}>
						<option defaultValue>{(this.state.selectedTank != null) ? this.toTitleCase(this.state.selectedTank.chassis.name) : ''}</option>
						{this.state.chassis.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, (this.state.selectedTank==null) ? null : this.state.selectedTank.chassis.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<h6>Weapons: Main | Secondary</h6>
					<select className="tankComponentMenu" onChange={(e) => this.updateWeaponOne(e.target.value)}>
					<option defaultValue>{(this.state.selectedTank != null) ? this.toTitleCase(this.state.selectedTank.mainGun.name) : ''}</option>
						{this.state.weapons.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, (this.state.selectedTank==null) ? null : this.state.selectedTank.mainGun.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<select className="tankComponentMenu" onChange={(e) => this.updateWeaponTwo(e.target.value)}>
						<option defaultValue>{(this.state.selectedTank != null) ? this.toTitleCase(this.state.selectedTank.secondaryGun.name) : ''}</option>
						{this.state.weapons.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, (this.state.selectedTank==null) ? null : this.state.selectedTank.secondaryGun.name)}
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<h6>Scanners: Scanner | Addon | Addon</h6>
					<select className="tankComponentMenu" onChange={(e) => this.updateScanner(e.target.value)}>
						<option defaultValue>{(this.state.selectedTank != null) ? this.toTitleCase(this.state.selectedTank.scanner.name) : ''}</option>
						{this.state.scanners.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, (this.state.selectedTank==null) ? null : this.state.selectedTank.scanner.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<select className="tankComponentMenu" onChange={(e) => this.updateScannerAddonOne(e.target.value)}>
						<option defaultValue>{(this.state.selectedTank != null) ? this.toTitleCase(this.state.selectedTank.scannerAddonOne.name) : ''}</option>
						{this.state.scannerAddons.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, (this.state.selectedTank==null) ? null : this.state.selectedTank.scannerAddonOne.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<select className="tankComponentMenu" onChange={(e) => this.updateScannerAddonTwo(e.target.value)}>
						<option defaultValue>{(this.state.selectedTank != null) ? this.toTitleCase(this.state.selectedTank.scannerAddonTwo.name) : ''}</option>
						{this.state.scannerAddons.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, (this.state.selectedTank==null) ? null : this.state.selectedTank.scannerAddonTwo.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<h6>Jammers</h6>
					<select className="tankComponentMenu" onChange={(e) => this.updateJammer(e.target.value)}>
						<option defaultValue>{(this.state.selectedTank != null) ? this.toTitleCase(this.state.selectedTank.jammer.name) : ''}</option>
						{this.state.jammers.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, (this.state.selectedTank==null) ? null : this.state.selectedTank.jammer.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<h6>Treads</h6>
					<select className="tankComponentMenu" onChange={(e) => this.updateTreads(e.target.value)}>
						<option defaultValue>{(this.state.selectedTank != null) ? this.toTitleCase(this.state.selectedTank.treads.name) : ''}</option>
						{this.state.treads.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, (this.state.selectedTank==null) ? null : this.state.selectedTank.treads.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<h6>Single-Use Items</h6>
					<select className="tankComponentMenu" onChange={(e) => this.updateItemOne(e.target.value)}>
						<option defaultValue>{(this.state.selectedTank != null) ? this.toTitleCase(this.state.selectedTank.itemOne.name) : ''}</option>
						{this.state.items.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, (this.state.selectedTank==null) ? null : this.state.selectedTank.itemOne.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<select className="tankComponentMenu" onChange={(e) => this.updateItemTwo(e.target.value)}>
						<option defaultValue>{(this.state.selectedTank != null) ? this.toTitleCase(this.state.selectedTank.itemTwo.name) : ''}</option>
						{this.state.items.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, (this.state.selectedTank==null) ? null : this.state.selectedTank.itemTwo.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<select className="tankComponentMenu" onChange={(e) => this.updateItemThree(e.target.value)}>
						<option defaultValue>{(this.state.selectedTank != null) ? this.toTitleCase(this.state.selectedTank.itemThree.name) : ''}</option>
						{this.state.items.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, (this.state.selectedTank==null) ? null : this.state.selectedTank.itemThree.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
				</div>
			</div>
		);
	}
}

export default Armory;