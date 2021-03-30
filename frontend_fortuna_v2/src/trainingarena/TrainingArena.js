//@flow strict

import './TrainingArena.css';
import React, { useState, useEffect, useRef } from 'react';
import MainNavbar from '../globalComponents/MainNavbar.js';
import { Link } from 'react-router-dom';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import setReturnToFromBattlegroundLink from '../battleground/setReturnToFromBattlegroundLink.js';
import SelectTank from '../globalComponents/SelectTank.js';
import Tank from '../tanks/Tank.js';
import { getAllUsersTanks } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import TankDisplay from '../tanks/TankDisplay.js';
import getBotTanksAPICall from '../globalComponents/apiCalls/getBotTanksAPICall.js';
import setTanksToFightInBattleground from '../battleground/setTanksToFightInBattleground.js';
import {setTanksToFightInBattleground3v3} from '../battleground/setTanksToFightInBattleground.js';
import setBattlegroundArena from '../battleground/setBattlegroundArena.js';
import getPreferredSelectedTank from '../globalComponents/getPreferredSelectedTank.js';
import getPreferredArena from '../globalComponents/getPreferredArena.js';
import setPreferredArena from '../globalComponents/setPreferredArena.js';
import { toast, ToastContainer } from 'react-toastify';
import type { BattleType } from '../globalComponents/typesAndClasses/BattleType';
import getPreferredBattleType from './getPreferredBattleType.js';
import setPreferredBattleType from './setPreferredBattleType.js';
import JoyRide from 'react-joyride';
import { TweenLite, Power3 } from 'gsap';
import getFirstTimeLoadoutAPICall from "../globalComponents/apiCalls/getFirstTimeLoadoutAPICall";
import setFirstTimeLoadoutAPICall from "../globalComponents/apiCalls/setFirstTimeLoadoutAPICall";
import setFirstTimeTrainingAPICall from "../globalComponents/apiCalls/setFirstTimeTrainingAPICall";
import getFirstTimeTrainingAPICall from "../globalComponents/apiCalls/getFirstTimeTrainingAPICall";


function TrainingArena() {


  const arenaSelect = useRef(null);

  // for gsap
  let leftT = useRef(null);
  let midT = useRef(null);
  let rightT = useRef(null);

  const [selectedTankOne, setSelectedTankOne] = useState(null);
  const [selectedTankTwo, setSelectedTankTwo] = useState(null);
  const [selectedTankThree, setSelectedTankThree] = useState(null);

  const [allTanks, setAllTanks] = useState([]);

  const [botTankOne, setbotTankOne] = useState(null);
  const [botTankTwo, setBotTankTwo] = useState(null);
  const [botTankThree, setBotTankThree] = useState(null);
  const [botTanks, setBotTanks] = useState([]);
  const [battleType, setBattleType] = useState(getPreferredBattleType());

  // for react joyride
  const [run, setRun] = useState(false);
  const [tourSteps, setTourSteps] = useState([
    {
      target: ".leftTank",
      disableBeacon: true,
      content: "Select YOUR tank for training in this slot"
    },
    {
      target: ".taright",
      content: "Then select a separate enemy bot tank",
    },
    {
      target: ".chooseArena",
      content: "Different Arenas have different walls and sizes so test them out!"
    }
  ]);



  useEffect(() => {
    verifyLogin();
    getAllUsersTanks(allTanks => {
      setAllTanks(allTanks);
      setSelectedTankOne(getPreferredSelectedTank(allTanks));
	 document.body.style.backgroundImage = "url('/login_background.gif')"
    })

    getBotTanksAPICall(botTanks => {
      setbotTankOne(botTanks[0]);
      setBotTanks(botTanks);
    })


    TweenLite.from(leftT, 1, {opacity: 0, x: -200, ease: Power3.easeInOut});
    TweenLite.from(midT, 1, {opacity: 0, y: -200, ease: Power3.easeInOut});
    TweenLite.from(rightT, 1, {opacity: 0, x: 200, ease: Power3.easeInOut});


      getFirstTimeTrainingAPICall((res) => {
          console.log("RES: ", res);
          setRun(res);
      })



  }, []);


  useEffect(() =>{
      if(run == true)
      {
          setFirstTimeTrainingAPICall();
      }
  })
  const onClickStartBattle: void = () => {
		const myTankOne: ?Tank = selectedTankOne;
		const myTankTwo: ?Tank = selectedTankTwo;
		const myTankThree: ?Tank = selectedTankThree;
		const _botTankOne: ?Tank = botTankOne;
		const _botTankTwo: ?Tank = botTankTwo;
		const _botTankThree: ?Tank = botTankThree;
		const arenaSelector: HTMLSelectElement=arenaSelect.current;

    if (myTankOne == null && myTankTwo == null && myTankThree == null) {
			toast.error('One of your tanks must be selected!');
			return;
		}
		
    if (_botTankOne == null && _botTankTwo == null && _botTankThree == null) {
			toast.error('One bot tank must be selected!');
			return;
		}

    const selected = arenaSelector.value;

    if (selected === 'DIRT' || selected === 'HEX' || selected === 'CANDEN' || selected === 'LUNAR') {
			setBattlegroundArena(selected);
		}

		setReturnToFromBattlegroundLink('/TrainingArena');

		// NEED TO UPDATE SET 3v3 TANKS TO FIGHT IN BATTLEGROUND
		if (battleType === '1 vs 1') {
			if (myTankOne == null || _botTankOne == null) {
				toast.error('One bot tank and one of your tanks must be selected!');
				return;
			}
			setTanksToFightInBattleground(myTankOne._id, _botTankOne._id);
		}
		else {
			setTanksToFightInBattleground3v3(myTankOne, myTankTwo, myTankThree, _botTankOne, _botTankTwo, _botTankThree);
		}

		window.location.href=verifyLink('/Battleground');
  }

  const onChangeBattleTypeClicked: void = () => {
		const newBattleType = battleType === '1 vs 1'?'3 vs 3':'1 vs 1';
		setPreferredBattleType(newBattleType);
    setBattleType(newBattleType);
  }

  const onChange: void = () => {
    const arenaSelector: HTMLSelectElement=arenaSelect.current;
		const selected = arenaSelector.value;
		if (selected === 'DIRT' || selected === 'HEX' || selected === 'CANDEN' || selected === 'LUNAR') {
			setPreferredArena(selected);
		}
  }

  const divStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  }

  const preferredArena=getPreferredArena(battleType);

  return (
    <div id="Parent" className='background-image'>
      <MainNavbar
        linkName="/Login"
        returnName="Logout"
        pageName="Training Arena"
        //youtubeLinks={["https://www.youtube.com/watch?v=7Tm4GYbsGYw"]}
      />
      <div className="column taleft" ref={el => leftT = el}>
        <h5 style={divStyle}>Choose your Tank, Commander</h5>
        <br/>
        {(battleType === '1 vs 1') ?
          <div className="leftTank">
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
      </div>
      <div className="column tamiddle" ref={el => midT = el}>
        <h5 style={divStyle}>Current Battle Type: {battleType}</h5>
        <button
          className="primarybtn changeType"
          onClick={() => onChangeBattleTypeClicked()}
          style={divStyle}
        >
          Change Battle Type
        </button>
        <br/><br/><br/>
        <h5 style={divStyle}>Arena</h5>
        { battleType === '1 vs 1' ?
          <select
            className="dropdownMenu chooseArena"
            ref={arenaSelect}
            defaultValue={preferredArena}
            onChange={() => onChange()}
          >
            <option value="DIRT">Classic</option>
            <option value="HEX">Hex</option>
          </select>
        :
          <select
            className="dropdownMenu chooseArena"
            ref={arenaSelect}
            defaultValue={preferredArena}
            onChange={() => onChange()}
          >
            <option value="CANDEN">Canden</option>
            <option value="LUNAR">Lunar</option>
          </select>

        }
        <br/><br/><br/>
          <Link to={verifyLink("/Casus")}>
              <button className="primarybtn casusLink" style={divStyle}>Edit Tank Code</button>
          </Link>
          <br/><br/>
        <button
          type="button"
          className="primarybtn startTrain"
          onClick={() => onClickStartBattle()}
          style={divStyle}
        >
          Start Battle
        </button>


      </div>
      <div className="column taright" ref={el => rightT = el}>
        <h5 style={divStyle}>Choose a Training Bot</h5>
        <br/>
        {(battleType === '1 vs 1') ?
          <div>
            <SelectTank
              selectedTank={botTankOne}
              allTanks={botTanks}
              changeSelectedTank={(tank) => setbotTankOne(tank)}
              propogateChangesToCasus={false}
              allowRemoveTank={false}
            />
            {botTankOne == null ? <div className="emptyTankBig"></div> : <TankDisplay tankToDisplay={botTankOne} smallTank={false} />}
          </div> :
          <div className="threeTankDisplay">
            <table>
              <thead>
                <tr>
                  <th>
                    <SelectTank
                      selectedTank={botTankTwo}
                      allTanks={botTanks}
                      changeSelectedTank={(tank) => setBotTankTwo(tank)}
                      propogateChangesToCasus={false}
                      allowRemoveTank={true}
                    />
                  </th>
                  <th>
                    <SelectTank
                      selectedTank={botTankOne}
                      allTanks={botTanks}
                      changeSelectedTank={(tank) => setbotTankOne(tank)}
                      propogateChangesToCasus={false}
                      allowRemoveTank={true}
                    />
                  </th>
                  <th>
                    <SelectTank
                      selectedTank={botTankThree}
                      allTanks={botTanks}
                      changeSelectedTank={(tank) => setBotTankThree(tank)}
                      propogateChangesToCasus={false}
                      allowRemoveTank={true}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {botTankTwo == null ? <div className="emptyTankSmall"></div> : <TankDisplay tankToDisplay={botTankTwo} smallTank={true} />}

                  </td>
                  <td>
                    {botTankOne == null ? <div className="emptyTankSmall"></div> : <TankDisplay tankToDisplay={botTankOne} smallTank={true} />}
                  </td>
                  <td>
                    {botTankThree == null ? <div className="emptyTankSmall"></div> : <TankDisplay tankToDisplay={botTankThree} smallTank={true} />}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div>
      <ToastContainer />
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
    </div>
  )
}

export default TrainingArena
