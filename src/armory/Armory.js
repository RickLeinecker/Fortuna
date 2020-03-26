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
import { getInventory, getComponentPoints } from './GetInventoryInfo.js';
import { getUser } from '../globalComponents/userAPIIntegration.js';
import { getAllUsersTanks } from '../globalComponents/tankAPIIntegration.js';
import { getTank, getEmptyCasusCode } from '../tanks/TankLoader.js';
// Types and Classes
import type { TankComponent } from './TankComponent.js';
import TankPart from '../tanks/TankPart.js';
import BackendTank from '../tanks/BackendTank.js';
import Component from './Component.js';
import Tank from '../tanks/Tank.js';
import Cookies from 'universal-cookie';
import Chassis from '../tanks/Chassis.js';
import Gun from '../tanks/Gun.js';
import Scanner from '../tanks/Scanner.js';
import Jammer from '../tanks/Jammer.js';
import Treads from '../tanks/Treads.js';

type Props = {||};

type State = {|
	selectedTank: Tank,
	allTanks: Array<Tank>,
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

		// Create a blank tank as a placeholder until tanks are pulled.
		const blankTank: BackendTank = new BackendTank();
		blankTank._id = '';
		blankTank.components = [
			'moddable', 'empty', 'empty',
			'empty', 'empty', 'empty',
			'empty', 'fastTreads', 'empty',
			'empty', 'empty',
		];
		blankTank.casusCode = getEmptyCasusCode();
		blankTank.isBot = false;
		blankTank.tankName = '';

		this.state = {
			selectedTank: getTank(blankTank),
			allTanks: [],
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
		this.getUserInventory();
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
					const allTanks: Array<Tank> = [];
					for(const tank of data) {
						allTanks.push(getTank(tank));
					}
					this.setState({allTanks: allTanks});
					this.setState({selectedTank: getTank(data[0])});
					this.initPoints();
				}
			})
		)
	}

	// Gets all of the user's inventory.
	getUserInventory(): void {
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
						chassis: getInventory(data.inventory.tankComponents, 'chassis'),
						weapons: getInventory(data.inventory.tankComponents, 'weapon'),
						scanners: getInventory(data.inventory.tankComponents, 'scanner'),
						scannerAddons: getInventory(data.inventory.tankComponents, 'scannerAddon'),
						jammers: getInventory(data.inventory.tankComponents, 'jammer'),
						treads: getInventory(data.inventory.tankComponents, 'treads'),
						items: getInventory(data.inventory.tankComponents, 'item'),
					});
				}
			})
		)
	}

	// Converts camel case to title case.
	toTitleCase(str: string): string {
		let newStr = str.replace( /([A-Z])/g, " $1");
		return newStr.charAt(0).toUpperCase() + newStr.slice(1);
	}

	// Find the tank via its id and set it to the selectedTank and its id in a Cookie for Casus.
	// Also initializes the points for the new tank.
	changeSelectedTank(newTankId: string): void {
		this.setState({ selectedTank: this.state.allTanks.find(tank => tank._id === newTankId)});
		this.initPoints();
		const cookies = new Cookies();
		cookies.set('selectedTankId', newTankId);
	}

	// Function that will save the selectedTank.
	saveTank(): void {
		// Save tank.
		const cookie = new Cookies();
		fetch('/api/tank/tankUpdate/' + this.state.selectedTank._id, {
			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': cookie.get('token'),
			},
			body: JSON.stringify({ 
				tankName: this.state.selectedTank.tankName, 
				userId: this.state.selectedTank.userId, 
				components: this.state.selectedTank.parts.map(part => part.name), 
				casusCode: this.state.selectedTank.casusCode, 
				isBot: false 
			}),
		});
	}

	// Handles initializing points when the page is first loaded or when a new tank is selected.
	initPoints(): void {
		const tank: Tank = this.state.selectedTank;
		this.setState({ points: 0 });
		for(let i = 0; i < 11; i++) {
			this.updatePoints(tank.parts[i].name);
		}
	}

	// Ensure that the new point value doesn't go over the limit.
	checkPoints(newComponent: TankComponent, oldComponent: TankComponent): boolean {
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

	// UPDATES NEED API CALL TO UPDATE INVENTORY.
	// Updates the selected tank's components.
	updateComponent(component: TankComponent, partIndex: number): void {
		// Setup a new tank that will be updated and set to the selected tank.
		const updatedTank: Tank = this.state.selectedTank;
		// Find the component's type and setup new component accordingly.
		let newComponent: TankPart = new TankPart(component);
		switch(partIndex) {
			case 0:
				newComponent = new Chassis(component);
				updatedTank.chassis = newComponent;
				break;
			case 1:
				newComponent = new Gun(component, false);
				updatedTank.mainGun = newComponent;
				break;
			case 2:
				newComponent = new Gun(component, true);
				updatedTank.secondaryGun = newComponent;
				break;
			case 3:
				newComponent = new Scanner(
					component, 
					(updatedTank.scannerAddonOne.name === 'itemScanner' || updatedTank.scannerAddonTwo.name === 'itemScanner') ? true : false,
					(updatedTank.scannerAddonOne.name === 'antiJammerScanner' || updatedTank.scannerAddonTwo.name === 'antiJammerScanner') ? true : false,
				);
				updatedTank.scanner = newComponent;
				break;
			case 4:
				newComponent = new TankPart(component);
				updatedTank.scannerAddonOne = newComponent;
				break;
			case 5:
				newComponent = new TankPart(component);
				updatedTank.scannerAddonTwo = newComponent;
				break;
			case 6:
				newComponent = new Jammer(component);
				updatedTank.jammer = newComponent;
				break;
			case 7:
				newComponent = new Treads(component);
				updatedTank.treads = newComponent;
				break;
			case 8:
				newComponent = new TankPart(component);
				updatedTank.itemOne = newComponent;
				break;
			case 9:
				newComponent = new TankPart(component);
				updatedTank.itemTwo = newComponent;
				break;
			case 10:
				newComponent = new TankPart(component);
				updatedTank.itemThree = newComponent;
				break;
			default:
				break;
		}

		// Update the component, points, and parts array.
		this.updatePoints(newComponent.name, updatedTank.parts[partIndex].name);
		updatedTank.parts[partIndex] = newComponent;
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
					<select className="dropdownMenu" onChange={e => this.changeSelectedTank(e.target.value)}>
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
					<h1>{this.state.selectedTank.tankName}</h1>
				</div>
				<div className="column armoryright">
					<h5>{this.state.points}/10 Points Used</h5>
					<h6>Chassis</h6>
					<select className="tankComponentMenu" onChange={e => this.updateComponent(e.target.value, 0)}>
						<option defaultValue>{this.toTitleCase(this.state.selectedTank.chassis.name)}</option>
						{this.state.chassis.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, this.state.selectedTank.chassis.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<h6>Weapons: Main | Secondary</h6>
					<select className="tankComponentMenu" onChange={e => this.updateComponent(e.target.value, 1)}>
					<option defaultValue>{(this.state.selectedTank.mainGun != null) ? this.toTitleCase(this.state.selectedTank.mainGun.name) : ''}</option>
						{this.state.weapons.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, this.state.selectedTank.mainGun.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<select className="tankComponentMenu" onChange={e => this.updateComponent(e.target.value, 2)}>
						<option defaultValue>{(this.state.selectedTank.secondaryGun != null) ? this.toTitleCase(this.state.selectedTank.secondaryGun.name) : ''}</option>
						{this.state.weapons.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, this.state.selectedTank.secondaryGun.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<h6>Scanners: Scanner | Addon | Addon</h6>
					<select className="tankComponentMenu" onChange={e => this.updateComponent(e.target.value, 3)}>
						<option defaultValue>{(this.state.selectedTank.scanner != null) ? this.toTitleCase(this.state.selectedTank.scanner.name) : ''}</option>
						{this.state.scanners.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, this.state.selectedTank.scanner.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<select className="tankComponentMenu" onChange={e => this.updateComponent(e.target.value, 4)}>
						<option defaultValue>{(this.state.selectedTank.scannerAddonOne != null) ? this.toTitleCase(this.state.selectedTank.scannerAddonOne.name) : ''}</option>
						{this.state.scannerAddons.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, this.state.selectedTank.scannerAddonOne.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<select className="tankComponentMenu" onChange={e => this.updateComponent(e.target.value, 5)}>
						<option defaultValue>{(this.state.selectedTank.scannerAddonTwo != null) ? this.toTitleCase(this.state.selectedTank.scannerAddonTwo.name) : ''}</option>
						{this.state.scannerAddons.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, this.state.selectedTank.scannerAddonTwo.name)} 
								key={index} value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<h6>Jammers</h6>
					<select className="tankComponentMenu" onChange={e => this.updateComponent(e.target.value, 6)}>
						<option defaultValue>{(this.state.selectedTank.jammer != null) ? this.toTitleCase(this.state.selectedTank.jammer.name) : ''}</option>
						{this.state.jammers.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, this.state.selectedTank.jammer.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<h6>Treads</h6>
					<select className="tankComponentMenu" onChange={e => this.updateComponent(e.target.value, 7)}>
						<option defaultValue>{this.toTitleCase(this.state.selectedTank.treads.name)}</option>
						{this.state.treads.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, this.state.selectedTank.treads.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<h6>Single-Use Items</h6>
					<select className="tankComponentMenu" onChange={e => this.updateComponent(e.target.value, 8)}>
						<option defaultValue>{(this.state.selectedTank.itemOne != null) ? this.toTitleCase(this.state.selectedTank.itemOne.name) : ''}</option>
						{this.state.items.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, this.state.selectedTank.itemOne.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<select className="tankComponentMenu" onChange={e => this.updateComponent(e.target.value, 9)}>
						<option defaultValue>{(this.state.selectedTank.itemTwo != null) ? this.toTitleCase(this.state.selectedTank.itemTwo.name) : ''}</option>
						{this.state.items.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, this.state.selectedTank.itemTwo.name)} 
								key={index} 
								value={componentName}
							>
								{this.toTitleCase(componentName)} {numberOwned}
							</option>
						))}
					</select>
					<select className="tankComponentMenu" onChange={e => this.updateComponent(e.target.value, 10)}>
						<option defaultValue>{(this.state.selectedTank.itemThree != null) ? this.toTitleCase(this.state.selectedTank.itemThree.name) : ''}</option>
						{this.state.items.map(({componentName, numberOwned}, index) => (
							<option 
								disabled={this.checkPoints(componentName, this.state.selectedTank.itemThree.name)} 
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