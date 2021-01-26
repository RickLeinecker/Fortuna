//@flow strict

import './MainMenu.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {Fragment, useState, useEffect} from 'react';
import MainNavbar from '../globalComponents/MainNavbar.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import Replays from "../battlearena/Replays";
import Leaderboard from "../globalComponents/Leaderboard";
import SelectTank from "../globalComponents/SelectTank";
import User from '../globalComponents/typesAndClasses/User.js';
import TankDisplay from "../tanks/TankDisplay";
import {getAllUsersTanks} from "../globalComponents/apiCalls/tankAPIIntegration";
import getPreferredSelectedTank from "../globalComponents/getPreferredSelectedTank";
import getReplayListAPICall from "../globalComponents/apiCalls/getReplayListAPICall";
import Tank from "../tanks/Tank";
import type {BattleType} from "../globalComponents/typesAndClasses/BattleType";

// type Props = {||};

// type State = {|
// 	selectedTankOne: ?Tank,
// 	selectedTankTwo: ?Tank,
// 	selectedTankThree: ?Tank,
// 	allTanks: Array<Tank>,
// 	userElo: number,
// 	battleType: BattleType
// |};

// Main Menu component.
const MainMenu  = () => {


	const [selectedTankOne, setSelectedTankOne] = useState(null);
	const [selectedTankTwo, setSelectedTankTwo] = useState(null);
	const [selectedTankThree, setSelectedTankThree] = useState(null);
	const [allTanks, setAllTanks] = useState([]);
	const [userElo, setUserElo] = useState(0);
	const [battleType, setBattleType] = useState('1 vs 1')


	useEffect(() => {

		document.body.style.backgroundImage = "url('/login_background.gif')"
		document.body.style.fontFamily = "font-family: 'Press Start 2P', cursive;"
		getAllUsersTanks(allTanks => {
			{
				setAllTanks(allTanks)
				setSelectedTankOne(getPreferredSelectedTank(allTanks))
			};
		});
		getReplayListAPICall(() => {
		});
	}, [])

	return (
		<div id="Parent">
			<MainNavbar
				linkName="/Login"
				returnName="Logout"
				pageName="Main Menu"
			/>
			<h1 className="menuheader">Where to Commander?</h1>
			<div className="column menuleft">
				<Replays/>
				<br/>
				<Link to={verifyLink("/TrainingArena")}>
					<button className="mainMenuBtn">Training</button>
				</Link>
			</div>
			<div className="column menumiddle">
				{(battleType === '1 vs 1') ?
					<div>
						<SelectTank
							selectedTank={selectedTankOne}
							allTanks={allTanks}
							changeSelectedTank={(tank) => {setSelectedTankOne(tank)}}
							propogateChangesToCasus={true}
							allowRemoveTank={false}
						/>
						{selectedTankOne == null ? <div className="emptyTankBig"></div> :
							<TankDisplay tankToDisplay={selectedTankOne} smallTank={false}/>}
					</div> :
					<div className="threeTankDisplay">
						<table>
							<thead>
							<tr>
								<th>
									<SelectTank
										selectedTank={selectedTankTwo}
										allTanks={allTanks.filter(tank => tank !== selectedTankOne && tank !== selectedTankThree)}
										changeSelectedTank={(tank) => selectedTankTwo(tank)}
										propogateChangesToCasus={false}
										allowRemoveTank={true}
									/>
								</th>
								<th>
									<SelectTank
										selectedTank={selectedTankOne}
										allTanks={allTanks.filter(tank => tank !== selectedTankThree && tank !== selectedTankTwo)}
										changeSelectedTank={(tank) => {setSelectedTankOne(tank)}}
										propogateChangesToCasus={false}
										allowRemoveTank={true}
									/>
								</th>
								<th>
									<SelectTank
										selectedTank={selectedTankThree}
										allTanks={allTanks.filter(tank => tank !== selectedTankOne && tank !== selectedTankTwo)}
										changeSelectedTank={(tank) => {setSelectedTankThree(tank)}}
										propogateChangesToCasus={false}
										allowRemoveTank={true}
									/>
								</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>
									{selectedTankTwo == null ? <div className="emptyTankSmall"></div> :
										<TankDisplay tankToDisplay={selectedTankTwo} smallTank={true}/>}

								</td>
								<td>
									{selectedTankOne == null ? <div className="emptyTankSmall"></div> :
										<TankDisplay tankToDisplay={selectedTankOne} smallTank={true}/>}
								</td>
								<td>
									{selectedTankThree == null ? <div className="emptyTankSmall"></div> :
										<TankDisplay tankToDisplay={selectedTankThree}
													 smallTank={true}/>}
								</td>
							</tr>
							</tbody>
						</table>
					</div>
				}
				<br/>
				<Link to={verifyLink("/Casus")}>
					<button className="mainMenuBtn">Edit Tank Code</button>
				</Link>
				<br/>
				<br/>
				<br/>

				<Link to={verifyLink("/BattleArena")}>
					<button className="mainMenuBtn">Play</button>
				</Link>
			</div>
			<div className="column menuright">
				<Leaderboard/>
				<br/>
				<Link to={verifyLink("/Credits")}>
					<button className="mainMenuBtn">Credits</button>
				</Link>
			</div>
		</div>
	)
}


export default MainMenu;
