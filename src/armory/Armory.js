//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import Navbar from '../components/Navbar.js';
import RenderTank from '../components/RenderTank.js';
//import ComponentMenu from '../components/ComponentMenu.js';
=======
import Navbar from '../globalComponents/Navbar.js';
>>>>>>> ca870bf1a0213b9439d44f0c0737cf9ef41c9890

// Armory page. Showcases player's tanks and components. Links to Casus.
class Armory extends React.Component<{||}> {

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar styleName="navbtn" linkName="MainMenu" returnName="Back to Main Menu" pageName="Armory" userName="FRIcker" userCurrency={4233} />
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
					<RenderTank tank={ ["moddableLight", "advanceTreads"] } />
					<h6>Points Used: 0/10</h6>
				</div>
				<div className="column armoryright">

				</div>
			</div>
		);
	}
}

// Needs to be placed into armoryright
// <ComponentMenu tank={ ["moddableLight", "machineGun", "machineGun", "shortRangeScanner", "shortRangeJammer", "mine", "c4"]} components={ ["heavy", "laser", "deathRay", "itemScanner", "longRangeJammer"] }/>

export default Armory;

/* Needs to be transferred to ComponentMenu.js
	<h6>Chassis</h6>
	<select className="tankComponentMenu">
      	<option defaultValue></option>
      	<option value="moddableLight">Moddable Light</option>
    	<option value="light">Light</option>
       	<option value="heavy">Heavy</option>
    </select>
	<h6>Weapons</h6>
	<select className="tankComponentMenu">
       	<option defaultValue></option>
       	<option value="1">Laser</option>
    	<option value="2">Machine Gun</option>
    	<option value="3">Vulcan Cannon</option>
    </select>
	<select className="tankComponentMenu">
		<option defaultValue></option>
		<option value="1">Laser</option>
		<option value="2">Machine Gun</option>
		<option value="3">Vulcan Cannon</option>
	</select>
	<h6>Scanner</h6>
	<select className="tankComponentMenu">
		<option defaultValue></option>
		<option value="1">Short Range Scanner</option>
		<option value="2">Medium Range Scanner</option>
		<option value="3">Long Range Scanner</option>
	</select>
	<select className="tankComponentMenu">
		<option defaultValue></option>
		<option value="1">Anti-Jammer Scanner</option>
		<option value="2">Item Scanner</option>
	</select>
	<select className="tankComponentMenu">
		<option defaultValue></option>
		<option value="1">Anti-Jammer Scanner</option>
		<option value="2">Item Scanner</option>
	</select>
	<h6>Jammer</h6>
	<select className="tankComponentMenu">
		<option defaultValue></option>
		<option value="1">Short Range Jammer</option>
		<option value="2">Medium Range Jammer</option>
		<option value="3">Long Range Jammer</option>
	</select>
	<h6>Treads</h6>
	<select className="tankComponentMenu">
		<option defaultValue></option>
		<option value="1">Advanced Treads</option>
		<option value="2">Armored Treads</option>
		<option value="3">Fast Treads</option>
	</select>
	<h6>Single-Use Items</h6>
	<select className="tankComponentMenu">
		<option defaultValue></option>
		<option value="1">Missile Tracking Beacon</option>
		<option value="2">C4</option>
		<option value="3">Mine</option>
	</select>
	<select className="tankComponentMenu">
		<option defaultValue></option>
		<option value="1">Missile Tracking Beacon</option>
		<option value="2">C4</option>
		<option value="3">Mine</option>
	</select>
	<select className="tankComponentMenu">
		<option defaultValue></option>
		<option value="1">Missile Tracking Beacon</option>
		<option value="2">C4</option>
		<option value="3">Mine</option>
	</select>
*/