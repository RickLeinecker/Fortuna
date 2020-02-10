//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.js';

// Tracks points to component names.
const componentPoints = [
	// Chassis
	{ moddableLight: -1 },
	{ light: 0 },
	{ moddable: -1 },
	{ heavy: 0 },
	{ moddableHeavy: -1 },

	// Weapons
	{ machineGun: 1 },
	{ grenadeLauncher: 1 },
	{ missile: 1 },
	{ shotgun: 1 },
	{ vulcanCannon: 1 },
	{ laser: 1 },
	{ plasma: 2 },
	{ pulseLaser: 1 },
	{ lancer: 2 },
	{ deathRay: 2 },

	// Scanners
	{ shortRangeScanner: 1 },
	{ mediumRangeScanner: 2 },
	{ longRangeScanner: 3 },
	{ itemScanner: 1 },
	{ antiJammerScanner: 1 },

	// Jammers
	{ closeRangeJammer: 1 },
	{ mediumRangeJammer: 1 },
	{ longRangeJammer: 1 },

	// Treads
	{ advancedTreads: 2 },
	{ fastTreads: 1 },
	{ armoredTreads: 1 },
	{ heavilyArmoredTreads: 2 },

	// Single-Use Items
	{ mine: 1 },
	{ c4: 2 },
	{ nitroRepair: 1 },
	{ overdrive: 2 },
	{ missileTrackingBeacon: 2 }
];

// Armory page. Showcases player's tanks and components. Links to Casus.
class Armory extends React.Component<{||}> {

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar styleName="navbtn" linkName="MainMenu" returnName="Back to Main Menu" pageName="Armory" userName="FRIcker | $465128" />
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
				</div>
			</div>
		);
	}
}

export default Armory;
