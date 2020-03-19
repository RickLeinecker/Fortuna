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
import OptionClass from './OptionClass.js';

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
	tankOptions : Array<OptionClass>,
	chassisOptions : Array<OptionClass>,
	weaponOneOptions : Array<OptionClass>,
	weaponTwoOptions : Array<OptionClass>,
	scannerOneOptions: Array<OptionClass>,
	scannerTwoOptions: Array<OptionClass>,
	scannerThreeOptions: Array<OptionClass>,
	jammerOptions : Array<OptionClass>,
	treadsOptions : Array<OptionClass>,
	singleUseItemsOne : Array<OptionClass>,
	singleUseItemsTwo : Array<OptionClass>,
	singleUseItemsThree : Array<OptionClass>

|};

// Armory page. Showcases player's tanks and components. Links to Casus.
class Armory extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			//This tank id is the one the user is currently working on
			selectedTankId: 'None',
			//The following is a break down of each part that the selected tank has, when you change a dropdown it changes the state
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
			tankOptions : [new OptionClass('','')],
			chassisOptions : [new OptionClass('','')],
			weaponOneOptions : [new OptionClass('','')],
			weaponTwoOptions: [new OptionClass('','')],
			scannerOneOptions: [new OptionClass('','')],
			scannerTwoOptions: [new OptionClass('','')],
			scannerThreeOptions: [new OptionClass('','')],
			jammerOptions: [new OptionClass('','')],
			treadsOptions: [new OptionClass('','')],
			singleUseItemsOne: [new OptionClass('','')],
			singleUseItemsTwo: [new OptionClass('','')],
			singleUseItemsThree: [new OptionClass('','')],
		}
		this.getFavoriteTank();
	}
	//Clears the inventory on the frontend side
	clearInventoryArrays() {
		this.setState({
			tankOptions : [new OptionClass('','')],
			chassisOptions : [new OptionClass('','')],
			weaponOneOptions : [new OptionClass('','')],
			weaponTwoOptions: [new OptionClass('','')],
			scannerOneOptions: [new OptionClass('','')],
			scannerTwoOptions: [new OptionClass('','')],
			scannerThreeOptions: [new OptionClass('','')],
			jammerOptions: [new OptionClass('','')],
			treadsOptions: [new OptionClass('','')],
			singleUseItemsOne: [new OptionClass('','')],
			singleUseItemsTwo: [new OptionClass('','')],
			singleUseItemsThree: [new OptionClass('','')],
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
		const componentsArray = [this.state.selectedChassis,this.state.selectedWeaponOne,this.state.selectedWeaponTwo,this.state.selectedScannerOne,this.state.selectedScannerTwo,this.state.selectedScannerThree,this.state.selectedJammer,this.state.selectedThreads,this.state.selectedSingleUseItemOne,this.state.selectedSingleUseItemTwo,this.state.selectedSingleUseItemThree];
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
