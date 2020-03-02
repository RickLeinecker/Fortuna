//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import Navbar from '../components/Navbar.js';
import Leaderboard from '../components/Leaderboard.js';
import RenderTank from '../components/RenderTank.js';
import SearchPlayers from '../components/SearchPlayers.js';

// searchName tracks the text the user enters into the searchbar to find players to challenge.
type State = {|
	searchName: string
|};

class BattleArena extends React.Component<State> {

    render(): React.Node {

        return (
			<div id="Parent">
				<Navbar styleName="navbtn" returnName="Back to Main Menu" pageName="Battle Arena" linkName="MainMenu" userName="FRIcker" userCurrency={465128} />
				<div className="column baleft">
					<h2>Challenge a Player</h2>
					<button type="button" className="btn">Quickplay</button>
=======
import Navbar from '../globalComponents/Navbar.js';
import Leaderboard from '../globalComponents/Leaderboard.js';

class BattleArena extends React.Component<{||}> {

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar 
					styleName="navbtn" 
					returnName="Back to Main Menu" 
					pageName="Battle Arena" 
					linkName="MainMenu" 
					userName="FRIcker | $465128"
				/>
				<div className="column baleft">
					<h2>Find a Player to Challenge</h2>
					<input 
						type="text" 
						className="inputText" 
						placeholder="Search Players" 
						aria-label="searchPlayer" 
						aria-describedby="basic-addon1"/>
					<h6>Find the First Challenger Available</h6>
					<Link to="Battleground">	
						<button type="button" className="btn">Quickplay</button>
					</Link>
>>>>>>> ca870bf1a0213b9439d44f0c0737cf9ef41c9890
					<h6>Practice Against Bots</h6>
					<Link to="TrainingArena">
						<button type="button" className="btn">Training Arena</button>
					</Link>
<<<<<<< HEAD
					<SearchPlayers playerList={ ["jeffery", "jeff", "john", "illeatbutt", "childeatbigtime", "childconsumer"] }/>
=======
>>>>>>> ca870bf1a0213b9439d44f0c0737cf9ef41c9890
				</div>
				<div className="column bamiddle">
					<h2>Choose your Tank, Commander</h2>
					<select className="dropdownMenu">
						<option defaultValue>Select a Tank</option>
						<option value="1">Child Consumer</option>
						<option value="2">Fast Bang</option>
						<option value="3">Biggest Gun</option>
					</select>
<<<<<<< HEAD
					<RenderTank tank={ ["moddableLight",  "advancedTreads"] }/>
				</div>
				<div className="column baright">
					<h2>FORTUNA's Best and Brightest</h2>
					<Leaderboard leaderNames={ ["John", "Bill", "Suck", "Big Suck", "HEhaw", "XXXXXfweckerXXXXX", "Yes", "2more", "9", "10haha"] } />
				</div>
			</div>
        );
    }
=======
				</div>
				<div className="column baright">
					<h2>FORTUNA's Best and Brightest</h2>
					<Leaderboard 
						leaderNames={ ["We", "Need", "To", "Get", "These", "With", "An", "API", "Call", "Still"] } 
					/>
				</div>
			</div>
		);
	}

>>>>>>> ca870bf1a0213b9439d44f0c0737cf9ef41c9890
}

export default BattleArena;
