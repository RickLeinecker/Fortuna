//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
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
					<h6>Practice Against Bots</h6>
					<Link to="TrainingArena">
						<button type="button" className="btn">Training Arena</button>
					</Link>
					<SearchPlayers playerList={ ["jeffery", "jeff", "john", "illeatbutt", "childeatbigtime", "childconsumer"] }/>
				</div>
				<div className="column bamiddle">
					<h2>Choose your Tank, Commander</h2>
					<select className="dropdownMenu">
						<option defaultValue>Select a Tank</option>
						<option value="1">Child Consumer</option>
						<option value="2">Fast Bang</option>
						<option value="3">Biggest Gun</option>
					</select>
					<RenderTank tank={ ["Tread1",  "Chassis4"] }/>
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
