//@flow strict

import './MainMenu.css';
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from '../globalComponents/MainNavbar.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import Replays from "../battlearena/Replays";
import LeaderboardMainMenu from "./LeaderboardMainMenu";
import Leaderboard from '../globalComponents/Leaderboard.js';
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
import JoyRide, {ACTIONS, EVENTS, STATUS} from 'react-joyride'
import { TweenMax, TweenLite, Power3 } from 'gsap'
import { Container, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import Modal from 'react-modal';


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
  const [run, setRun] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tourSteps, setTourSteps] = useState([
      {
        target: ".background-image",
        disableBeacon: true,
        content: "Welcome to Fortuna! Tutorials like this will only come up your first time visiting important pages but feel free to skip them!"
      },
      {
          target: ".navhelp",
          content: "Click here to bring back the tutorial for a page anytime."
      },
      {
        target: ".tankSelect",
        content: "The navbar will serve as your main navigation through the Fortuna system."
      },
      {
        target: ".menuleft",
        content: "Your Battle Record will fill up with past matches so you can watch them and learn from past mistakes or victories!"
      },
      {
        target: '.training',
        content: "The Training Arena is a place to test out your tanks against bots."
      },
      {
        target: ".select",
        content: "Here is your currently selected tank. You have been rewarded with six starter tanks with NO code. Please go to the Marketplace after this to inject their corresponding code."
      },
      {
        target: ".menuright",
        content: "This Leaderboard shows you the current Top Ten most powerful Champions in the entire land of Vessint, the dystopian world we currently reside in."
      },
      {
        target: ".credits",
        content: "Look at the Credits to honor those who put their blood, sweat, and tears into this game."
      },
      {
          target: ".editTank",
          content: "One of the most important features of this game is creating and editing your tanks code in Casus, our custom code editor."
      },
      {
          target: ".play",
          content: "Play against tanks that other players have wagered and programmed."
      }
      ,
      {
          target: ".tankSelect",
          content: "Don't forget to get some starter code from the Marketplace first!"

      }
    ])


    let left = useRef(null);
    let mid = useRef(null);
    let right = useRef(null);


	useEffect(() =>
    {


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
            if(res === true)
            {
                setFirstTimeHomeAPICall();

            }
		})



    TweenMax.from(left, 1, {opacity: 0, y: 200, ease: Power3.easeInOut});
    TweenMax.from(mid, 1, {opacity: 0, y: -200, ease: Power3.easeInOut});
    TweenMax.from(right, 1, {opacity: 0, y: 200, ease: Power3.easeInOut});

	}, [])


  const style =
  {
     position: "relative",
     left: "50px"
  }

  const openCredits = () => {
    setModalOpen(true);
  }

  const closeCredits = () => {
    setModalOpen(false);
  }

  const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '40%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      backgroundColor: "#012074",
      borderStyle: "solid",
      maxHeight: "100vh"
    },
    overlay:{
      backgroundColor: "rgba(0,0,0,.5)"
    }
  }


  const handleJoyrideCallback = (data) =>
  {
    const { status, type } = data;
      const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
      if (finishedStatuses.includes(status))
      {
          setRun(false);
      }
  }

  //enables Joyride if Need Help button is pressed
  const enableJoyride =  ()  => {
     setRun(true)
  }

  const creditsStyle = {
    color: "white"
  }

	return (
    <>
      <div id="Parent" className='background-image'>
        <br/>
        <div className="tankSelect">
          <MainNavbar
            linkName="/Login"
            returnName="Logout"
            pageName="Main Menu"
            enableJoyride={enableJoyride}
          />
            <div className="navbar">
                <div className="navhelp">
                    <button className="navbtn" onClick={()=>enableJoyride()} >Need Help?</button>
                </div>
            </div>
        </div>
        <h1 className="menuheader">How much you in for today?</h1>
          {/*
          <p className="marquee">
              <span>Welcome to the Fortuna Battle Arena! </span>
          </p>
          <p className="marquee">
              <span></span>
          </p>
          <p className="marquee">
              <span>May the Goddess of Fortune lead you to riches today!</span>
          </p>
          <p className="marquee marquee2">
              <span>This is text - This is text - This is text </span>
          </p>
            */}
        <div className="column menuleft battleRecord" ref={el => left = el}>
          <Replays/>
          <br/><br/>
          <Link to={verifyLink("/TrainingArena")}>
            <button className="marketBtn train">Training</button>
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
            <button className="marketBtn editTank">Edit Tank Code</button>
          </Link>
          <div className="divider" />
          <Link to={verifyLink("/BattleArena")}>
            <button className="marketBtn play">Play</button>
          </Link>
        </div>
        <div className="column menuright" ref={el => right = el}>
            <h4 className="infotext">The Hall of Champions</h4>
          <div className= "loginleader" style={style}>
						<Leaderboard />
					</div>
          <br/>
          <button className="marketBtn creditsButton" onClick={() => openCredits()}>Credits</button>
          <Modal
            isOpen={modalOpen}
            style={customStyles}
            contentLabel="Credits Modal"
          >
            <h5 style={creditsStyle}>
              <strong>Developers version 1:</strong> Jorge Vidal, Baylor Maloney, Adam Blair, Emil Dolorfino, David Harmeyer
              <br/><br/>
              <strong>Developers version 2:</strong> John Cordero, Brittanie Staton, Will Bechtel, Sarinda Samarasinghe
            </h5>
            <br/><br/>
            <h7 style={creditsStyle}>
              Photo Credits:
            </h7>
            <br/>
            <a href="https://www.artstation.com/artwork/GXwZgz" style={creditsStyle}>www.artstation.com</a>
            <br/>
            <a href="https://www.itl.cat/pngfile/big/4-43065_anime-wallpaper-gif-1080p.jpg" style={creditsStyle}>www.itl.cat</a>
            <br/><br/>
            <Button onClick={() => closeCredits()}>Close</Button>
          </Modal>  
        </div>
      </div>
      <JoyRide 
          steps={tourSteps}
          run={run}
          callback={handleJoyrideCallback}
          showSkipButton
          showProgress
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
