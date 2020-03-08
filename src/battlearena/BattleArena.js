//@flow strict

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
					<h4>Find the First Challenger Available</h4>
					<Link to="Battleground">	
						<button type="button" className="btn">Quickplay</button>
					</Link>
					<h6>Practice Against Bots</h6>
					<Link to="TrainingArena">
						<button type="button" className="btn">Training Arena</button>
					</Link>
					<SearchPlayers />
				</div>
				<div className="column bamiddle">
					<h2>Choose your Tank, Commander</h2>
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
