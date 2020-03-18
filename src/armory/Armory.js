//@flow strict

import './Armory.css';
import * as React from 'react';
import Navbar from '../globalComponents/Navbar.js';
import { Link } from 'react-router-dom';
import {getTankComponent, verifyComponent} from './GetInventoryInfo.js';
import {getUser} from '../globalComponents/userAPIIntegration.js';
import {getFavoriteTankID, getAllUsersTanks} from '../globalComponents/tankAPIIntegration.js';
import CreateNewTankPopup from './CreateNewTankPopup.js';
import setTankForCasus from '../globalComponents/setTankForCasus.js';
import Tank from '../tanks/Tank.js';
import Gun from '../tanks/Gun.js';
import Treads from '../tanks/Treads.js';
import SingleUseItem from '../tanks/SingleUseItem.js';
import Jammer from '../tanks/Jammer.js';
import Scanner from '../tanks/Scanner.js';
import Chassis from '../tanks/Chassis.js';
import {getTestTank} from '../tanks/TankLoader.js';
import Vec from '../casus/blocks/Vec.js';

// Armory component.
type Props = {||}; 
type State = {|
	currentTank: Tank,
	selectedTankId: string,
	userId: string,
	//This is the array of options for each part of the tank
	tankOptions : Array<Object>,
	chassisOptions : Array<Object>,
	weaponOneOptions : Array<Object>,
	weaponTwoOptions : Array<Object>,
	scannerOneOptions: Array<Object>,
	scannerTwoOptions: Array<Object>,
	scannerThreeOptions: Array<Object>,
	jammerOptions : Array<Object>,
	treadsOptions : Array<Object>,
	singleUseItemsOne : Array<Object>,
	singleUseItemsTwo : Array<Object>,
	singleUseItemsThree : Array<Object>

|};


// Armory page. Showcases player's tanks and components. Links to Casus.
class Armory extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			//This tank id is the one the user is currently working on
			currentTank: getTestTank(),
			selectedTankId: '',
			userId: '',
			tankOptions : [{value: '', label: ''}],
			chassisOptions : [{value: '', label: ''}],
			weaponOneOptions : [{value: '', label: ''}],
			weaponTwoOptions: [{value: '', label: ''}],
			scannerOneOptions: [{value: '', label: ''}],
			scannerTwoOptions: [{value: '', label: ''}],
			scannerThreeOptions: [{value: '', label: ''}],
			jammerOptions: [{value: '', label: ''}],
			treadsOptions: [{value: '', label: ''}],
			singleUseItemsOne: [{value: '', label: ''}],
			singleUseItemsTwo: [{value: '', label: ''}],
			singleUseItemsThree: [{value: '', label: ''}]
		}
		this.getFavoriteTank();
	}
	//Clears the inventory on the frontend side
	clearInventoryArrays() {
		this.setState({tankOptions: [{value: '', label: ''}]});
		this.setState({chassisOptions : [{value: '', label: ''}]});
		this.setState({weaponOneOptions : [{value: '', label: ''}]});
		this.setState({weaponTwoOptions : [{value: '', label: ''}]});
		this.setState({scannerOneOptions: [{value: '', label: ''}]});
		this.setState({scannerTwoOptions: [{value: '', label: ''}]});
		this.setState({scannerThreeOptions: [{value: '', label: ''}]});
		this.setState({jammerOptions : [{value: '', label: ''}]});
		this.setState({treadsOptions : [{value: '', label: ''}]});
		this.setState({singleUseItemsOne : [{value: '', label: ''}]});
		this.setState({singleUseItemsTwo : [{value: '', label: ''}]});
		this.setState({singleUseItemsThree : [{value: '', label: ''}]});
	}
	//This is used to get the current favorite tank of the user and continues to get all of the selected tank
	getFavoriteTank () {
		const responsePromise = getFavoriteTankID();
		console.log(responsePromise);
		responsePromise.then(
			response => response.json().then(data => {
				console.log(data);
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					return data;
				}
				else {
					let favoriteTankID = data.text();
					this.setState({selectedTankId: favoriteTankID});
					this.getSelectedTank();
				}
			})
		).catch(
			(error) => {
				console.log('No favorite Tank');
				this.getSelectedTank();
			}
		);
	};
	//This can get a tank with the same id as the selected one and will fill out the info for all the items
	getSelectedTank = async ():Promise<void> => {
		
		//Clear the data so that we dont duplicate items
		this.clearInventoryArrays();
		const responsePromise = getAllUsersTanks();
		responsePromise.then(
			response => response.json().then(data => {
				console.log(data);
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					return data;
				}
				else {
					let jsonObjectOfTanks = data;
					//This will get the seleced tanks info and fill out the selected items
					for (const tank in jsonObjectOfTanks) {
						let obj = {};
						obj['value'] = jsonObjectOfTanks[tank]._id;
						obj['label'] = jsonObjectOfTanks[tank].tankName;
						if(jsonObjectOfTanks[tank]._id === this.state.selectedTankId) {
							let currentTankObject = new Tank(
								new Vec(20, -20),
								this.state.selectedTankId,
								jsonObjectOfTanks[tank].tankName,
								jsonObjectOfTanks[tank].isBot,
								jsonObjectOfTanks[tank].components[0],
								jsonObjectOfTanks[tank].components[1],
								jsonObjectOfTanks[tank].components[2],
								jsonObjectOfTanks[tank].components[3],
								jsonObjectOfTanks[tank].components[4],
								jsonObjectOfTanks[tank].components[5],
								jsonObjectOfTanks[tank].components[6],
								jsonObjectOfTanks[tank].components[7],
								jsonObjectOfTanks[tank].components[8],
								jsonObjectOfTanks[tank].components[9],
								jsonObjectOfTanks[tank].components[10],
								jsonObjectOfTanks[tank].casusCode
							);
							this.setState({currentTank: currentTankObject});
						}
						this.state.tankOptions.push(obj);
					}
					this.getUserInventory();
				}
			})
		).catch(
			(error) => {
				console.log('Couldnt connect to server!');
				console.log(error);
				return error;
			}
		);
	};

	//This will get all the inventory from a user and fill out the arrays used in the front end for the backend
	getUserInventory () {
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
					let jsonObjectOfUser = data;
					for (const component in jsonObjectOfUser.inventory.tankComponents) {
						const typeOfItem = getTankComponent(verifyComponent(component));
						//This will add the chassis that the user has
						if(typeOfItem === 'chassis' && jsonObjectOfUser.inventory.tankComponents[component] > 0) {
							let obj = {};
							obj['value'] = component;
							obj['label'] = component;
							this.state.chassisOptions.push(obj);
						}
						//This will add the weapons that the user has
						else if(typeOfItem === 'weapon' && jsonObjectOfUser.inventory.tankComponents[component] > 0) {
							let obj = {};
							obj['value'] = component;
							obj['label'] = component;
							this.state.weaponOneOptions.push(obj);
							this.state.weaponTwoOptions.push(obj);
						}
						//This will add the scanners that the user has
						else if(typeOfItem === 'scanner' && jsonObjectOfUser.inventory.tankComponents[component] > 0) {
							let obj = {};
							obj['value'] = component;
							obj['label'] = component;
							this.state.scannerOneOptions.push(obj);
							this.state.scannerTwoOptions.push(obj);
							this.state.scannerThreeOptions.push(obj);
						}
						//This will add the jammers that the user has
						else if(typeOfItem === 'jammer' && jsonObjectOfUser.inventory.tankComponents[component] > 0) {
							let obj = {};
							obj['value'] = component;
							obj['label'] = component;
							this.state.jammerOptions.push(obj);
						}
						//This will add the threads that the user has
						else if(typeOfItem === 'treads' && jsonObjectOfUser.inventory.tankComponents[component] > 0) {
							let obj = {};
							obj['value'] = component;
							obj['label'] = component;
							this.state.treadsOptions.push(obj);
						}
						//This will add the single use items that the user has
						else if(typeOfItem === 'item' && jsonObjectOfUser.inventory.tankComponents[component] > 0) {
							let obj = {};
							obj['value'] = component;
							obj['label'] = component;
							this.state.singleUseItemsOne.push(obj);
							this.state.singleUseItemsTwo.push(obj);
							this.state.singleUseItemsThree.push(obj);
						}
					}
					console.log(jsonObjectOfUser);
					//set the users id
					this.setState({userId:jsonObjectOfUser._id});
				}
			})
		).catch(
			(error) => {
				console.log('Couldnt connect to server!');
				console.log(error);
				return error;
			}
		);
		
	};

	//This handles the changes if a user changes tanks or its components
	//Thsi has to be an any because this taget uses label which is not a part of HTMLElement. 
	handleChangeInTankOptions = ({ target }:{target:any}) => {
		this.setState({ selectedTankId: target.value});
		var newTank = this.state.currentTank;
		newTank.tankName = target.label;
		this.setState({ currentTank: newTank });
		setTankForCasus(target.value);
		this.getSelectedTank();
	}

	handleChangeInChassisOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.chassis = new Chassis(target.value);
		this.setState({ currentTank: newTank });
	}

	handleChangeInWeaponOneOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.mainGun = new Gun(target.value);
		this.setState({ currentTank: newTank });
	}

	handleChangeInWeaponTwoOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.secondaryGun = new Gun(target.value);
		this.setState({ currentTank: newTank });
	}

	handleChangeInScannerOneOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.mainScanner = new Scanner(target.value);
		this.setState({ currentTank: newTank });
	}

	handleChangeInScannerTwoOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.secondaryScanner = new Scanner(target.value);
		this.setState({ currentTank: newTank });
	}

	handleChangeInScannerThreeOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.tertiaryScanner = new Scanner(target.value);
		this.setState({ currentTank: newTank });
	}

	handleChangeInJammerOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.jammer = new Jammer(target.value);
		this.setState({ currentTank: newTank });
	}

	handleChangeInTreadsOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.treads = new Treads(target.value);
		this.setState({ currentTank: newTank });
	}

	handleChangeInSingleUseItemsOneOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.firstSingleUseItem = new SingleUseItem(target.value);
		this.setState({ currentTank: newTank });
	}

	handleChangeInSingleUseItemsTwoOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.secondSingleUseItem = new SingleUseItem(target.value);
		this.setState({ currentTank: newTank });
	}

	handleChangeInSingleUseItemsThreeOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.thirdSingleUseItem = new SingleUseItem(target.value);
		this.setState({ currentTank: newTank });
	}

	//This will save a tank
	saveTank  = async ():Promise<void> => {
		let componentsArray = [this.state.currentTank.chassis,this.state.currentTank.mainGun,this.state.currentTank.secondaryGun,this.state.currentTank.mainScanner,this.state.currentTank.secondaryScanner,this.state.currentTank.tertiaryScanner,this.state.currentTank.jammer,this.state.currentTank.treads,this.state.currentTank.firstSingleUseItem,this.state.currentTank.secondSingleUseItem,this.state.currentTank.thirdSingleUseItem];
		for(let i = 0; i < componentsArray.length; i++) {
			if(componentsArray[i] === undefined) {
				componentsArray[i] = '';
			}
		}
		fetch('/api/tank/tankUpdate/' + this.state.selectedTankId, {
			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ tankName: this.state.currentTank.tankName, userId: this.state.userId, components: componentsArray, casusCode: this.state.currentTank.casusCode, isBot: this.state.currentTank.isBot }),
		});
	};

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar styleName="navbtn" linkName="MainMenu" returnName="Back to Main Menu" pageName="Armory" userName="FRIcker | $465128" />
					<div className="column armoryleft">
						<h3>Select a Tank to Edit</h3>
						<select 
							className="dropdownMenu" 
							value={this.state.selectedTankId} 
							onChange={this.handleChangeInTankOptions}
						>
							{this.state.tankOptions.map(({ value, label }, index) => <option key={index}  value={value}>{label}</option>)}
						</select>
						<h6>Set this tank as default?</h6>
						<button type="button" className="btn mb-4">Set Default</button>
						<CreateNewTankPopup ref="CreateNewTankPopup"/>
						<h3>Edit tank's Code</h3>
						<Link to="Casus">
							<button type="button" className="btn">Casus</button>
						</Link>
					</div>
					<div className="column armorymiddle">
						<h1>{this.state.currentTank.tankName}</h1>
						<h6>Points Used: 0/10</h6>
					</div>
					<div className="column armoryright">
						<h6>Chassis</h6>
						<select 
							className="tankComponentMenu"
							value={this.state.currentTank.chassis.name}
							onChange={this.handleChangeInChassisOptions}
						>
							{this.state.chassisOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<h6>Weapons</h6>
						<select 
							className="tankComponentMenu" 
							value={this.state.currentTank.mainGun.name} 
							onChange={this.handleChangeInWeaponOneOptions}
						>
							{this.state.weaponOneOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<select 
							className="tankComponentMenu" 
							value={this.state.currentTank.secondaryGun.name} 
							onChange={this.handleChangeInWeaponTwoOptions}
						>
							{this.state.weaponTwoOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<h6>Scanner</h6>
						<select 
							className="tankComponentMenu" 
							value={this.state.currentTank.mainScanner.name} 
							onChange={this.handleChangeInScannerOneOptions}
						>
							{this.state.scannerOneOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<select 
							className="tankComponentMenu" 
							value={this.state.currentTank.secondaryScanner.name} 
							onChange={this.handleChangeInScannerTwoOptions}
						>
							{this.state.scannerTwoOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<select 
							className="tankComponentMenu" 
							value={this.state.currentTank.tertiaryScanner.name} 
							onChange={this.handleChangeInScannerThreeOptions}
						>
							{this.state.scannerThreeOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<h6>Jammer</h6>
						<select 
							className="tankComponentMenu" 
							value={this.state.currentTank.jammer.name} 
							onChange={this.handleChangeInJammerOptions}
						>
							{this.state.jammerOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<h6>Treads</h6>
						<select 
							className="tankComponentMenu" 
							value={this.state.currentTank.treads.name} 
							onChange={this.handleChangeInTreadsOptions}
						>
							{this.state.treadsOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<h6>Single-Use Items</h6>
						<select 
							className="tankComponentMenu" 
							value={this.state.currentTank.firstSingleUseItem.name} 
							onChange={this.handleChangeInSingleUseItemsOneOptions}
						>
							{this.state.singleUseItemsOne.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<select 
							className="tankComponentMenu" 
							value={this.state.currentTank.secondSingleUseItem.name} 
							onChange={this.handleChangeInSingleUseItemsTwoOptions}
						>
							{this.state.singleUseItemsTwo.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<select 
							className="tankComponentMenu" 
							value={this.state.currentTank.thirdSingleUseItem.name} 
							onChange={this.handleChangeInSingleUseItemsThreeOptions}
						>
							{this.state.singleUseItemsThree.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<button type="button" className="btn mt-4" onClick={this.saveTank}>Save</button>
					</div>
				</div>
		);
	}
}

export default Armory;
