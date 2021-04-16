import React, {useEffect, useState} from 'react'

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
import { prepare3v3APICall, prepare1v1APICall } from '../globalComponents/apiCalls/prepareMatchAPICall.js';
import { setMatchForBattleground } from '../battleground/setTanksToFightInBattleground.js';
import getReplayListAPICall from '../globalComponents/apiCalls/getReplayListAPICall.js';
import { ToastContainer , toast } from 'react-toastify';
import setBattlegroundArena from '../battleground/setBattlegroundArena.js';
import getPreferredSelectedTank from '../globalComponents/getPreferredSelectedTank.js';
import type { BattleType } from '../globalComponents/typesAndClasses/BattleType.js';
import setFirstTimePlayAPICall from "../globalComponents/apiCalls/setFirstTimePlayAPICall";
import getFirstTimePlayAPICall from "../globalComponents/apiCalls/getFirstTimePlayAPICall";
import JoyRide from "react-joyride";

import SetWagerPopup from "../armory/SetWagerPopup";

function Battleareanatest() {

  const [selectedTankOne, setSelectedTankOne] = useState(null);
  const [selectedTankTwo, setSelectedTankTwo] = useState(null);
  const [selectedTankThree, setSelectedTankThree] = useState(null);
  const [allTanks, setAllTanks] = useState([]);
  const [userElo, setUserElo] = useState(0);
  const [selectedTankOne, setSelectedTankOne] = useState(null);
  const [selectedTankOne, setSelectedTankOne] = useState(null);
  const [selectedTankOne, setSelectedTankOne] = useState(null);

  return (
    <div>
      
    </div>
  )
}

export default Battleareanatest
