//@flow strict

import './BattleArena.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../globalComponents/Navbar.js';
import Leaderboard from '../globalComponents/Leaderboard.js';
import SearchPlayers from './SearchPlayers.js';

class BattleArena extends React.Component<{||}> {

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar
					returnName="Back to Main Menu" 
					pageName="Battle Arena" 
					linkName="MainMenu"
				/>
				<div className="column baleft">
					<h5>Find a Challenger</h5>
					<Link to="Battleground">	
						<button type="button" className="primarybtn">Quickplay</button>
					</Link>
					<h6>Practice Against Bots</h6>
					<Link to="TrainingArena">
						<button type="button" className="btn">Training Arena</button>
					</Link>
					<SearchPlayers />
				</div>
				<div className="column bamiddle">
					<h5>Choose your Tank, Commander</h5>
					<select className="dropdownMenu">
						<option defaultValue>Select a Tank</option>
						<option value="1">Child Consumer</option>
						<option value="2">Fast Bang</option>
						<option value="3">Biggest Gun</option>
					</select>
				</div>
				<div className="column baright">
					<Leaderboard />
				</div>
			</div>
        );
    }
}

export default BattleArena;
