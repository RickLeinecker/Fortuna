//@flow strict

// React
import * as React from 'react';
import { Link } from 'react-router-dom';
// CSS
import './Armory.css';
// Components
import Navbar from '../globalComponents/Navbar.js';
import CreateNewTankPopup from './CreateNewTankPopup.js';
import SetWagerPopup from './SetWagerPopup.js';
// Functions
import setTankForCasus from '../globalComponents/setTankForCasus.js';
import { getTankComponent, verifyComponent, getOptionsOfType, getComponentsOfType } from './GetInventoryInfo.js';
import { getUser } from '../globalComponents/userAPIIntegration.js';
import { getFavoriteTankID, getAllUsersTanks } from '../globalComponents/tankAPIIntegration.js';
import { getTank } from '../tanks/TankLoader.js';
// Types and Classes
import Tank from '../tanks/Tank.js';

type Props = {||};

type State = {|
	selectedTank?: Tank,
	allTanks: Array<Tank>,
	inventory: Object,
	chassis: Object,
	weapons: Object,
	scanners: Object,
	scannerAddons: Object,
	jammers: Object,
	treads: Object,
	items: Object,
|};

// Armory page. Showcases player's tanks and components. Links to Casus.
class Armory extends React.Component<Props, State> {

	constructor() {
		super();
		
		this.state = {
			selectedTank: null,
			allTanks: [],
			Inventory: [],
			tankOptions: [],
			chassis: [],
			weapons: [],
			scanners: [],
			scannerAddons: [],
			jammers: [],
			treads: [],
			items: [],
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
					this.setState({allTanks: data});
					// Set the first tank found as the selectedTank.
					this.setState({selectedTank: getTank(data[0])});
				}
			})
		)
	}

	// Gets all user inventory.
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
						inventory: data.inventory.tankComponents,
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
		if(!str) {
			return str;
		}

		str = str.replace( /([A-Z])/g, " $1");
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// Find the tank via its name and set it to the selectedTank.
	changeSelectedTank(newTankName: string): void {
		this.setState({ selectedTank: getTank(this.state.allTanks.find(tank => tank.tankName === newTankName))});
	}

	setWager(wager: number): void {
		// NEED API CALL TO SET A WAGER WITH THE SELECTED TANK.
	}

	// ALL UPDATES NEED API CALL TO UPDATE INVENTORY.
	updateChassis(newChassis: string): void {}
	updateWeaponOne(newWeapon: string): void {}
	updateWeaponTwo(newWeapon: string): void {}
	updateScanner(newScanner: string): void {}
	updateScannerAddonOne(newScannerAddon: string): void {}
	updateScannerAddonTwo(newScannerAddon: string): void {}
	updateJammer(newJammer: string): void {}
	updateTreads(newTreads: string): void {}
	updateItemOne(newItem: string): void {}
	updateItemTwo(newItem: string): void {}
	updateItemThree(newItem: string): void {}

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
							{this.state.allTanks.map(name => name.tankName).map((tankName, index) =>
								<option key={index} value={tankName}>{tankName}</option>
							)}
						</select>
						{(this.state.selectedTank) ? 
							<SetWagerPopup 
								setWager={this.setWager} 
								selectedTankName={this.state.selectedTank.tankName}
							/> : 
							<div>
								{console.log(this.state.selectedTank)}
								<h6>Setup a Tank to be Challenged</h6>
								<button className="btn disabled">Setup</button>
							</div>
						}
						<CreateNewTankPopup ref="CreateNewTankPopup"/>
						<br />
						<h3>Edit Selected tank's Code</h3>
						<Link to="Casus">
							<button type="button" className="btn">Casus</button>
						</Link>
					</div>
					<div className="column armorymiddle">
						<h1>{(this.state.selectedTank) ? this.state.selectedTank.tankName : 'No Tank Selected'}</h1>
					</div>
					<div className="column armoryright">
						<h5>0/10 Points Used</h5>
						<h6>Chassis</h6>
						<select className="tankComponentMenu" onChange={(e) => this.updateChassis(e.target.value)}>
							<option defaultValue>{(this.state.selectedTank) ? this.toTitleCase(this.state.selectedTank.chassis.name) : ''}</option>
							{Object.keys(this.state.chassis).map((componentName, index) => (
								<option key={index} value={componentName}>{this.toTitleCase(componentName)} {this.state.chassis[componentName]}</option>
							))}
						</select>
						<h6>Weapons: Main | Secondary</h6>
						<select className="tankComponentMenu" onChange={(e) => this.updateWeaponOne(e.target.value)}>
						<option defaultValue>{(this.state.selectedTank) ? this.toTitleCase(this.state.selectedTank.mainGun.name) : ''}</option>
							{Object.keys(this.state.weapons).map((componentName, index) => (
								<option key={index} value={componentName}>{this.toTitleCase(componentName)} {this.state.weapons[componentName]}</option>
							))}
						</select>
						<select className="tankComponentMenu" onChange={(e) => this.updateWeaponTwo(e.target.value)}>
							<option defaultValue>{(this.state.selectedTank) ? this.toTitleCase(this.state.selectedTank.secondaryGun.name) : ''}</option>
							{Object.keys(this.state.weapons).map((componentName, index) => (
								<option key={index} value={componentName}>{this.toTitleCase(componentName)} {this.state.weapons[componentName]}</option>
							))}
						</select>
						<h6>Scanners: Scanner | Addon | Addon</h6>
						<select className="tankComponentMenu" onChange={(e) => this.updateScanner(e.target.value)}>
							<option defaultValue>{(this.state.selectedTank) ? this.toTitleCase(this.state.selectedTank.scanner.name) : ''}</option>
							{Object.keys(this.state.scanners).map((componentName, index) => (
								<option key={index} value={componentName}>{this.toTitleCase(componentName)} {this.state.scanners[componentName]}</option>
							))}
						</select>
						<select className="tankComponentMenu" onChange={(e) => this.updateScannerAddonOne(e.target.value)}>
							<option defaultValue>{(this.state.selectedTank) ? this.toTitleCase(this.state.selectedTank.scannerAddonOne.name) : ''}</option>
							{Object.keys(this.state.scannerAddons).map((componentName, index) => (
								<option key={index} value={componentName}>{this.toTitleCase(componentName)} {this.state.scannerAddons[componentName]}</option>
							))}
						</select>
						<select className="tankComponentMenu" onChange={(e) => this.updateScannerAddonTwo(e.target.value)}>
							<option defaultValue>{(this.state.selectedTank) ? this.toTitleCase(this.state.selectedTank.scannerAddonTwo.name) : ''}</option>
							{Object.keys(this.state.scannerAddons).map((componentName, index) => (
								<option key={index} value={componentName}>{this.toTitleCase(componentName)} {this.state.scannerAddons[componentName]}</option>
							))}
						</select>
						<h6>Jammers</h6>
						<select className="tankComponentMenu" onChange={(e) => this.updateJammer(e.target.value)}>
							<option defaultValue>{(this.state.selectedTank) ? this.toTitleCase(this.state.selectedTank.jammer.name) : ''}</option>
							{Object.keys(this.state.jammers).map((componentName, index) => (
								<option key={index} value={componentName}>{this.toTitleCase(componentName)} {this.state.jammers[componentName]}</option>
							))}
						</select>
						<h6>Treads</h6>
						<select className="tankComponentMenu" onChange={(e) => this.updateTreads(e.target.value)}>
							<option defaultValue>{(this.state.selectedTank) ? this.toTitleCase(this.state.selectedTank.treads.name) : ''}</option>
							{Object.keys(this.state.treads).map((componentName, index) => (
								<option key={index} value={componentName}>{this.toTitleCase(componentName)} {this.state.treads[componentName]}</option>
							))}
						</select>
						<h6>Single-Use Items</h6>
						<select className="tankComponentMenu" onChange={(e) => this.updateItemOne(e.target.value)}>
							<option defaultValue>{(this.state.selectedTank) ? this.toTitleCase(this.state.selectedTank.itemOne.name) : ''}</option>
							{Object.keys(this.state.items).map((componentName, index) => (
								<option key={index} value={componentName}>{this.toTitleCase(componentName)} {this.state.items[componentName]}</option>
							))}
						</select>
						<select className="tankComponentMenu" onChange={(e) => this.updateItemTwo(e.target.value)}>
							<option defaultValue>{(this.state.selectedTank) ? this.toTitleCase(this.state.selectedTank.itemTwo.name) : ''}</option>
							{Object.keys(this.state.items).map((componentName, index) => (
								<option key={index} value={componentName}>{this.toTitleCase(componentName)} {this.state.items[componentName]}</option>
							))}
						</select>
						<select className="tankComponentMenu" onChange={(e) => this.updateItemThree(e.target.value)}>
							<option defaultValue>{(this.state.selectedTank) ? this.toTitleCase(this.state.selectedTank.itemThree.name) : ''}</option>
							{Object.keys(this.state.items).map((componentName, index) => (
								<option key={index} value={componentName}>{this.toTitleCase(componentName)} {this.state.items[componentName]}</option>
							))}
						</select>
					</div>
				</div>
		);
	}
}

export default Armory;

/* OLD JORGE FUNCTIONS TO BE REMOVED IF NOT USED
	//This will save a tank
	saveTank  = async ():Promise<void> => {
		fetch('/api/tank/tankUpdate/' + this.state.selectedTank._id, {

			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ tankName: this.state.selectedTank.tankName, userId: this.state.userId, components: this.state.selectedTank.components, casusCode: this.state.selectedTank.casusCode, isBot: false }),
		});
	};

	//Clears the inventory on the frontend side
	clearInventoryArrays() {
		this.setState({
			tankOptions : [],
			chassisOptions : [],
			weaponOneOptions : [],
			weaponTwoOptions: [],
			scannerOneOptions: [],
			scannerTwoOptions: [],
			scannerThreeOptions: [],
			jammerOptions: [],
			treadsOptions: [],
			singleUseItemsOne: [],
			singleUseItemsTwo: [],
			singleUseItemsThree: [],
		});
	}
	//This is used to get the current favorite tank of the user and continues to get all of the selected tank
	getFavoriteTank () : void {
		const responsePromise = getFavoriteTankID();
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
				}
				else {
					const favoriteTankID = data.text();
					this.setState({selectedTankId: favoriteTankID});
					this.getSelectedTank();
				}
			})
		).catch(
			error => {
				console.log('No favorite Tank');
				this.getSelectedTank();
			}
		);
	};
	*/

	/*
	//This can get a tank with the same id as the selected one and will fill out the info for all the items
	getSelectedTank = async ():Promise<void> => {
	
		//Clear the data so that we dont duplicate items
		this.clearInventoryArrays();
		const responsePromise = getAllUsersTanks();
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					return data;
				}
				else {
					const jsonObjectOfTanks = data;
					//This will get the seleced tanks info and fill out the selected items
					for (const tank in jsonObjectOfTanks) {
						//Select fields is an object of the fields that we need to construct our selects in the render
						const tankOption = new OptionClass(jsonObjectOfTanks[tank]._id, jsonObjectOfTanks[tank].tankName);
						if(jsonObjectOfTanks[tank]._id === this.state.selectedTankId) {
							this.setState({
								selectedTankName:jsonObjectOfTanks[tank].tankName,
								selectedCasusCode:jsonObjectOfTanks[tank].casusCode,
								selectedIsBot:jsonObjectOfTanks[tank].isBot,
								selectedChassis: jsonObjectOfTanks[tank].components[0],
								selectedWeaponOne: jsonObjectOfTanks[tank].components[1],
								selectedWeaponTwo: jsonObjectOfTanks[tank].components[2],
								selectedScannerOne: jsonObjectOfTanks[tank].components[3],
								selectedScannerTwo: jsonObjectOfTanks[tank].components[4],
								selectedScannerThree: jsonObjectOfTanks[tank].components[5],
								selectedJammer: jsonObjectOfTanks[tank].components[6],
								selectedThreads: jsonObjectOfTanks[tank].components[7],
								selectedSingleUseItemOne: jsonObjectOfTanks[tank].components[8],
								selectedSingleUseItemTwo: jsonObjectOfTanks[tank].components[9],
								selectedSingleUseItemThree: jsonObjectOfTanks[tank].components[10]
							});
							setTankForCasus(this.state.selectedTankId);
						}
						this.state.tankOptions.push(tankOption);
					}
					this.getUserInventory();
				}
			})
		).catch(
			error => {
				console.log('Couldnt connect to server!');
				console.log(error);
				return error;
			}
		);
	};
	*/

	/*
	//This will get all the inventory from a user and fill out the arrays used in the front end for the backend
	getUserInventory () : void {
		const responsePromise = getUser();
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					return data;
				}
				else {
					const jsonObjectOfUser = data;
					for (const component in jsonObjectOfUser.inventory.tankComponents) {
						const typeOfItem = getTankComponent(verifyComponent(component));
						//Option fields is an object of the fields that we need to construct our selects in the render
						//This will add the chassis that the user has
						if(typeOfItem === 'chassis' && jsonObjectOfUser.inventory.tankComponents[component] > 0) {
							const chassisOptionObject = new OptionClass (component, component);
							this.state.chassisOptions.push(chassisOptionObject);
						}
						//This will add the weapons that the user has
						else if(typeOfItem === 'weapon' && jsonObjectOfUser.inventory.tankComponents[component] > 0) {
							const weaponOptionObject = new OptionClass (component, component);
							this.state.weaponOneOptions.push(weaponOptionObject);
							this.state.weaponTwoOptions.push(weaponOptionObject);
						}
						//This will add the scanners that the user has
						else if(typeOfItem === 'scanner' && jsonObjectOfUser.inventory.tankComponents[component] > 0) {
							const scannerOptionObject = new OptionClass (component, component);
							this.state.scannerOneOptions.push(scannerOptionObject);
							this.state.scannerTwoOptions.push(scannerOptionObject);
							this.state.scannerThreeOptions.push(scannerOptionObject);
						}
						//This will add the jammers that the user has
						else if(typeOfItem === 'jammer' && jsonObjectOfUser.inventory.tankComponents[component] > 0) {
							const jammerOptionObject = new OptionClass (component, component);
							this.state.jammerOptions.push(jammerOptionObject);
						}
						//This will add the threads that the user has
						else if(typeOfItem === 'treads' && jsonObjectOfUser.inventory.tankComponents[component] > 0) {
							const treadsOptionObject = new OptionClass (component, component);
							this.state.treadsOptions.push(treadsOptionObject);
						}
						//This will add the single use items that the user has
						else if(typeOfItem === 'item' && jsonObjectOfUser.inventory.tankComponents[component] > 0) {
							const itemOptionObject = new OptionClass (component, component);
							this.state.singleUseItemsOne.push(itemOptionObject);
							this.state.singleUseItemsTwo.push(itemOptionObject);
							this.state.singleUseItemsThree.push(itemOptionObject);
						}
					}
					//set the users id
					this.setState({userId:jsonObjectOfUser._id});
				}
			})
		).catch(
			error => {
				console.log('Couldnt connect to server!');
				console.log(error);
			}
		);
		
	};
	*/

	/*
	//This handles the changes if a user changes tanks or its components
	//Thsi has to be an any because this taget uses label which is not a part of HTMLElement. 
	handleChangeInTankOptions = ({ target }:{target:HTMLInputElement}) => {
		this.setState({ selectedTankId: target.value});
		this.getSelectedTank();
	}

	handleChangeInChassisOptions = ({ target }:{target:HTMLInputElement }) => {
		this.setState({selectedChassis: target.value});
	}

	handleChangeInWeaponOneOptions = ({ target }:{target:HTMLInputElement }) => {
		this.setState({selectedWeaponOne: target.value});
	}

	handleChangeInWeaponTwoOptions = ({ target }:{target:HTMLInputElement }) => {
		this.setState({selectedWeaponTwo: target.value});
	}

	handleChangeInScannerOneOptions = ({ target }:{target:HTMLInputElement }) => {
		this.setState({selectedScannerOne: target.value});
	}

	handleChangeInScannerTwoOptions = ({ target }:{target:HTMLInputElement }) => {
		this.setState({selectedScannerTwo: target.value});
	}

	handleChangeInScannerThreeOptions = ({ target }:{target:HTMLInputElement }) => {
		this.setState({selectedScannerThree: target.value});
	}

	handleChangeInJammerOptions = ({ target }:{target:HTMLInputElement }) => {
		this.setState({selectedJammer: target.value});
	}

	handleChangeInTreadsOptions = ({ target }:{target:HTMLInputElement }) => {
		this.setState({selectedThreads: target.value });
	}

	handleChangeInSingleUseItemsOneOptions = ({ target }:{target:HTMLInputElement }) => {
		this.setState({selectedSingleUseItemOne: target.value});
	}

	handleChangeInSingleUseItemsTwoOptions = ({ target }:{target:HTMLInputElement }) => {
		this.setState({selectedSingleUseItemTwo: target.value });
	}

	handleChangeInSingleUseItemsThreeOptions = ({ target }:{target:HTMLInputElement }) => {
		this.setState({selectedSingleUseItemThree: target.value});
	}
	*/