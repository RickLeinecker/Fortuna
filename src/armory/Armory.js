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
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/verifyLogin.js';
import TankPart from '../tanks/TankPart.js';
import BackendTank from '../tanks/BackendTank.js';
import Component from './Component.js';
import Tank from '../tanks/Tank.js';
import Chassis from '../tanks/Chassis.js';
import Gun from '../tanks/Gun.js';
import Scanner from '../tanks/Scanner.js';
import Jammer from '../tanks/Jammer.js';
import Treads from '../tanks/Treads.js';
import setTankForCasus from '../globalComponents/setTankForCasus.js';
import Cookies from 'universal-cookie';

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
	componentList: Array<Component>,
	currentPartIndex: number,
	points: number,
|};

// Armory page. Showcases player's tanks and components. Links to Casus.
class Armory extends React.Component<Props, State> {

	constructor() {
		super();
		verifyLogin();
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
			componentList: [],
			currentPartIndex: 0,
			points: 0,
		}

		if (this.state.selectedTank == null) {
			throw new Error('Failed in loading blank tank!');
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
					const newSelectedTank=getTank(data[0]);
					this.setState({selectedTank: newSelectedTank});
					setTankForCasus(newSelectedTank._id);
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
		setTankForCasus(newTankId);
	}

	// Function that will save the selectedTank.
	saveTank(): void {
		const cookie = new Cookies();
		const responsePromise: Promise<Response> = fetch('/api/tank/tankUpdate/' + this.state.selectedTank._id, {
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
				isBot: false,
			}),
		});
		responsePromise.then(
			response => response.json().then(data => {
				if(response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
				}
				else {
					// Update the user inventory once the tank is saved and backend is refreshed.
					this.getUserInventory();
				}
			})
		);
	}

	// Handles initializing points when the page is first loaded or when a new tank is selected.
	initPoints(): void {
		const tank: Tank = this.state.selectedTank;
		let newPoints: number = 0;
		this.setState({ points: 0 });
		for(let i = 0; i < 11; i++) {
			newPoints = newPoints + getComponentPoints(tank.parts[i].name);
		}
		this.setState({ points: newPoints });
	}

	// Ensure that the new point value doesn't go over the limit.
	checkPoints(newComponent: TankComponent, oldPartIndex: number): boolean {
		return (this.state.points + getComponentPoints(newComponent) - getComponentPoints(this.state.selectedTank.parts[oldPartIndex].name) > 10) ? true : false;
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

	// Updates the selected tank's components and their inventory.
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
		// Reset component list to provide user feedback.
		this.setState({selectedTank: updatedTank, componentList: []});
		// Save the tank.
		this.saveTank();
	}

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar 
					linkName="/MainMenu" 
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
					<Link to={verifyLink("/Casus")}>
						<button type="button" className="primarybtn">Casus</button>
					</Link>
				</div>
				<div className="column armorymiddle">
					<h1>{this.state.selectedTank.tankName}</h1>
					<table className="componentMenu">
						<tr>
							<th>Component Name</th>
							<th>Number Owned</th>
							<th>Point Value</th>
						</tr>
						{(this.state.componentList == null) ? <tr></tr> : this.state.componentList.map(({componentName, numberOwned}, index) => (
							<tr key={index}>
								<td align="left">
									<button 
										className="componentMenuBtn"
										onClick={() => this.updateComponent(componentName, this.state.currentPartIndex)}
										disabled={this.checkPoints(componentName, this.state.currentPartIndex)}
									>
										{this.toTitleCase(componentName)}
									</button>
								</td>
								<td>{numberOwned}</td>
								<td>{getComponentPoints(componentName)}</td>
							</tr>
						))}
					</table>
				</div>
				<div className="column armoryright">
					<h5>{this.state.points}/10 Points Used</h5>
					<h6>Chassis</h6>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.chassis, currentPartIndex: 0})}
					>
						{this.toTitleCase(this.state.selectedTank.chassis.name)}
					</button>

					<h6>Weapons: Main | Secondary</h6>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.weapons, currentPartIndex: 1})}
					>
						{this.toTitleCase(this.state.selectedTank.mainGun.name)}
					</button>
					<br/>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.weapons, currentPartIndex: 2})}
					>
						{this.toTitleCase(this.state.selectedTank.secondaryGun.name)}
					</button>

					<h6>Scanners: Scanner | Addon | Addon</h6>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.scanners, currentPartIndex: 3})}
					>
						{this.toTitleCase(this.state.selectedTank.scanner.name)}
					</button>
					<br/>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.scannerAddons, currentPartIndex: 4})}
					>
						{this.toTitleCase(this.state.selectedTank.scannerAddonOne.name)}
					</button>
					<br/>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.scannerAddons, currentPartIndex: 5})}
					>
						{this.toTitleCase(this.state.selectedTank.scannerAddonTwo.name)}
					</button>

					<h6>Jammers</h6>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.jammers, currentPartIndex: 6})}
					>
						{this.toTitleCase(this.state.selectedTank.jammer.name)}
					</button>

					<h6>Treads</h6>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.treads, currentPartIndex: 7})}
					>
						{this.toTitleCase(this.state.selectedTank.treads.name)}
					</button>

					<h6>Single-Use Items</h6>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.items, currentPartIndex: 8})}
					>
						{this.toTitleCase(this.state.selectedTank.itemOne.name)}
					</button>
					<br/>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.items, currentPartIndex: 9})}
					>
						{this.toTitleCase(this.state.selectedTank.itemTwo.name)}
					</button>
					<br/>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.items, currentPartIndex: 10})}
					>
						{this.toTitleCase(this.state.selectedTank.itemThree.name)}
					</button>
				</div>
			</div>
		);
	}
}

export default Armory;
