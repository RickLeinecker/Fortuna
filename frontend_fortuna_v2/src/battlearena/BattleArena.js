import React, { useEffect, useState, useRef } from 'react'

import './BattleArena.css';
import MainNavbar from '../globalComponents/MainNavbar.js';
import SearchPlayers from './SearchPlayers.js';
import ChallengePlayerPopup from './ChallengePlayerPopup.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import setReturnToFromBattlegroundLink from '../battleground/setReturnToFromBattlegroundLink.js';
import SelectTank from '../globalComponents/SelectTank.js';
import Tank from '../tanks/Tank.js';
import { getAllUsersTanks } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import TankDisplay from '../tanks/TankDisplay.js';
import User from '../globalComponents/typesAndClasses/User.js';
import { prepare3v3APICall, prepare1v1APICall, prepare1v1BotAPICall, prepare3v3BotAPICall } from '../globalComponents/apiCalls/prepareMatchAPICall.js';
import { setMatchForBattleground } from '../battleground/setTanksToFightInBattleground.js';
import getReplayListAPICall from '../globalComponents/apiCalls/getReplayListAPICall.js';
import { ToastContainer , toast } from 'react-toastify';
import setBattlegroundArena from '../battleground/setBattlegroundArena.js';
import getPreferredSelectedTank from '../globalComponents/getPreferredSelectedTank.js';
import type { BattleType } from '../globalComponents/typesAndClasses/BattleType.js';
import setFirstTimePlayAPICall from "../globalComponents/apiCalls/setFirstTimePlayAPICall";
import getFirstTimePlayAPICall from "../globalComponents/apiCalls/getFirstTimePlayAPICall";
import JoyRide, {ACTIONS, EVENTS, STATUS} from "react-joyride";

import getMasterAccountId from '../globalComponents/getMasterAccountId.js';
import { getMasterTanks } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import SetWagerPopup from "../armory/SetWagerPopup";
import getLoginToken from '../globalComponents/getLoginToken';
import { TweenMax, Power3 } from 'gsap';

function BattleArena() {

  const [selectedTankOne, setSelectedTankOne] = useState(null);
  const [selectedTankTwo, setSelectedTankTwo] = useState(null);
  const [selectedTankThree, setSelectedTankThree] = useState(null);
  const [allTanks, setAllTanks] = useState([]);
  const [userElo, setUserElo] = useState(0);
  const [battleType, setBattleType] = useState('1 vs 1');
  const [run, setRun] = useState(false);
  const [botTanks, setBotTanks] = useState(null);
  const [tourSteps, setTourSteps] = useState([
    {
      target: ".battletype",
      disableBeacon: true,
      content: "Change between 1 v 1, or 3 v 3",
    },
    {
      target: ".search",
      content: "Search for a specific player and challenge any tanks they are wagering"
    },
    {
      target: ".wager",
      content: "The minimum wager is $50 and you need to have a tank wagered for others to battle against you!"
    },
    {
      target: ".quickplay",
      content: "Quickly find a match with someone's wagered tank in your ELO rank"
    }
  ]);

  let navbarRef = useRef(null);
  let wagerRef = useRef(null);
  let left = useRef(null);
  let mid = useRef(null);
  let right = useRef(null);

  useEffect(() => {
    verifyLogin();
    getAllUsersTanks(allTanks => {
      setAllTanks(allTanks);
      setSelectedTankOne(getPreferredSelectedTank(allTanks));
    })

    getMasterTanks(tanks => {
      setBotTanks(tanks);
    });

    getReplayListAPICall(() => {});

    getFirstTimePlayAPICall((res) => {
      setRun(res);

      if (res === true)
      {
        setFirstTimePlayAPICall();
      }
    })

    TweenMax.from(mid, 1, {opacity: 0, y: -200, ease: Power3.easeInOut});

  },[])

  const onChallengePlayer = (player) => {
    setReturnToFromBattlegroundLink('/BattleArena');

    if (player == null)
    {
      toast.error('No player found.');
      return;
    }

    const myTankOne = selectedTankOne;
    const myTankTwo = selectedTankTwo;
    const myTankThree = selectedTankThree;

    if (myTankOne == null && myTankTwo == null & myTankThree == null)
    {
      toast.error('No selected tank for challenging!');
      return;
    }

    if (battleType === '1 vs 1' && player.userId === getMasterAccountId())
    {
      if (myTankOne == null)
      {
        toast.error('No tank selected!');
        return;
      }

      prepare1v1BotAPICall(myTankOne, player, botTanks[Math.floor(Math.random() * botTanks.length)], (matchId) => {
        console.log('Successfully prepared match with id: '+matchId);
        setMatchForBattleground(matchId);
        window.location.href=verifyLink('/Battleground');
      });
    }
    else if (battleType === '1 vs 1')
    {
      if (myTankOne == null)
      {
        toast.error('No tank selected!');
        return;
      }

      prepare1v1APICall(myTankOne, player, (matchId) => {
        console.log('Successfully prepared match with id: '+matchId);
        setMatchForBattleground(matchId);
        window.location.href=verifyLink('/Battleground');
      });
    }
    else if (battleType === '3 vs 3' && player.userId === getMasterAccountId())
    {
			const botOne = botTanks[Math.floor(Math.random() * botTanks.length)];
			const botTwo = botTanks[Math.floor(Math.random() * botTanks.length)];
			const botThree = botTanks[Math.floor(Math.random() * botTanks.length)];

      prepare3v3BotAPICall(myTankOne, myTankTwo, myTankThree, player, botOne, botTwo, botThree, (matchId) => {
        console.log('Successfully prepared match with id: '+matchId);
				setMatchForBattleground(matchId);
				window.location.href=verifyLink('/Battleground');
      })
    }
    else
    {
			prepare3v3APICall(myTankOne, myTankTwo, myTankThree, player, matchId => {
				console.log('Successfully prepared match with id: '+matchId);
				setMatchForBattleground(matchId);
				window.location.href=verifyLink('/Battleground');
			});
    }
  }

  const divStyle = {
      fontFamily: '"Press Start 2P", cursive',
    color: "white",
    textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
  }

  const buttonDivStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  }

  const style = {
    position: "relative",
    left: "50px"
  }

  const onWagerUpdate = () => {
    const navbar = navbarRef.current;
    navbar.reloadNavbar();
  }

  const handleJoyrideCallback = (data) => {
		const { status, type } = data;
		const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
		if (finishedStatuses.includes(status)) {
			setRun(false)
		}}

		const enableJoyride =  (): void  => {
		setRun(true)
	}


  return (
		<div id="Parent" className='background-image' title="arenaRoot">
     		 <br/>
			<MainNavbar
				linkName="/Login"
				returnName="Logout"
				ref={navbarRef}
				pageName="Battle Arena"
				// linkName="/MainMenu"
				// youtubeLinks={["https://www.youtube.com/watch?v=9lGqrj6_X7Y"]}
 			/>
            <div className="navbar">
                <div className="navhelp">
                    <button className="navbtn" onClick={()=>enableJoyride()} >Need Help?</button>
                </div>
            </div>
			<div className="column challenge" ref={el => left = el} title="arenaleft">
				<div className="quickplay">
						<h5 style={divStyle}>Start a Match</h5>
						<ChallengePlayerPopup
							onChallengePlayer={(user) => onChallengePlayer(user)}
							playerChallenged={null}
							battleType={battleType}
						/>
				</div>
				<br/>
				<div className="search">
					<SearchPlayers
						onChallengePlayer={(user) => onChallengePlayer(user)}
						battleType={battleType}
					/>
				</div>
			</div>

			<div className="column battletype" ref={el => mid = el} title="arenaMid">
				<h5 style={divStyle}>Choose your Tank{battleType === '1 vs 1' ? '' : 's'}, Commander</h5>
				<br/>
				{(battleType === '1 vs 1') ?
					<div>
						<SelectTank
							selectedTank={selectedTankOne}
							allTanks={allTanks}
							changeSelectedTank={(tank) => setSelectedTankOne(tank)}
							propogateChangesToCasus={true}
							allowRemoveTank={false}
						/>
						{selectedTankOne == null ? <div className="emptyTankBig"></div> : <TankDisplay tankToDisplay={selectedTankOne} smallTank={false} />}
					</div> :
					<div className="threeTankDisplay">
						<table>
							<thead>
								<tr>
									<th>
										<SelectTank
											selectedTank={selectedTankTwo}
											allTanks={allTanks.filter(tank => tank !== selectedTankOne && tank !== selectedTankThree)}
											changeSelectedTank={(tank) => setSelectedTankTwo(tank)}
											propogateChangesToCasus={false}
											allowRemoveTank={true}
										/>
									</th>
									<th>
										<SelectTank
											selectedTank={selectedTankOne}
											allTanks={allTanks.filter(tank => tank !== selectedTankThree && tank !== selectedTankTwo)}
											changeSelectedTank={(tank) => setSelectedTankOne(tank)}
											propogateChangesToCasus={false}
											allowRemoveTank={true}
										/>
									</th>
									<th>
										<SelectTank
											selectedTank={selectedTankThree}
											allTanks={allTanks.filter(tank => tank !== selectedTankOne && tank !== selectedTankTwo)}
											changeSelectedTank={(tank) => setSelectedTankThree(tank)}
											propogateChangesToCasus={false}
											allowRemoveTank={true}
										/>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										{selectedTankTwo == null ? <div className="emptyTankSmall"></div> : <TankDisplay tankToDisplay={selectedTankTwo} smallTank={true} />}

									</td>
									<td>
										{selectedTankOne == null ? <div className="emptyTankSmall"></div> : <TankDisplay tankToDisplay={selectedTankOne} smallTank={true} />}
									</td>
									<td>
										{selectedTankThree == null ? <div className="emptyTankSmall"></div> : <TankDisplay tankToDisplay={selectedTankThree} smallTank={true} />}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				}
				<h5 style={divStyle}>Current Battle Type: {battleType}</h5>
				<button
					className="primarybtn"
					onClick={(battleType === '1 vs 1') ? () => setBattleType('3 vs 3') : () => setBattleType('1 vs 1')}
                    style={buttonDivStyle}
				>
					Change Battle Type
				</button>
			</div>
			<div className='wager_info' title="arenaRight">
				<h5 style={divStyle} text-align='center'>Wager a Tank</h5>
				<div className="wager">
					<SetWagerPopup
						ref={wagerRef}
						onWagerUpdate={onWagerUpdate}
					/>
				</div>
			</div>
			<ToastContainer />
			<JoyRide
				steps={tourSteps}
				run={run}
				continuous={true}
				callback={handleJoyrideCallback}
				showSkipButton
				showProgress
				styles={{
					options: {
						zIndex: 1000,
						spotlightShadow: 'blue'
					}
				}}
			/>
		</div>
	);
}

export default BattleArena
