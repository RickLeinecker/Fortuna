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
import JoyRide from 'react-joyride'

// type Props = {||};

// type State = {|
// 	selectedTankOne: ?Tank,
// 	selectedTankTwo: ?Tank,
// 	selectedTankThree: ?Tank,
// 	allTanks: Array<Tank>,
// 	botTankOne: ?Tank,
// 	botTankTwo: ?Tank,
// 	botTankThree: ?Tank,
// 	botTanks: Array<Tank>,
// 	battleType: BattleType
// |};

function TrainingArena() {

  const arenaSelect = useRef(null);

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
  const [tourSteps, setTourSteps] = useState([
    {
      target: ".taright",
      content: "Choose training opponent",
    },
    {
      target: ".leftTank",
      content: "Choose your tank for training here"
    },
    {
      target: ".changeType",
      content: "Change battle type here"
    },
    {
      target: ".startTrain",
      content: "Start training battle here"
    },
    {
      target: ".chooseArena",
      content: "Choose Arena Type here"
    },
    {
      target: ".casusLink",
      content: "Back to Casus Here"
    }
  ]);

  const [run, setRun] = useState(true);

  useEffect(() => {
    verifyLogin();
    getAllUsersTanks(allTanks => {
      setAllTanks(allTanks);
      setSelectedTankOne(getPreferredSelectedTank(allTanks));
    })

    getBotTanksAPICall(botTanks => {
      setbotTankOne(botTanks[0]);
      setBotTanks(botTanks);
    })
  });

  const onClickStartBattle: void = () => {
		const myTankOne: ?Tank = selectedTankOne;
		const myTankTwo: ?Tank = selectedTankTwo;
		const myTankThree: ?Tank = selectedTankThree;
		const botTankOne: ?Tank = botTankOne;
		const botTankTwo: ?Tank = botTankTwo;
		const botTankThree: ?Tank = botTankThree;
		const arenaSelector: HTMLSelectElement=arenaSelect.current;
		
    if (myTankOne == null && myTankTwo == null && myTankThree == null) {
			toast.error('One of your tanks must be selected!');
			return;
		}
		
    if (botTankOne == null && botTankTwo == null && botTankThree == null) {
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
			if (myTankOne == null || botTankOne == null) {
				toast.error('One bot tank and one of your tanks must be selected!');
				return;
			}
			setTanksToFightInBattleground(myTankOne._id, botTankOne._id);
		}
		else {
			setTanksToFightInBattleground3v3(myTankOne, myTankTwo, myTankThree, botTankOne, botTankTwo, botTankThree);
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

  const preferredArena=getPreferredArena(battleType);

  return (
    <div id="Parent">
      <MainNavbar 
        linkName="/MainMenu" 
        returnName="Back to Main Menu" 
        pageName="Training Arena" 
        youtubeLinks={["https://www.youtube.com/watch?v=7Tm4GYbsGYw"]}
      />
      <div className="column taleft">
        <h5>Choose your Tank, Commander</h5>
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
      <div className="column tamiddle">
        <h5>Current Battle Type: {battleType}</h5>
        <button 
          className="primarybtn changeType" 
          onClick={() => onChangeBattleTypeClicked()}
        >
          Change Battle Type
        </button>
        <br/><br/><br/>
        <h5>Arena</h5>
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
        <button 
          type="button" 
          className="primarybtn startTrain" 
          onClick={() => onClickStartBattle()}
        >
          Start Battle
        </button>
        <br/><br/>
        <Link to={verifyLink("/Casus")}>
          <button className="smallbtn casusLink">Casus</button>
        </Link>
      </div>
      <div className="column taright">
        <h5>Choose a Training Bot</h5>
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