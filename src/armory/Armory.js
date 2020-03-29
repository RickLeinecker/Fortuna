//@flow strict

// React
import * as React from 'react';
import { Link } from 'react-router-dom';
// CSS
import './Armory.css';
// Components
import Navbar from '../globalComponents/Navbar.js';
import CreateNewTankPopup from './CreateNewTankPopup.js';
import DeleteTankPopup from './DeleteTankPopup.js';
import SelectTank from './SelectTank.js';
import SetWagerPopup from './SetWagerPopup.js';
// Functions
import { getInventory, getComponentPoints } from './GetInventoryInfo.js';
import { getUser } from '../globalComponents/userAPIIntegration.js';
import { getAllUsersTanks } from '../globalComponents/tankAPIIntegration.js';
import { getTank, getEmptyCasusCode } from '../tanks/TankLoader.js';
import { toTitleCase } from '../globalComponents/Utility.js';
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
import TankDisplay from '../tanks/TankDisplay.js';
import getLoginToken from '../globalComponents/getLoginToken.js';

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
	showTanks: boolean,
|};

// Armory page. Showcases player's tanks and components. Links to Casus.
class Armory extends React.Component<Props, State> {

	constructor() {
		super();
		verifyLogin();
		// Create a blank tank as a placeholder until tanks are pulled.
		const blankTank: BackendTank = new BackendTank(
			'',
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',],
			getEmptyCasusCode(),
			false,
			'',
			''
		);

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
			currentPartIndex: -1,
			points: 0,
			showTanks: false,
		}

		if (this.state.selectedTank == null) {
			throw new Error('Failed in loading blank tank!');
		}
	}

	componentDidMount(): void {
		// Functions to get all user tanks and user inventory.
		this.getTanks();
		this.getUserInventory();
	}

	// Gets all user tanks and sets them to the state.
	getTanks(): void {
		getAllUsersTanks((successful, allTanks) => {
			if (successful) {
				// Always set the default selected tank to the newest tank.
				const newSelectedTank = allTanks[allTanks.length-1];
				setTankForCasus(newSelectedTank._id);
				// Update the state, and then run initPoints after the state has been set.
				this.setState({
						allTanks: 
						allTanks, 
						selectedTank: 
						newSelectedTank, 
						showTanks: false
					},
					this.initPoints
				);
			}
		});
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

	// Find the tank via its id and set it to the selectedTank and its id in a Cookie for Casus.
	// Also initializes the points for the new tank.
	// Wonky type declaration for the function in order to bind to this and avoid Flow error.
	changeSelectedTank(newTank: Tank): void {
		this.setState(
			{selectedTank: newTank},
			this.initPoints
		);
		setTankForCasus(newTank._id);
	}

	// Function that will save the selectedTank.
	saveTank(): void {
		const responsePromise: Promise<Response> = fetch('/api/tank/tankUpdate/' + this.state.selectedTank._id, {
			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': getLoginToken(),
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
		this.setState({selectedTank: updatedTank, componentList: [], currentPartIndex: -1});
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
					<label>Edit Code:&emsp;</label>
					<Link to={verifyLink("/Casus")}>
						<button className="smallbtn">Casus</button>
					</Link>
					<br/><br/>
					<h4>Selected Tank</h4>
					<br/>
					<SelectTank
						allTanks={this.state.allTanks}
						changeSelectedTank={(tank) => this.changeSelectedTank(tank)}
					/>
					<br/>
					<br/>
					<CreateNewTankPopup 
						ref="CreateNewTankPopup" 
						chassis={this.state.chassis}
						treads={this.state.treads}
					/>
					<DeleteTankPopup
						tank={this.state.selectedTank}
					/>
					<br/>
					<SetWagerPopup
						wagerTank={this.state.selectedTank}
					/>
				</div>
				<div className="column armorymiddle">
					<h1>{this.state.selectedTank.tankName}</h1>
					<TankDisplay tankToDisplay={this.state.selectedTank} />
					{(this.state.currentPartIndex === -1) ?
						<div></div> :
						<div className="componentMenu">
							<h4>Component Menu</h4>
							<table>
								<tr>
									<th>Component Name</th>
									<th>Number Owned</th>
									<th>Point Value</th>
								</tr>
								<tbody>
									{(this.state.componentList == null) ? <tr></tr> : this.state.componentList.map(({componentName, numberOwned}, index) => (
										<tr key={index}>
											<td align="left">
												<button 
													className="componentMenuBtn"
													onClick={() => this.updateComponent(componentName, this.state.currentPartIndex)}
													disabled={this.checkPoints(componentName, this.state.currentPartIndex)}
												>
													{toTitleCase(componentName)}
												</button>
											</td>
											<td>{numberOwned}</td>
											<td>{getComponentPoints(componentName)}</td>
										</tr>
									))}
									{(this.state.currentPartIndex === 0 || this.state.currentPartIndex === 7) ?
										<div></div> :
										<tr>
											<td align="left">
												<button 
													className="componentMenuBtn"
													onClick={() => this.updateComponent('empty', this.state.currentPartIndex)}
												>
													Empty
												</button>
											</td>
											<td></td><td></td>
										</tr>
									}
								</tbody>
							</table>
						</div>
					}
				</div>
				<div className="column armoryright">
					<h5>{this.state.points}/10 Points Used</h5>
					<label>Chassis: </label>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.chassis, currentPartIndex: 0})}
					>
						{toTitleCase(this.state.selectedTank.chassis.name)}
					</button>
					<br/>
					<br/>

					<label>Main Gun: </label>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.weapons, currentPartIndex: 1})}
					>
						{toTitleCase(this.state.selectedTank.mainGun.name)}
					</button>
					<br/>
					<label>Secondary Gun: </label>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.weapons, currentPartIndex: 2})}
					>
						{toTitleCase(this.state.selectedTank.secondaryGun.name)}
					</button>
					<br/>
					<br/>

					<label>Scanners: </label>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.scanners, currentPartIndex: 3})}
					>
						{toTitleCase(this.state.selectedTank.scanner.name)}
					</button>
					<br/>
					<label>Scanner Addon: </label>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.scannerAddons, currentPartIndex: 4})}
						disabled={(this.state.selectedTank.scanner.name === 'empty') ? true : false}
					>
						{toTitleCase(this.state.selectedTank.scannerAddonOne.name)}
					</button>
					<br/>
					<label>Scanner Addon: </label>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.scannerAddons, currentPartIndex: 5})}
						disabled={(this.state.selectedTank.scanner.name === 'empty') ? true : false}
					>
						{toTitleCase(this.state.selectedTank.scannerAddonTwo.name)}
					</button>
					<br/>
					<br/>

					<label>Jammers: </label>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.jammers, currentPartIndex: 6})}
					>
						{toTitleCase(this.state.selectedTank.jammer.name)}
					</button>
					<br/>
					<br/>

					<label>Treads: </label>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.treads, currentPartIndex: 7})}
					>
						{toTitleCase(this.state.selectedTank.treads.name)}
					</button>
					<br/>
					<br/>

					<label>Item: </label>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.items, currentPartIndex: 8})}
					>
						{toTitleCase(this.state.selectedTank.itemOne.name)}
					</button>
					<br/>
					<label>Item: </label>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.items, currentPartIndex: 9})}
					>
						{toTitleCase(this.state.selectedTank.itemTwo.name)}
					</button>
					<br/>
					<label>Item: </label>
					<button 
						className="componentMenuBtn" 
						onClick={() => this.setState({componentList: this.state.items, currentPartIndex: 10})}
					>
						{toTitleCase(this.state.selectedTank.itemThree.name)}
					</button>
				</div>
			</div>
		);
	}
}

export default Armory;
