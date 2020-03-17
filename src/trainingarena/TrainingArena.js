//@flow strict

import './TrainingArena.css';
import * as React from 'react';
import Navbar from '../globalComponents/Navbar.js';
import { Link } from 'react-router-dom';
import { verifyLink } from '../globalComponents/verifyLink.js';

class TrainingArena extends React.Component<{||}> {

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar 
					linkName="BattleArena" 
					returnName="Back to Battle Arena" 
					pageName="Training Arena" 
				/>
				<div className="column taleft">
					<h5>Choose your Tank, Commander</h5>
					<select className="dropdownMenu">
						<option defaultValue>Select a Tank</option>
						<option value="1">Child Consumer</option>
						<option value="2">Fast Bang</option>
						<option value="3">Biggest Gun</option>
					</select>
					</div>
				<div className="column tamiddle">
					<h4>Choose an Arena to Battle</h4>
					<select className="dropdownMenu">
						<option defaultValue>Select Arena</option>
						<option value="1">Big Arena</option>
						<option value="2">Small Arena</option>
						<option value="3">Arena I am, yes</option>
					</select>
					<Link to={verifyLink("Battleground")}>
						<button type="button" className="primarybtn">Start Battle</button>
					</Link>
				</div>
				<div className="column taright">
					<h5>Choose a Training Bot</h5>
					<select className="dropdownMenu">
						<option defaultValue>Select a Tank</option>
						<option value="1">Child Consumer</option>
						<option value="2">Fast Bang</option>
						<option value="3">Biggest Gun</option>
					</select>
				</div>
			</div>
		)
	}
}

export default TrainingArena;
