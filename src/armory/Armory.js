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
import SelectTank from '../globalComponents/SelectTank.js';
import SetWagerPopup from './SetWagerPopup.js';
import RenameTankPopup from './RenameTankPopup.js';
import { ToastContainer } from 'react-toastify';
// Functions
import { getComponentPoints, getComponentType } from '../globalComponents/GetInventoryInfo.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import { getAllUsersTanks, getFavoriteTank, updateTank } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import { getTank, getEmptyCasusCode } from '../tanks/TankLoader.js';
import { toTitleCase } from '../globalComponents/Utility.js';
import getPreferredSelectedTank from '../globalComponents/getPreferredSelectedTank.js';
// Types and Classes
import type { TankComponent } from '../globalComponents/typesAndClasses/TankComponent.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import TankPart from '../tanks/TankPart.js';
import BackendTank from '../tanks/BackendTank.js';
import Component from '../globalComponents/typesAndClasses/Component.js';
import Tank from '../tanks/Tank.js';
import Chassis from '../tanks/Chassis.js';
import Gun from '../tanks/Gun.js';
import Scanner from '../tanks/Scanner.js';
import Jammer from '../tanks/Jammer.js';
import Treads from '../tanks/Treads.js';
import setTankForCasus from '../globalComponents/setTankForCasus.js';
import TankDisplay from '../tanks/TankDisplay.js';

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
		getAllUsersTanks(allTanks => {
			// Always set the default selected tank to the newest tank.
			const newSelectedTank = allTanks[allTanks.length-1];
			setTankForCasus(newSelectedTank._id);
			// Update the state, and then run initPoints after the state has been set.
			this.setState({
					allTanks: allTanks, 
					selectedTank: getPreferredSelectedTank(allTanks), 
				},
				this.initPoints
			);
		});
	}

	// Gets all of the user's inventory.
	getUserInventory(): void {
		getUserAPICall(user => {
			this.setState({
				inventory: user.inventory,
				chassis: user.inventory.filter(component => getComponentType(component.componentName) === 'chassis'),
				weapons: user.inventory.filter(component => getComponentType(component.componentName) === 'weapon'),
				scanners: user.inventory.filter(component => getComponentType(component.componentName) === 'scanner'),
				scannerAddons: user.inventory.filter(component => getComponentType(component.componentName) === 'scannerAddon'),
				jammers: user.inventory.filter(component => getComponentType(component.componentName) === 'jammer'),
				treads: user.inventory.filter(component => getComponentType(component.componentName) === 'treads'),
				items: user.inventory.filter(component => getComponentType(component.componentName) === 'item'),
			});
		});
	}

	// Find the tank via its id and set it to the selectedTank and its id in a Cookie for Casus.
	// Also initializes the points for the new tank.
	changeSelectedTank(newTank: Tank): void {
		this.setState(
			{selectedTank: newTank},
			this.initPoints
		);
		setTankForCasus(newTank._id);
	}

	// Function that will save the selectedTank and update the user's inventory.
	saveTank(): void {
		updateTank(this.state.selectedTank, () => {
			this.getUserInventory();
		});
	}

	// When RenameTankPopup renames a tank, update the selected tank.
	// Also, if the tank is the favorited tank, update the the favorited tank too.
	renameTank = (tank: Tank): void => {
		this.setState({selectedTank: tank});

		getFavoriteTank(favTank => {
			if (favTank != null && tank._id === favTank._id) {
				this.refs.SetWagerPopup.updateWagerTankName(tank.tankName);
			}
		});
	}

	// Handles initializing points when the page is first loaded or when a new tank is selected.
	initPoints(): void {
		const tank: Tank = this.state.selectedTank;
		let newPoints: number = 0;
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

		//if the part index was a scanner add-on, we have to rebuild the scanner
		if (partIndex===4 || partIndex===5) {
			const scannerType=this.state.selectedTank.scanner.name;
			const newScanner=new Scanner(
					scannerType, 
					(updatedTank.scannerAddonOne.name === 'itemScanner' || updatedTank.scannerAddonTwo.name === 'itemScanner') ? true : false,
					(updatedTank.scannerAddonOne.name === 'antiJammerScanner' || updatedTank.scannerAddonTwo.name === 'antiJammerScanner') ? true : false,
				);
			updatedTank.scanner = newScanner;
		}

		// Update the component, points, and parts array.
		this.updatePoints(newComponent.name, updatedTank.parts[partIndex].name);
		updatedTank.parts[partIndex] = newComponent;
		// Reset component list to provide user feedback.
		this.setState({selectedTank: updatedTank, componentList: [], currentPartIndex: -1});
		// Save the tank.
		this.saveTank();
	}

	onWagerUpdate = (): void => {
		const navbar = this.refs.navbar;
		navbar.reloadNavbar();
	}

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar 
					linkName="/MainMenu" 
					returnName="Back to Main Menu" 
					pageName="Armory"
					ref="navbar"
				/>
				<div className="column armoryleft">
					<h4>Selected Tank</h4>
					<SelectTank
						selectedTank={this.state.selectedTank}
						allTanks={this.state.allTanks}
						changeSelectedTank={(tank) => this.changeSelectedTank(tank)}
						propogateChangesToCasus={true}
					/>
					<br/><br/>
					<Link to={verifyLink("/Casus")}>
						<button className="primarybtn">Casus</button>
					</Link>
					<label>&emsp;Edit Code</label>
					<br/><br/><br/>
					<h5>Tank Options</h5>
					<div className="row rowPadding">
						<RenameTankPopup
							tank={this.state.selectedTank}
							renameTank={this.renameTank}
						/>&emsp;
						<CreateNewTankPopup 
							ref="CreateNewTankPopup" 
							chassis={this.state.chassis}
							treads={this.state.treads}
						/>&emsp;
						<DeleteTankPopup
							tank={this.state.selectedTank}
						/>
					</div>
					<br/><br/>
					<SetWagerPopup
						ref="SetWagerPopup"
						wagerTank={this.state.selectedTank}
						onWagerUpdate={this.onWagerUpdate}
					/>
				</div>
				<div className="column armorymiddle">
					<h1>{this.state.selectedTank.tankName}</h1>
					<TankDisplay tankToDisplay={this.state.selectedTank} />
					{(this.state.currentPartIndex === -1) ?
						<div></div> :
						<div>
							<h4>Component Menu</h4>
							<div className="componentMenu">
								<table>
									<thead>
										<tr>
											<th>Component Name</th>
											<th>Number Owned</th>
											<th>Point Value</th>
										</tr>
									</thead>
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
											<tr></tr> :
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
						</div>
					}
				</div>
				<div className="column armoryright">
					<h5>{this.state.points}/10 Points Used</h5>
					<label>Chassis: </label>
					<button 
						className={(this.state.currentPartIndex === 0) ? "componentMenuBtn selectedComponent" : "componentMenuBtn"} 
						onClick={() => this.setState({componentList: this.state.chassis, currentPartIndex: 0})}
					>
						{toTitleCase(this.state.selectedTank.chassis.name)}
					</button>
					<br/>
					<br/>

					<label>Main Gun: </label>
					<button 
						className={(this.state.currentPartIndex === 1) ? "componentMenuBtn selectedComponent" : "componentMenuBtn"}
						onClick={() => this.setState({componentList: this.state.weapons, currentPartIndex: 1})}
					>
						{toTitleCase(this.state.selectedTank.mainGun.name)}
					</button>
					<br/>
					<label>Secondary Gun: </label>
					<button 
						className={(this.state.currentPartIndex === 2) ? "componentMenuBtn selectedComponent" : "componentMenuBtn"}
						onClick={() => this.setState({componentList: this.state.weapons, currentPartIndex: 2})}
					>
						{toTitleCase(this.state.selectedTank.secondaryGun.name)}
					</button>
					<br/>
					<br/>

					<label>Scanners: </label>
					<button 
						className={(this.state.currentPartIndex === 3) ? "componentMenuBtn selectedComponent" : "componentMenuBtn"}
						onClick={() => this.setState({componentList: this.state.scanners, currentPartIndex: 3})}
					>
						{toTitleCase(this.state.selectedTank.scanner.name)}
					</button>
					<br/>
					<label>Scanner Addon: </label>
					<button 
						className={(this.state.currentPartIndex === 4) ? "componentMenuBtn selectedComponent" : "componentMenuBtn"}
						onClick={() => this.setState({componentList: this.state.scannerAddons, currentPartIndex: 4})}
						disabled={(this.state.selectedTank.scanner.name === 'empty') ? true : false}
					>
						{toTitleCase(this.state.selectedTank.scannerAddonOne.name)}
					</button>
					<br/>
					<label>Scanner Addon: </label>
					<button 
						className={(this.state.currentPartIndex === 5) ? "componentMenuBtn selectedComponent" : "componentMenuBtn"}
						onClick={() => this.setState({componentList: this.state.scannerAddons, currentPartIndex: 5})}
						disabled={(this.state.selectedTank.scanner.name === 'empty') ? true : false}
					>
						{toTitleCase(this.state.selectedTank.scannerAddonTwo.name)}
					</button>
					<br/>
					<br/>

					<label>Jammers: </label>
					<button 
						className={(this.state.currentPartIndex === 6) ? "componentMenuBtn selectedComponent" : "componentMenuBtn"}
						onClick={() => this.setState({componentList: this.state.jammers, currentPartIndex: 6})}
					>
						{toTitleCase(this.state.selectedTank.jammer.name)}
					</button>
					<br/>
					<br/>

					<label>Treads: </label>
					<button 
						className={(this.state.currentPartIndex === 7) ? "componentMenuBtn selectedComponent" : "componentMenuBtn"}
						onClick={() => this.setState({componentList: this.state.treads, currentPartIndex: 7})}
					>
						{toTitleCase(this.state.selectedTank.treads.name)}
					</button>
					<br/>
					<br/>

					<label>Item: </label>
					<button 
						className={(this.state.currentPartIndex === 8) ? "componentMenuBtn selectedComponent" : "componentMenuBtn"}
						onClick={() => this.setState({componentList: this.state.items, currentPartIndex: 8})}
					>
						{toTitleCase(this.state.selectedTank.itemOne.name)}
					</button>
					<br/>
					<label>Item: </label>
					<button 
						className={(this.state.currentPartIndex === 9) ? "componentMenuBtn selectedComponent" : "componentMenuBtn"}
						onClick={() => this.setState({componentList: this.state.items, currentPartIndex: 9})}
					>
						{toTitleCase(this.state.selectedTank.itemTwo.name)}
					</button>
					<br/>
					<label>Item: </label>
					<button 
						className={(this.state.currentPartIndex === 10) ? "componentMenuBtn selectedComponent" : "componentMenuBtn"}
						onClick={() => this.setState({componentList: this.state.items, currentPartIndex: 10})}
					>
						{toTitleCase(this.state.selectedTank.itemThree.name)}
					</button>
				</div>
				<ToastContainer />
			</div>
		);
	}
}

export default Armory;
