//@flow strict

import * as React from 'react';
//import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.js';

// Armory page. Showcases player's tanks and components. Links to Casus.
class Armory extends React.Component<{||}> {
	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar styleName="navbtn" linkName="/Mainmenu" returnName="Back to Main Menu" pageName="Armory" userName="FRIcker | $465128" />
				<div className="column armoryright">
					<h3>Select a Tank to Edit</h3>
					<select className="dropdownMenu">
                    <option defaultValue>Select a Tank</option>
                    	<option value="1">Child Consumer</option>
                    	<option value="2">Fast Bang</option>
                    	<option value="3">Biggest Gun</option>
                	</select>
					<h6>Set this tank as default?</h6>
					<label className="defaultRadioButton">
						<input type="checkbox" />
						<span class="checkmark"></span>
					</label>
				</div>
				<div className="column armorymiddle">

				</div>
				<div className="column armoryleft">

				</div>
			</div>
		);
	}
}

export default Armory;