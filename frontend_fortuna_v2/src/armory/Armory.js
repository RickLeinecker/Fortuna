//@flow strict

// React
import * as React from 'react';
import { Link } from 'react-router-dom';
// CSS
import './Armory.css';
// Components
import MainNavbar from '../globalComponents/MainNavbar.js';
import CreateNewTankPopup from './CreateNewTankPopup.js';
import DeleteTankPopup from './DeleteTankPopup.js';
import SelectTank from '../globalComponents/SelectTank.js';
import SetWagerPopup from './SetWagerPopup.js';
import RenameTankPopup from './RenameTankPopup.js';
import CopyCasusCodePopup from './CopyCasusCodePopup';
import { ToastContainer, toast } from 'react-toastify';
// Functions
import { getComponentPoints, getComponentType } from '../globalComponents/GetInventoryInfo.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import { getAllUsersTanks, getFavoriteTank, updateTank } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import { toTitleCase } from '../globalComponents/Utility.js';
import getPreferredSelectedTank from '../globalComponents/getPreferredSelectedTank.js';
import setPreferredSelectedTank from '../globalComponents/setPreferredSelectedTank.js';
// Types and Classes
import type { TankComponent } from '../globalComponents/typesAndClasses/TankComponent.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import TankPart from '../tanks/TankPart.js';
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
	selectedTank: ?Tank,
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

		this.state = {
			selectedTank: null,
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
	}

	componentDidMount(): void {
    document.body.style.backgroundImage = "url('/armory_image_revised.png')"
		// Functions to get all user tanks and user inventory.
		this.getTanks();
		this.getUserInventory();
	}

	// Gets all user tanks and sets them to the state.
	getTanks(): void {
		getAllUsersTanks(allTanks => {
			// Always set the default selected tank to the newest tank.
			const newSelectedTank = getPreferredSelectedTank(allTanks);
			setTankForCasus(newSelectedTank._id);
			setPreferredSelectedTank(newSelectedTank);
			// Update the state, and then run initPoints after the state has been set.
			this.setState({
					allTanks: allTanks,
					selectedTank: newSelectedTank,
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
	changeSelectedTank(newTank: ?Tank): void {
		if (newTank == null) {
			toast.error('New tank does not exist!');
			return;
		}
		this.setState(
			{selectedTank: newTank},
			this.initPoints
		);
		setTankForCasus(newTank._id);
	}

	// Function that will save the selectedTank and update the user's inventory.
	saveTank(): void {
		if (this.state.selectedTank == null) {
			throw new Error('Tried to save selected tank null!');
		}
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

	// Checks the other items the tank has equipped in order to prevent two C4, nitro repair, etc.
	checkItems(newComponent: TankComponent): boolean {
		// Check if the new component is already in other slots, and that it is not a mine.
		if (this.state.selectedTank == null) {
			return false;
		}
		if (
			((newComponent === this.state.selectedTank.parts[10].name) ||
			(newComponent === this.state.selectedTank.parts[9].name) ||
			(newComponent === this.state.selectedTank.parts[8].name)) &&
			newComponent !== 'mine'
		) {
			return true;
		}
		else {
			return false;
		}
	}

	// Handles initializing points when the page is first loaded or when a new tank is selected.
	initPoints(): void {
		if (this.state.selectedTank == null) {
			return;
		}
		const tank: Tank = this.state.selectedTank;
		let newPoints: number = 0;
		for(let i = 0; i < 11; i++) {
			newPoints = newPoints + getComponentPoints(tank.parts[i].name);
		}
		this.setState({ points: newPoints });
	}

	// Ensure that the new point value doesn't go over the limit.
	checkPoints(newComponent: TankComponent, oldPartIndex: number): boolean {
		const tank=this.state.selectedTank;
		if (tank == null) {
			return false;
		}
		// Check the items to ensure that you don't have duplicate items (besides mine).
		if (this.checkItems(newComponent)) {
			return true;
		}
		return (this.state.points + getComponentPoints(newComponent) - getComponentPoints(tank.parts[oldPartIndex].name) > 10) ? true : false;
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
		if (this.state.selectedTank == null) {
			return;
		}
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
		const selectedTank=this.state.selectedTank;
		return (
			<div id="Parent">
				<MainNavbar
					linkName="/Login"
					returnName="Logout"
					// linkName="/MainMenu"
					// returnName="Back to Main Menu"
					pageName="Armory"
					ref="navbar"
					// youtubeLinks={[
					//	'https://www.youtube.com/watch?v=kEClhrMWogY',
					//	'https://www.youtube.com/watch?v=1nnY9wlLOYU'
					// ]}
				/>
				<div className="column armoryleft">
					<h4 className="font">Selected Tank</h4>
					{selectedTank==null?<div></div>:
						<SelectTank
							selectedTank={selectedTank}
							allTanks={this.state.allTanks}
							changeSelectedTank={(tank) => this.changeSelectedTank(tank)}
							propogateChangesToCasus={true}
							allowRemoveTank={false}
						/>
					}
					<br/><br/>
					<label className="font">Edit Code</label>
					<br/>
					<Link to={verifyLink("/Casus")}>
						<button className="primarybtn">Casus</button>
					</Link>
					<br/><br/>
					{selectedTank==null?<div></div>:
						<CopyCasusCodePopup
							selectedTank={selectedTank}
							usersTanks={this.state.allTanks}
						/>
					}
					<br/><br/><br/>
					<h5 className="font">Tank Options</h5>
					<div className="row rowPadding">
						{selectedTank==null?<div></div>:
							<RenameTankPopup
								tank={selectedTank}
								renameTank={this.renameTank}
							/>
						}&emsp;
						<CreateNewTankPopup
							ref="CreateNewTankPopup"
							chassis={this.state.chassis}
							treads={this.state.treads}
						/>&emsp;
						{selectedTank==null?<div></div>:
							<DeleteTankPopup
								tank={selectedTank}
							/>
						}
					</div>
					<br/><br/>
					<SetWagerPopup
						ref="SetWagerPopup"
						onWagerUpdate={this.onWagerUpdate}
					/>
				</div>
				<div className="column armorymiddle">
					<h1 className="font">{selectedTank?.tankName ?? 'Loading tanks...'}</h1>
					{selectedTank==null?<div></div>:
						<TankDisplay tankToDisplay={selectedTank} smallTank={false} />
					}
					{(this.state.currentPartIndex === -1) ?
						<div></div> :
						<div>
							<h4 className="font">Component Menu</h4>
							<div className="componentMenu">
								<table>
									<thead>
										<tr>
											<th className="font">Component Name</th>
											<th className="font">Number Owned</th>
											<th className="font">Point Value</th>
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
														className="componentMenuBtn font"
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

				{selectedTank==null?<div></div>:
					<div className="column armoryright">
						<h5 className="font">{this.state.points}/10 Points Used</h5>
						<label className="font">Chassis: </label>
						<button
							className={(this.state.currentPartIndex === 0) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => this.setState({componentList: this.state.chassis, currentPartIndex: 0})}
						>
							{toTitleCase(selectedTank.chassis.name)}
						</button>
						<br/>
						<br/>

						<label className="font">Main Gun: </label>
						<button
							className={(this.state.currentPartIndex === 1) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => this.setState({componentList: this.state.weapons, currentPartIndex: 1})}
						>
							{toTitleCase(selectedTank.mainGun.name)}
						</button>
						<br/>
						<label className="font">Secondary Gun: </label>
						<button
							className={(this.state.currentPartIndex === 2) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => this.setState({componentList: this.state.weapons, currentPartIndex: 2})}
						>
							{toTitleCase(selectedTank.secondaryGun.name)}
						</button>
						<br/>
						<br/>

						<label className="font">Scanners: </label>
						<button
							className={(this.state.currentPartIndex === 3) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => this.setState({componentList: this.state.scanners, currentPartIndex: 3})}
						>
							{toTitleCase(selectedTank.scanner.name)}
						</button>
						<br/>
						<label className="font">Scanner Addon: </label>
						<button
							className={(this.state.currentPartIndex === 4) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => this.setState({componentList: this.state.scannerAddons, currentPartIndex: 4})}
							disabled={(selectedTank.scanner.name === 'empty') ? true : false}
						>
							{toTitleCase(selectedTank.scannerAddonOne.name)}
						</button>
						<br/>
						<label className="font">Scanner Addon: </label>
						<button
							className={(this.state.currentPartIndex === 5) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => this.setState({componentList: this.state.scannerAddons, currentPartIndex: 5})}
							disabled={(selectedTank.scanner.name === 'empty') ? true : false}
						>
							{toTitleCase(selectedTank.scannerAddonTwo.name)}
						</button>
						<br/>
						<br/>

						<label className="font">Jammers: </label>
						<button
							className={(this.state.currentPartIndex === 6) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => this.setState({componentList: this.state.jammers, currentPartIndex: 6})}
						>
							{toTitleCase(selectedTank.jammer.name)}
						</button>
						<br/>
						<br/>

						<label className="font">Treads: </label>
						<button
							className={(this.state.currentPartIndex === 7) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => this.setState({componentList: this.state.treads, currentPartIndex: 7})}
						>
							{toTitleCase(selectedTank.treads.name)}
						</button>
						<br/>
						<br/>

						<label className="font">Item: </label>
						<button
							className={(this.state.currentPartIndex === 8) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => this.setState({componentList: this.state.items, currentPartIndex: 8})}
						>
							{toTitleCase(selectedTank.itemOne.name)}
						</button>
						<br/>
						<label className="font">Item: </label>
						<button
							className={(this.state.currentPartIndex === 9) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => this.setState({componentList: this.state.items, currentPartIndex: 9})}
						>
							{toTitleCase(selectedTank.itemTwo.name)}
						</button>
						<br/>
						<label className="font">Item: </label>
						<button
							className={(this.state.currentPartIndex === 10) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => this.setState({componentList: this.state.items, currentPartIndex: 10})}
						>
							{toTitleCase(selectedTank.itemThree.name)}
						</button>
					</div>
				}
				<ToastContainer />
			</div>
		);
	}
}

export default Armory;
