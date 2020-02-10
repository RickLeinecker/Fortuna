//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.js';
import Leaderboard from '../components/Leaderboard.js';

class BattleArena extends React.Component<{||}> {
    render(): React.Node {
        return (
		<div id="Parent">
		    <Navbar styleName="navbtn" returnName="Back to Main Menu" pageName="Battle Arena" linkName="MainMenu" userName="FRIcker | $465128"/>
		    <div className="column baleft">
			<h2>Find a Player to Challenge</h2>
			<input type="text" className="inputText" placeholder="Search Players" aria-label="searchPlayer" aria-describedby="basic-addon1"/>
			<h6>Find the First Challenger Available</h6>
			<button type="button" className="btn">Quickplay</button>
			<h6>Practice Against Bots</h6>
			<Link to="TrainingArena">
			    <button type="button" className="btn">Training Arena</button>
			</Link>
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
				<h2>FORTUNA's Best and Brightest</h2>
				<Leaderboard leaderNames={ ["John", "Bill", "Suck", "Big Suck", "HEhaw", "XXXXXfweckerXXXXX", "Yes", "2more", "9", "10haha"] } />
			</div>
		</div>
        );
    }
}

export default BattleArena;
