//@flow strict

import './MainMenu.css';
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from '../globalComponents/MainNavbar.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import Replays from "../battlearena/Replays";
import LeaderboardMainMenu from "./LeaderboardMainMenu";
import SelectTank from "../globalComponents/SelectTank";
import User from '../globalComponents/typesAndClasses/User.js';
import TankDisplay from "../tanks/TankDisplay";
import {getAllUsersTanks} from "../globalComponents/apiCalls/tankAPIIntegration";
import getPreferredSelectedTank from "../globalComponents/getPreferredSelectedTank";
import getReplayListAPICall from "../globalComponents/apiCalls/getReplayListAPICall";
import getFirstTimeHomeAPICall from "../globalComponents/apiCalls/getFirstTimeHomeAPICall";
import setFirstTimeHomeAPICall from "../globalComponents/apiCalls/setFirstTimeHomeAPICall";
import Tank from "../tanks/Tank";
import type {BattleType} from "../globalComponents/typesAndClasses/BattleType";
import {toast} from "react-toastify";
import getErrorFromObject from "../globalComponents/getErrorFromObject";
import setLoginToken from "../globalComponents/setLoginToken";
import JoyRide from 'react-joyride'
import { TweenMax, TweenLite, Power3 } from 'gsap'

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

        // test
	const [selectedTankOne, setSelectedTankOne] = useState(null);
	const [selectedTankTwo, setSelectedTankTwo] = useState(null);
	const [selectedTankThree, setSelectedTankThree] = useState(null);
	const [allTanks, setAllTanks] = useState([]);
	const [userElo, setUserElo] = useState(0);
    const [battleType, setBattleType] = useState('1 vs 1')
    const [run, setRun] = useState(true);
    const [tourSteps, setTourSteps] = useState([
        {
          target: ".editTank",
          content: "HEY GUYS"
        },
        {
          target: ".play",
          content: "Step 2"
        },
        {
          target: ".train",
          content: "Step 3"
        },
        {
          target: '.tankSelect',
          content: "Step 4"
        },
        {
          target: ".battleRecord",
          content: "Step 5"
        },
        {
          target: ".creditsButton",
          content: "Step 6"
        },
        {
          target: ".leaderboardTut",
          content: "Step 7"
        }
      ])



    let left = useRef(null);
    let mid = useRef(null);
    let right = useRef(null);


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


		getFirstTimeHomeAPICall((res) => {
      console.log("RES: ", res);
      setRun(res);
		})

		setFirstTimeHomeAPICall();

    TweenLite.from(left, 1, {opacity: 0, x: -200, ease: Power3.easeInOut});
    TweenLite.from(mid, 1, {opacity: 0, y: -200, ease: Power3.easeInOut});
    TweenLite.from(right, 1, {opacity: 0, x: 200, ease: Power3.easeInOut});

	}, [])

	return (
    <>
      <div id="Parent">
        <div className="tankSelect">
          <MainNavbar
            linkName="/Login"
            returnName="Logout"
            pageName="Main Menu"
          />
        </div>
        <h1 className="menuheader">Where to Commander?</h1>
        <div className="column menuleft battleRecord" ref={el => left = el}>
          <Replays/>
          <br/>
          <Link to={verifyLink("/TrainingArena")}>
            <button className="mainMenuBtn train">Training</button>
          </Link>
        </div>
        <div className="column menumiddle" ref={el => mid = el}>
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
            <button className="mainMenuBtn editTank">Edit Tank Code</button>
          </Link>
          <div className="divider" />
          <Link to={verifyLink("/BattleArena")}>
            <button className="mainMenuBtn play">Play</button>
          </Link>
        </div>
        <div className="column menuright" ref={el => right = el}>
          <div>
            <LeaderboardMainMenu className="leaderboardTut"/>
          </div>
          <br/>
          <Link to={verifyLink("/Credits")}>
            <button className="mainMenuBtn creditsButton">Credits</button>
          </Link>
        </div>
      </div>
      <JoyRide 
          steps={tourSteps}
          run={run}
          continuous={true} 
          styles={{
            options: {
              zIndex: 1000,
              spotlightShadow: 'blue'
            }
          }}
      />
    </>

	)
}


export default MainMenu;
