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
let tankOptions = [
    { value: 'flavor', label: 'flavor' },
    { value: 'yummy', label: 'yummy' },
    { value: 'red', label: 'red' },
    { value: 'green', label: 'green' },
    { value: 'yellow', label: 'yellow' },
];
let chassisOptions = [
    { value: 'ModarateLight', label: 'Modarate Light' },
    { value: 'Light', label: 'Light' },
    { value: 'Heavy', label: 'Heavy' },
];
let weaponOptions = [
    { value: 'Laser', label: 'Laser' },
    { value: 'MachineGun', label: 'Machine Gun' },
    { value: 'VulcanCannon', label: 'Vulcan Cannon' }
];
let scannerOneOptions= [
    { value: 'ShortRangeScanner', label: 'Short Range Scanner' },
    { value: 'MediumRangeScanner', label: 'Medium Range Scanner' },
    { value: 'LongRangeScanner', label: 'Long Range Scanner' },
];
let scannerTwoOptions= [
    { value: 'AntiJammerScanner', label: 'Anti Jammer Scanner' },
    { value: 'ItemScanner', label: 'Item Scanner' },
];
let scannerThreeOptions= [
    { value: 'AntiJammerScanner', label: 'Anti Jammer Scanner' },
    { value: 'ItemScanner', label: 'Item Scanner' },
];
let jammerOptions = [
    { value: 'ShortRangeJammer', label: 'Short Range Jammer' },
    { value: 'MediumRangeJammer', label: 'Medium Range Jammer' },
    { value: 'LongRangeJammer', label: 'Long Range Jammer' },
];
let treadsOptions = [
    { value: 'AdvancedThreads', label: 'Advanced Threads' },
    { value: 'ArmoredThreads', label: 'Armored Threads' },
    { value: 'FastThreads', label: 'Fast Threads' },
];
let singleUseItemsOne = [
    { value: 'MissileTrackingBeacon', label: 'Missile Tracking Beacon' },
    { value: 'C4', label: 'C4' },
    { value: 'Mine', label: 'Mine' },
];
// Armory page. Showcases player's tanks and components. Links to Casus.
class Armory extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			//This tank id is the one the user is currently working on
			selectedTankId: 'None',
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
		}
	}
	//This is used to get the current favorite tank of the user
	getFavoriteTank = async ():Promise<void> => {
		const cookies = new Cookies();
		const token = cookies.get('token');
		console.log(token);
		const response = await fetch('/api/tank/getFavorite/', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'X-Auth-Token': token
			},
		});
		const body = await response.text();
		console.log(body);
	};

	//This handles the changes if a user changes tanks or its components
	handleChangeInTankOptions = ({ target }) => {
        this.setState({
            selectedTankId: target.value,
        });
	}
	handleChangeInChassisOptions = ({ target }) => {
        this.setState({
            selectedChassis: target.value,
        });
	}
	handleChangeInWeaponOneOptions = ({ target }) => {
        this.setState({
            selectedWeaponOne: target.value,
        });
	}
	handleChangeInWeaponTwoOptions = ({ target }) => {
        this.setState({
            selectedWeaponTwo: target.value,
        });
	}
	handleChangeInScannerOneOptions = ({ target }) => {
        this.setState({
            selectedScannerOne: target.value,
        });
	}
	handleChangeInScannerTwoOptions = ({ target }) => {
        this.setState({
            selectedScannerTwo: target.value,
        });
	}
	handleChangeInScannerThreeOptions = ({ target }) => {
        this.setState({
            selectedScannerThree: target.value,
        });
	}
	handleChangeInJammerOptions = ({ target }) => {
        this.setState({
            selectedJammer: target.value,
        });
	}
	handleChangeInTreadsOptions = ({ target }) => {
        this.setState({
            selectedThreads: target.value,
        });
	}
	handleChangeInSingleUseItemsOneOptions = ({ target }) => {
        this.setState({
            selectedSingleUseItemOne: target.value,
        });
	}
	handleChangeInSingleUseItemsTwoOptions = ({ target }) => {
        this.setState({
            selectedSingleUseItemTwo: target.value,
        });
	}
	handleChangeInSingleUseItemsThreeOptions = ({ target }) => {
        this.setState({
            selectedSingleUseItemThree: target.value,
        });
	}
	render(): React.Node {
		this.getFavoriteTank();
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
					<select className="tankComponentMenu" value={this.state.selectedScannerThree} onChange={this.handleChangeInScannerThreeOptions}>{scannerThreeOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}</select>
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
