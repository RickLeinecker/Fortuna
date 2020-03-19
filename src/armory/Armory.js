//@flow strict

import './Armory.css';
import * as React from 'react';
import Navbar from '../globalComponents/Navbar.js';
import { Link } from 'react-router-dom';
import setTankForCasus from '../globalComponents/setTankForCasus.js';
import {getTankComponent, verifyComponent} from './GetInventoryInfo.js';
import {getUser} from '../globalComponents/userAPIIntegration.js';
import {getFavoriteTankID, getAllUsersTanks} from '../globalComponents/tankAPIIntegration.js';
import CreateNewTankPopup from './CreateNewTankPopup.js';
// Armory component.
type Props = {||}; 
type State = {|
	selectedTankId: string,
	selectedTankName: string,
	selectedChassis: string,
	selectedWeaponOne: string,
	selectedWeaponTwo: string,
	selectedScannerOne: string,
	selectedScannerTwo: string,
	selectedScannerThree: string,
	selectedJammer: string,
	selectedThreads: string,
	selectedSingleUseItemOne: string,
	selectedSingleUseItemTwo: string,
	selectedSingleUseItemThree: string,
	selectedCasusCode: string,
	selectedIsBot: string,
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
			selectedTankId: 'None',
			selectedTankName: '',
			selectedChassis: '',
			selectedWeaponOne: '',
			selectedWeaponTwo: '',
			selectedScannerOne: '',
			selectedScannerTwo: '',
			selectedScannerThree: '',
			selectedJammer: '',
			selectedThreads: '',
			selectedSingleUseItemOne: '',
			selectedSingleUseItemTwo: '',
			selectedSingleUseItemThree: '',
			selectedCasusCode: '',
			selectedIsBot: '',
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
			singleUseItemsThree: [{value: '', label: ''}],
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
							this.setState({selectedTankName:jsonObjectOfTanks[tank].tankName});
							this.setState({selectedCasusCode:jsonObjectOfTanks[tank].casusCode});
							this.setState({selectedIsBot:jsonObjectOfTanks[tank].isBot});
							this.setState({selectedChassis: jsonObjectOfTanks[tank].components[0]});
							this.setState({selectedWeaponOne: jsonObjectOfTanks[tank].components[1]});
							this.setState({selectedWeaponTwo: jsonObjectOfTanks[tank].components[2]});
							this.setState({selectedScannerOne: jsonObjectOfTanks[tank].components[3]});
							this.setState({selectedScannerTwo: jsonObjectOfTanks[tank].components[4]});
							this.setState({selectedScannerThree: jsonObjectOfTanks[tank].components[5]});
							this.setState({selectedJammer: jsonObjectOfTanks[tank].components[6]});
							this.setState({selectedThreads: jsonObjectOfTanks[tank].components[7]});
							this.setState({selectedSingleUseItemOne: jsonObjectOfTanks[tank].components[8]});
							this.setState({selectedSingleUseItemTwo: jsonObjectOfTanks[tank].components[9]});
							this.setState({selectedSingleUseItemThree: jsonObjectOfTanks[tank].components[10]});
							setTankForCasus(this.state.selectedTankId);
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

	//This will save a tank
	saveTank  = async ():Promise<void> => {
		let componentsArray = [this.state.selectedChassis,this.state.selectedWeaponOne,this.state.selectedWeaponTwo,this.state.selectedScannerOne,this.state.selectedScannerTwo,this.state.selectedScannerThree,this.state.selectedJammer,this.state.selectedThreads,this.state.selectedSingleUseItemOne,this.state.selectedSingleUseItemTwo,this.state.selectedSingleUseItemThree];
		fetch('/api/tank/tankUpdate/' + this.state.selectedTankId, {

			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ tankName: this.state.selectedTankName, userId: this.state.userId, components: componentsArray, casusCode: this.state.selectedCasusCode, isBot: this.state.selectedIsBot }),
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
							{this.state.tankOptions.map(({ value, label }, index) => <option key={index}  value={value} label={label}>{label}</option>)}
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
						<h1>{this.state.selectedTankName}</h1>
						<h6>Points Used: 0/10</h6>
					</div>
					<div className="column armoryright">
						<h6>Chassis</h6>
						<select 
							className="tankComponentMenu"
							value={this.state.selectedChassis}
							onChange={this.handleChangeInChassisOptions}
						>
							{this.state.chassisOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<h6>Weapons</h6>
						<select 
							className="tankComponentMenu" 
							value={this.state.selectedWeaponOne} 
							onChange={this.handleChangeInWeaponOneOptions}
						>
							{this.state.weaponOneOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<select 
							className="tankComponentMenu" 
							value={this.state.selectedWeaponTwo} 
							onChange={this.handleChangeInWeaponTwoOptions}
						>
							{this.state.weaponTwoOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<h6>Scanner</h6>
						<select 
							className="tankComponentMenu" 
							value={this.state.selectedScannerOne} 
							onChange={this.handleChangeInScannerOneOptions}
						>
							{this.state.scannerOneOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<select 
							className="tankComponentMenu" 
							value={this.state.selectedScannerTwo} 
							onChange={this.handleChangeInScannerTwoOptions}
						>
							{this.state.scannerTwoOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<select 
							className="tankComponentMenu" 
							value={this.state.selectedScannerThree} 
							onChange={this.handleChangeInScannerThreeOptions}
						>
							{this.state.scannerThreeOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<h6>Jammer</h6>
						<select 
							className="tankComponentMenu" 
							value={this.state.selectedJammer} 
							onChange={this.handleChangeInJammerOptions}
						>
							{this.state.jammerOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<h6>Treads</h6>
						<select 
							className="tankComponentMenu" 
							value={this.state.selectedThreads} 
							onChange={this.handleChangeInTreadsOptions}
						>
							{this.state.treadsOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<h6>Single-Use Items</h6>
						<select 
							className="tankComponentMenu" 
							value={this.state.selectedSingleUseItemOne} 
							onChange={this.handleChangeInSingleUseItemsOneOptions}
						>
							{this.state.singleUseItemsOne.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<select 
							className="tankComponentMenu" 
							value={this.state.selectedSingleUseItemTwo} 
							onChange={this.handleChangeInSingleUseItemsTwoOptions}
						>
							{this.state.singleUseItemsTwo.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}
						</select>
						<select 
							className="tankComponentMenu" 
							value={this.state.selectedSingleUseItemThree} 
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
