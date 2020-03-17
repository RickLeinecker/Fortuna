//@flow strict

import './Armory.css';
import * as React from 'react';
import Navbar from '../globalComponents/Navbar.js';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {getTankComponent, verifyComponent} from './GetInventoryInfo.js';
import CreateNewTankPopup from './CreateNewTankPopup.js';
import setTankForCasus from '../globalComponents/setTankForCasus.js';
import Tank from '../tanks/Tank.js';
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
			currentTank: new Tank(),
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
	getFavoriteTank = async ():Promise<void> => {
		const cookies = new Cookies();
		const token = cookies.get('token');
		const response = await fetch('/api/tank/getFavorite/', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': token
			},
		});
		const body = await response.text();
		this.setState({selectedTankId: body});
		this.getSelectedTank();
	};
	//This can get a tank with the same id as the selected one and will fill out the info for all the items
	getSelectedTank = async ():Promise<void> => {
		const cookies = new Cookies();
		const token = cookies.get('token');
		const response = await fetch('/api/tank/userTanks/', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': token
			},
		});
		const jsonObjectOfTanks = await response.json();
		//Clear the data so that we dont duplicate items
		this.clearInventoryArrays();
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
	};
	//This will get all the inventory from a user and fill out the arrays used in the front end for the backend
	getUserInventory = async ():Promise<void> => {
		const cookies = new Cookies();
		const token = cookies.get('token');
		const response = await fetch('/api/user/getUser/', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': token
			},
		});
		const jsonObjectOfUser = await response.json();
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
		newTank.chassis = target.value;
		this.setState({ currentTank: newTank });
	}

	handleChangeInWeaponOneOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.mainGun = target.value;
		this.setState({ currentTank: newTank });
	}

	handleChangeInWeaponTwoOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.secondaryGun = target.value;
		this.setState({ currentTank: newTank });
	}

	handleChangeInScannerOneOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.mainScanner = target.value;
		this.setState({ currentTank: newTank });
	}

	handleChangeInScannerTwoOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.secondaryScanner = target.value;
		this.setState({ currentTank: newTank });
	}

	handleChangeInScannerThreeOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.tertiaryScanner = target.value;
		this.setState({ currentTank: newTank });
	}

	handleChangeInJammerOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.jammer = target.value;
		this.setState({ currentTank: newTank });
	}

	handleChangeInTreadsOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.treads = target.value;
		this.setState({ currentTank: newTank });
	}

	handleChangeInSingleUseItemsOneOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.firstSingleUseItem = target.value;
		this.setState({ currentTank: newTank });
	}

	handleChangeInSingleUseItemsTwoOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.secondSingleUseItem = target.value;
		this.setState({ currentTank: newTank });
	}

	handleChangeInSingleUseItemsThreeOptions = ({ target }:{target:HTMLInputElement }) => {
		var newTank = this.state.currentTank;
		newTank.thirdSingleUseItem = target.value;
		this.setState({ currentTank: newTank });
	}

	//This will save a tank
	saveTank  = async ():Promise<void> => {
		let componentsArray = [this.state.currentTank.selectedChassis,this.state.currentTank.selectedWeaponOne,this.state.currentTank.selectedWeaponTwo,this.state.currentTank.selectedScannerOne,this.state.currentTank.selectedScannerTwo,this.state.currentTank.selectedScannerThree,this.state.currentTank.selectedJammer,this.state.currentTank.selectedThreads,this.state.currentTank.selectedSingleUseItemOne,this.state.currentTank.selectedSingleUseItemTwo,this.state.currentTank.selectedSingleUseItemThree];
		fetch('/api/tank/tankUpdate/' + this.state.selectedTankId, {

			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ tankName: this.state.selectedTankName, userId: this.state.userId, components: componentsArray, casusCode: this.state.currentTank.casusCode, isBot: this.state.currentTank.isBot }),
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
