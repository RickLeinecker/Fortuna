//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.js';
import Cookies from 'universal-cookie';
// Login component.
type Props = {||}; 
type State = {|
	selectedTankId: string,
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

|};

//This is the array of options for each part of the tank
let tankOptions = [];
let chassisOptions = [];
let weaponOptions = [];
let scannerOneOptions= [];
let scannerTwoOptions= [];
let jammerOptions = [];
let treadsOptions = [];
let singleUseItemsOne = [];
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
		}
	}
	//This is used to get the current favorite tank of the user
	getFavoriteTank = async ():Promise<void> => {
		const cookies = new Cookies();
		const token = cookies.get('token').token;
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
		const token = cookies.get('token').token;
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
		const jsonObjectOfTanks = JSON.parse(body);
		//This will get the seleced tanks info and fill out the selected items
		for (let key in jsonObjectOfTanks)
		{
			let obj = {};
			console.log(jsonObjectOfTanks[key].tankName);
			obj['value'] = jsonObjectOfTanks[key]._id;
			obj['label'] = jsonObjectOfTanks[key].tankName;
			tankOptions.push(obj);
			if(jsonObjectOfTanks[key]._id === this.state.selectedTankId)
			{
				this.setState({selectedTankName:jsonObjectOfTanks[key].tankName});
				this.setState({selectedCasusCode:jsonObjectOfTanks[key].casusCode});
				this.setState({selectedIsBot:jsonObjectOfTanks[key].isBot});
				this.setState({selectedChassis: jsonObjectOfTanks[key].components[0]});
				this.setState({selectedWeaponOne: jsonObjectOfTanks[key].components[1]});
				this.setState({selectedWeaponTwo: jsonObjectOfTanks[key].components[2]});
				this.setState({selectedScannerOne: jsonObjectOfTanks[key].components[3]});
				this.setState({selectedScannerTwo: jsonObjectOfTanks[key].components[4]});
				this.setState({selectedScannerThree: jsonObjectOfTanks[key].components[5]});
				this.setState({selectedJammer: jsonObjectOfTanks[key].components[6]});
				this.setState({selectedThreads: jsonObjectOfTanks[key].components[7]});
				this.setState({selectedSingleUseItemOne: jsonObjectOfTanks[key].components[8]});
				this.setState({selectedSingleUseItemTwo: jsonObjectOfTanks[key].components[9]});
				this.setState({selectedSingleUseItemThree: jsonObjectOfTanks[key].components[10]});
			}
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
		//This will add the chassis that the user has
		for (let key in jsonObjectOfUser.inventory.tankComponents.chassis) {
			let obj = {};
			obj['value'] = key;
			obj['label'] = key;
			chassisOptions.push(obj);
		}
		//This will add the weapons that the user has
		for (let key in jsonObjectOfUser.inventory.tankComponents.weapons) {
			let obj = {};
			obj['value'] = key;
			obj['label'] = key;
			weaponOptions.push(obj);
		}
		//This will add the scanners that the user has
		for (let key in jsonObjectOfUser.inventory.tankComponents.scanners) {
			let obj = {};
			obj['value'] = key;
			obj['label'] = key;
			scannerOneOptions.push(obj);
		}
		//This will add the scanners secondary that the user has
		for (let key in jsonObjectOfUser.inventory.tankComponents.scannerSecondary) {
			let obj = {};
			obj['value'] = key;
			obj['label'] = key;
			scannerTwoOptions.push(obj);
		}
		//This will add the jammers that the user has
		for (let key in jsonObjectOfUser.inventory.tankComponents.jammers) {
			let obj = {};
			obj['value'] = key;
			obj['label'] = key;
			jammerOptions.push(obj);
		}
		//This will add the threads that the user has
		for (let key in jsonObjectOfUser.inventory.tankComponents.threads) {
			let obj = {};
			obj['value'] = key;
			obj['label'] = key;
			treadsOptions.push(obj);
		}
		//This will add the single use items that the user has
		for (let key in jsonObjectOfUser.inventory.tankComponents.singleUseItems) {
			let obj = {};
			obj['value'] = key;
			obj['label'] = key;
			singleUseItemsOne.push(obj);;
		}
	};
	
	
	//This handles the changes if a user changes tanks or its components
	handleChangeInTankOptions = ({ target }) => {this.setState({ selectedTankId: target.value});}
	handleChangeInChassisOptions = ({ target }) => {this.setState({selectedChassis: target.value});}
	handleChangeInWeaponOneOptions = ({ target }) => {this.setState({selectedWeaponOne: target.value});}
	handleChangeInWeaponTwoOptions = ({ target }) => {this.setState({selectedWeaponTwo: target.value});}
	handleChangeInScannerOneOptions = ({ target }) => {this.setState({selectedScannerOne: target.value});}
	handleChangeInScannerTwoOptions = ({ target }) => {this.setState({selectedScannerTwo: target.value});}
	handleChangeInScannerThreeOptions = ({ target }) => {this.setState({selectedScannerThree: target.value});}
	handleChangeInJammerOptions = ({ target }) => {this.setState({selectedJammer: target.value});}
	handleChangeInTreadsOptions = ({ target }) => {this.setState({selectedThreads: target.value });}
	handleChangeInSingleUseItemsOneOptions = ({ target }) => { this.setState({selectedSingleUseItemOne: target.value});}
	handleChangeInSingleUseItemsTwoOptions = ({ target }) => {this.setState({selectedSingleUseItemTwo: target.value });}
	handleChangeInSingleUseItemsThreeOptions = ({ target }) => {this.setState({selectedSingleUseItemThree: target.value});}

	//This will save a tank
	saveTank  = async ():Promise<void> => {
		let componentsArray = [this.state.selectedChassis,this.state.selectedWeaponOne,this.state.selectedWeaponTwo,this.state.selectedScannerOne,this.state.selectedScannerTwo,this.state.selectedScannerThree,this.state.selectedJammer,this.state.selectedThreads,this.state.selectedSingleUseItemOne,this.state.selectedSingleUseItemTwo,this.state.selectedSingleUseItemThree];
		const response = await fetch('/api/tank/tankUpdate/' + this.state.selectedTankId, {
			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ tankName: this.state.selectedTankName, userId: this.state.userId, components: componentsArray, casusCode: this.state.selectedCasusCode, isBot: this.state.selectedIsBot }),
		});
		const body = await response.text();
		console.log(body);
	};
	render(): React.Node {
		//Things that we only want running once
		if(this.state.selectedTankId === 'None')
		{
			this.getFavoriteTank();
			this.getUserInventory();
		}
		return (
			<div id="Parent">
				<Navbar styleName="navbtn" linkName="MainMenu" returnName="Back to Main Menu" pageName="Armory" userName="FRIcker | $465128" />
				<div className="column armoryleft">
					<h3>Select a Tank to Edit</h3>
					<select className="dropdownMenu" value={this.state.selectedTankId} onChange={this.handleChangeInTankOptions}>{tankOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
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
					<select className="tankComponentMenu" value={this.state.selectedChassis} onChange={this.handleChangeInChassisOptions}>{chassisOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
					<h6>Weapons</h6>
					<select className="tankComponentMenu" value={this.state.selectedWeaponOne} onChange={this.handleChangeInWeaponOneOptions}>{weaponOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
					<select className="tankComponentMenu" value={this.state.selectedWeaponTwo} onChange={this.handleChangeInWeaponTwoOptions}>{weaponOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
					<h6>Scanner</h6>
					<select className="tankComponentMenu" value={this.state.selectedScannerOne} onChange={this.handleChangeInScannerOneOptions}>{scannerOneOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
					<select className="tankComponentMenu" value={this.state.selectedScannerTwo} onChange={this.handleChangeInScannerTwoOptions}>{scannerTwoOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
					<select className="tankComponentMenu" value={this.state.selectedScannerThree} onChange={this.handleChangeInScannerThreeOptions}>{scannerTwoOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
					<h6>Jammer</h6>
					<select className="tankComponentMenu" value={this.state.selectedJammer} onChange={this.handleChangeInJammerOptions}>{jammerOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
					<h6>Treads</h6>
					<select className="tankComponentMenu" value={this.state.selectedThreads} onChange={this.handleChangeInTreadsOptions}>{treadsOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
					<h6>Single-Use Items</h6>
					<select className="tankComponentMenu" value={this.state.selectedSingleUseItemOne} onChange={this.handleChangeInSingleUseItemsOneOptions}>{singleUseItemsOne.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
					<select className="tankComponentMenu" value={this.state.selectedSingleUseItemTwo} onChange={this.handleChangeInSingleUseItemsTwoOptions}>{singleUseItemsOne.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
					<select className="tankComponentMenu" value={this.state.selectedSingleUseItemThree} onChange={this.handleChangeInSingleUseItemsThreeOptions}>{singleUseItemsOne.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
				</div>
			</div>
		);
	}
}

export default Armory;
