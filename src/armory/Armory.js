//@flow strict

import './Armory.css';
import * as React from 'react';
import Navbar from '../globalComponents/Navbar.js';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {getTankComponent, verifyComponent} from './GetInventoryInfo.js';
// Login component.
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

|};

//This is the array of options for each part of the tank
let tankOptions = [{value: '', label: ''}];
let chassisOptions = [{value: '', label: ''}];
let weaponOneOptions = [{value: '', label: ''}];
let weaponTwoOptions = [{value: '', label: ''}];
let scannerOneOptions= [{value: '', label: ''}];
let scannerTwoOptions= [{value: '', label: ''}];
let scannerThreeOptions= [{value: '', label: ''}];
let jammerOptions = [{value: '', label: ''}];
let treadsOptions = [{value: '', label: ''}];
let singleUseItemsOne = [{value: '', label: ''}];
let singleUseItemsTwo = [{value: '', label: ''}];
let singleUseItemsThree = [{value: '', label: ''}];
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
		}
		this.getFavoriteTank();
	}
	//Clears the inventory on the frontend side
	clearInventoryArrays() {
		tankOptions = [{value: '', label: ''}];
		chassisOptions = [{value: '', label: ''}];
		weaponOneOptions = [{value: '', label: ''}];
		weaponTwoOptions = [{value: '', label: ''}];
		scannerOneOptions= [{value: '', label: ''}];
		scannerTwoOptions= [{value: '', label: ''}];
		scannerThreeOptions= [{value: '', label: ''}];
		jammerOptions = [{value: '', label: ''}];
		treadsOptions = [{value: '', label: ''}];
		singleUseItemsOne = [{value: '', label: ''}];
		singleUseItemsTwo = [{value: '', label: ''}];
		singleUseItemsThree = [{value: '', label: ''}];
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
		const body = await response.text();
		console.log(body);
		const jsonObjectOfTanks = JSON.parse(body);
		//Clear the data so that we dont duplicate items
		this.clearInventoryArrays();
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
			}
			tankOptions.push(obj);
		}
		this.getUserInventory();
	};
	//This will get all the inventory from a user and fill out the arrays used in the front end for the backend
	getUserInventory = async ():Promise<void> => {
		const cookies = new Cookies();
		const token = cookies.get('token').token;
		const response = await fetch('/api/user/getUser/', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': token
			},
		});
		const body = await response.text();
		const jsonObjectOfUser = JSON.parse(body);
		//set the users id
		this.setState({userId:jsonObjectOfUser._id});
		for (const component in jsonObjectOfUser.inventory.tankComponents) {
			const typeOfItem = getTankComponent(verifyComponent(component));
			//This will add the chassis that the user has
			if(typeOfItem === 'chassis') {
				let obj = {};
				obj['value'] = component;
				obj['label'] = component;
				chassisOptions.push(obj);
			}
			//This will add the weapons that the user has
			else if(typeOfItem === 'weapon') {
				let obj = {};
				obj['value'] = component;
				obj['label'] = component;
				weaponOneOptions.push(obj);
				weaponTwoOptions.push(obj);
			}
			//This will add the scanners that the user has
			else if(typeOfItem === 'scanner') {
				let obj = {};
				obj['value'] = component;
				obj['label'] = component;
				scannerOneOptions.push(obj);
				scannerTwoOptions.push(obj);
				scannerThreeOptions.push(obj);
			}
			//This will add the jammers that the user has
			else if(typeOfItem === 'jammer') {
				let obj = {};
				obj['value'] = component;
				obj['label'] = component;
				jammerOptions.push(obj);
			}
			//This will add the threads that the user has
			else if(typeOfItem === 'treads') {
				let obj = {};
				obj['value'] = component;
				obj['label'] = component;
				treadsOptions.push(obj);
			}
			//This will add the single use items that the user has
			else if(typeOfItem === 'item') {
				let obj = {};
				obj['value'] = component;
				obj['label'] = component;
				singleUseItemsOne.push(obj);
				singleUseItemsTwo.push(obj);
				singleUseItemsThree.push(obj);
			}
		}
		//Need this to deal with the asynch nature of api calling......fun times
		this.forceUpdate();
	};


	//This handles the changes if a user changes tanks or its components
	//Thsi has to be an any because this taget uses label which is not a part of HTMLElement. 
	handleChangeInTankOptions = ({ target }:{target:any}) => {
		this.setState({ selectedTankId: target.value});
		this.setState({ selectedTankName: target.label});
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
					<select className="dropdownMenu" value={this.state.selectedTankId} onChange={this.handleChangeInTankOptions}>{tankOptions.map(({ value, label }, index) => <option key={index}  value={value}>{label}</option>)}</select>
					<div className="column armoryleft">
						<h3>Select a Tank to Edit</h3>
						<select className="dropdownMenu">
							<option defaultValue>Select a Tank</option>
							<option value="Child Consumer">Child Consumer</option>
							<option value="Fast Bang">Fast Bang</option>
							<option value="Biggest Gun">Biggest Gun</option>
						</select>
						<h6>Set this tank as default?</h6>
						<button type="button" className="btn">Set Default</button>
						<h3>Edit tank's Code</h3>
						<Link to="Casus">
						<button type="button" className="btn">Casus</button>
						</Link>
					</div>
					<div className="column armorymiddle">
						<h1>BIG TANK GUY</h1>
						<h6>Points Used: 0/10</h6>
					</div>
					<div className="column armoryright">
						<h6>Chassis</h6>
						<select className="tankComponentMenu" value={this.state.selectedChassis} onChange={this.handleChangeInChassisOptions}>{chassisOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}</select>
						<h6>Weapons</h6>
						<select className="tankComponentMenu" value={this.state.selectedWeaponOne} onChange={this.handleChangeInWeaponOneOptions}>{weaponOneOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}</select>
						<select className="tankComponentMenu" value={this.state.selectedWeaponTwo} onChange={this.handleChangeInWeaponTwoOptions}>{weaponTwoOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}</select>
						<h6>Scanner</h6>
						<select className="tankComponentMenu" value={this.state.selectedScannerOne} onChange={this.handleChangeInScannerOneOptions}>{scannerOneOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}</select>
						<select className="tankComponentMenu" value={this.state.selectedScannerTwo} onChange={this.handleChangeInScannerTwoOptions}>{scannerTwoOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}</select>
						<select className="tankComponentMenu" value={this.state.selectedScannerThree} onChange={this.handleChangeInScannerThreeOptions}>{scannerThreeOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}</select>
						<h6>Jammer</h6>
						<select className="tankComponentMenu" value={this.state.selectedJammer} onChange={this.handleChangeInJammerOptions}>{jammerOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}</select>
						<h6>Treads</h6>
						<select className="tankComponentMenu" value={this.state.selectedThreads} onChange={this.handleChangeInTreadsOptions}>{treadsOptions.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}</select>
						<h6>Single-Use Items</h6>
						<select className="tankComponentMenu" value={this.state.selectedSingleUseItemOne} onChange={this.handleChangeInSingleUseItemsOneOptions}>{singleUseItemsOne.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}</select>
						<select className="tankComponentMenu" value={this.state.selectedSingleUseItemTwo} onChange={this.handleChangeInSingleUseItemsTwoOptions}>{singleUseItemsTwo.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}</select>
						<select className="tankComponentMenu" value={this.state.selectedSingleUseItemThree} onChange={this.handleChangeInSingleUseItemsThreeOptions}>{singleUseItemsThree.map(({ value, label  }, index) => <option key={index} value={value}>{label}</option>)}</select>
						<button type="button" className="btn mt-4" onClick={this.saveTank}>Save</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Armory;
