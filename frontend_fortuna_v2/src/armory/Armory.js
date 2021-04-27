//@flow strict

// React
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// CSS
import './Armory.css';
// Components
import MainNavbar from '../globalComponents/MainNavbar.js';
import CreateNewTankPopup from './CreateNewTankPopup.js';
import DeleteTankPopup from './DeleteTankPopup.js';
import SelectTank from '../globalComponents/SelectTank.js';
import SetWagerPopup from './SetWagerPopup.js';
import RenameTankPopup from './RenameTankPopup.js';
import CopyCasusCodePopup from './CopyCasusCodePopup';
import { ToastContainer, toast } from 'react-toastify';
// Functions
import { getComponentPoints, getComponentType } from '../globalComponents/GetInventoryInfo.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import { getAllUsersTanks, getFavoriteTank, updateTank } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import { toTitleCase } from '../globalComponents/Utility.js';
import getPreferredSelectedTank from '../globalComponents/getPreferredSelectedTank.js';
import setPreferredSelectedTank from '../globalComponents/setPreferredSelectedTank.js';
import getFirstTimeLoadoutAPICall from "../globalComponents/apiCalls/getFirstTimeLoadoutAPICall";
import setFirstTimeLoadoutAPICall from "../globalComponents/apiCalls/setFirstTimeLoadoutAPICall";
// Types and Classes
import type { TankComponent } from '../globalComponents/typesAndClasses/TankComponent.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import TankPart from '../tanks/TankPart.js';
import Component from '../globalComponents/typesAndClasses/Component.js';
import Tank from '../tanks/Tank.js';
import Chassis from '../tanks/Chassis.js';
import Gun from '../tanks/Gun.js';
import Scanner from '../tanks/Scanner.js';
import Jammer from '../tanks/Jammer.js';
import Treads from '../tanks/Treads.js';
import setTankForCasus from '../globalComponents/setTankForCasus.js';
import TankDisplay from '../tanks/TankDisplay.js';
import { TweenMax, Power3 } from 'gsap'
import getFirstTimeHomeAPICall from "../globalComponents/apiCalls/getFirstTimeHomeAPICall";
import setFirstTimeHomeAPICall from "../globalComponents/apiCalls/setFirstTimeHomeAPICall";
import JoyRide, {ACTIONS, EVENTS, STATUS} from 'react-joyride'
import Modal from 'react-modal';
import EquipMenu from './EquipMenu';

function Armory() {

	const [selectedTank, setSelectedTank] = useState(null);
	const [allTanks, setAllTanks] = useState([]);
	const [inventory, setInventory] = useState([]);
	const [chassis, setChassis] = useState([]);
	const [weapons, setWeapons] = useState([]);
	const [scanners, setScanners] = useState([]);
	const [scannerAddons, setScannerAddons] = useState([]);
	const [jammers, setJammers] = useState([]);
	const [treads, setTreads] = useState([]);
	const [items, setItems] = useState([]);
	const [componentList, setComponentList] = useState([]);
	const [currentPartIndex, setCurrentPartIndex] = useState(-1);
	const [points, setPoints] = useState(0);
	const [run, setRun] = useState(false);
  
	const [openWeapon1, setOpenWeapon1] = useState(false);
	const [openWeapon2, setOpenWeapon2] = useState(false);
	const [openChassis, setOpenChassis] = useState(false);
	const [openScanners, setOpenScanners] = useState(false);
	const [openScannerAddon1, setOpenScannerAddon1] = useState(false);
	const [openScannerAddon2, setOpenScannerAddon2] = useState(false);
	const [openJammers, setOpenJammers] = useState(false);
	const [openTreads, setOpenTreads] = useState(false);
	const [openItem1, setOpenItem1] = useState(false);
	const [openItem2, setOpenItem2] = useState(false);
	const [openItem3, setOpenItem3] = useState(false);

  const openModals = (choice) => {
    switch(choice)
    {
      case 'weapon1':
        setOpenWeapon1(true);
        break;
      case 'weapon2':
		setOpenWeapon2(true);
		break;
      case 'chassis':
        setOpenChassis(true);
        break;
      case 'scanner':
        setOpenScanners(true);
        break;
      case 'scannerAdd1':
        setOpenScannerAddon1(true);
        break;
	  case 'scannerAdd2':
		setOpenScannerAddon2(true);
		break;
      case 'jammer':
        setOpenJammers(true);
        break;
      case 'treads':
        setOpenTreads(true);
        break;
      case 'item1':
        setOpenItem1(true);
        break;
      case 'item2':
		setOpenItem2(true);
		break;
	  case 'item3':
		setOpenItem3(true);
		break;
      default:
        break;
    }
  }

  const closeModals = (choice) => {
    switch(choice)
    {
      case 'weapon1':
        setOpenWeapon1(false);
        break;
	  case 'weapon2':
		setOpenWeapon2(false);
		break;
      case 'chassis':
        setOpenChassis(false);
        break;
      case 'scanner':
        setOpenScanners(false);
        break;
      case 'scannerAdd1':
        setOpenScannerAddon1(false);
        break;
	  case 'scannerAdd2':
		setOpenScannerAddon2(false);
		break;
      case 'jammer':
        setOpenJammers(false);
        break;
      case 'treads':
        setOpenTreads(false);
        break;
      case 'item1':
        setOpenItem1(false);
        break;
      case 'item2':
		setOpenItem2(false);
		break;
	  case 'item3':
		setOpenItem3(false);
		break;
      default:
        break;
    }
  }


	let SetWagerPopupRef = useRef(null);
	let navbarRef = useRef(null);
	const [tourSteps, setTourSteps] = useState([
		{
			target: ".armoryleft",
			disableBeacon: true,
			content: "Enter Casus for your currently equipped Tank, import code from another tank, or create and edit new tanks to add variety to your arsenal ",

		},
		{
			target: ".armoryright",
			content:
				"To balance battles, you are allowed a maximum of 10 Equipment Points. Purchase equipment from the Marketplace to discover their point costs and pros and cons!"
		}
	])

	let armleft = useRef(null);
	let armMid = useRef(null);
	let armright = useRef(null);

	useEffect(() => {
		verifyLogin();
		// Functions to get all user tanks and user inventory.
		getTanks();
		getUserInventory();

		 TweenMax.from(armMid, 1, {opacity: 0, y: -200, ease: Power3.easeInOut});


		getFirstTimeLoadoutAPICall((res) => {
			console.log("RES: ", res);
			setRun(res);
			if(res == true)
			{
				setFirstTimeLoadoutAPICall();

			}
		})



	}, [])


	useEffect(() => {
	// Handles initializing points when the page is first loaded or when a new tank is selected.
		//const initPoints: void = () => {  //Removed bc it stopped the points from being updated

		if (selectedTank == null)
			return;

		const tank: Tank = selectedTank;
		let newPoints: number = 0;

		for (let i = 0; i < 11; i++)
		{
			newPoints = newPoints + getComponentPoints(tank.parts[i].name);
		}

		setPoints(newPoints);


		//}
	}, [allTanks, selectedTank])

	// Gets all user tanks and sets them to the state.
	const getTanks = () => {
		getAllUsersTanks(allTanks => {
			// Always set the default selected tank to the newest tank.
			const newSelectedTank = getPreferredSelectedTank(allTanks);
			setTankForCasus(newSelectedTank._id);
			setPreferredSelectedTank(newSelectedTank);
			// Update the state, and then run initPoints after the state has been set.
			setAllTanks(allTanks);
			setSelectedTank(newSelectedTank);
		})
	}

	// Gets all of the user's inventory.
	const getUserInventory: void = () => {
		getUserAPICall(user => {
			setInventory(user.inventory);
			setChassis(user.inventory.filter(component => getComponentType(component.componentName) === 'chassis'))
			setWeapons(user.inventory.filter(component => getComponentType(component.componentName) === 'weapon'))
			setScanners(user.inventory.filter(component => getComponentType(component.componentName) === 'scanner'))
			setScannerAddons(user.inventory.filter(component => getComponentType(component.componentName) === 'scannerAddon'))
			setJammers(user.inventory.filter(component => getComponentType(component.componentName) === 'jammer'))
			setTreads(user.inventory.filter(component => getComponentType(component.componentName) === 'treads'))
			setItems(user.inventory.filter(component => getComponentType(component.componentName) === 'item'))
		})
	}

	// Find the tank via its id and set it to the selectedTank and its id in a Cookie for Casus.
	// Also initializes the points for the new tank.
	const changeSelectedTank: void = (newTank: ?Tank) => {
		if (newTank === null)
		{
			toast.error('New Tank does not exist!')
			return;
		}

		setSelectedTank(newTank);
		setTankForCasus(newTank._id);
	}

	// Function that will save the selectedTank and update the user's inventory.
	const saveTank: void = () => {
		if (selectedTank === null)
			throw new Error('Tried to save selected tank null!');

		updateTank(selectedTank, () => {
			getUserInventory();
		})
	}

	// When RenameTankPopup renames a tank, update the selected tank.
	// Also, if the tank is the favorited tank, update the the favorited tank too.
	const renameTank: void = (tank: Tank) => {
		setSelectedTank(tank);

		getFavoriteTank(favTank => {
			if (favTank != null && tank._id === favTank._id) {
				SetWagerPopupRef.updateWagerTankName(tank.tankName);
			}
		})

		window.location.reload(false);
	}

	// Checks the other items the tank has equipped in order to prevent two C4, nitro repair, etc.
	const checkItems: boolean = (newComponent: TankComponent) => {
		// Check if the new component is already in other slots, and that it is not a mine.
		if (selectedTank == null)
			return false;

		if (
			((newComponent === selectedTank.parts[10].name) ||
			(newComponent === selectedTank.parts[9].name) ||
			(newComponent === selectedTank.parts[8].name)) &&
			newComponent !== 'mine'
			) {
				return true;
			}
			else {
				return false;
			}
	}




	// Ensure that the new point value doesn't go over the limit.
	const checkPoints: boolean = (newComponent: TankComponent, oldPartIndex: number) => {
		const tank = selectedTank;

		if (tank == null)
			return false;
		// Check the items to ensure that you don't have duplicate items (besides mine).
		if (checkItems(newComponent))
			return true;

		return (points + getComponentPoints(newComponent) - getComponentPoints(tank.parts[oldPartIndex].name) > 10) ? true : false;
	}

	// Update the points in the state.
	// Since the options that are too many points are disabled, no range checking is necessary.
	const updatePoints: void = (newComponent: TankComponent, oldComponent?: TankComponent) => {
		// Check if there is an old component that is being removed.
		let newPoints: number = 0;

		if (oldComponent == null)
		{
			newPoints = points + getComponentPoints(newComponent);
		}
		else
		{
			newPoints = points + getComponentPoints(newComponent) - getComponentPoints(oldComponent);
		}

		setPoints(newPoints);
	}

	// Updates the selected tank's components and their inventory.
	const updateComponent: void = (component: TankComponent, partIndex: number) => {
		if (selectedTank == null)
			return;

		// Setup a new tank that will be updated and set to the selected tank.
		const updatedTank: Tank = selectedTank;
		// Find the component's type and setup new component accordingly.
		let newComponent: TankPart = new TankPart(component);

		switch(partIndex) {
			case 0:
				newComponent = new Chassis(component);
				updatedTank.chassis = newComponent;
				break;
			case 1:
				newComponent = new Gun(component, false);
				updatedTank.mainGun = newComponent;
				break;
			case 2:
				newComponent = new Gun(component, true);
				updatedTank.secondaryGun = newComponent;
				break;
			case 3:
				newComponent = new Scanner(
					component,
					(updatedTank.scannerAddonOne.name === 'itemScanner' || updatedTank.scannerAddonTwo.name === 'itemScanner') ? true : false,
					(updatedTank.scannerAddonOne.name === 'antiJammerScanner' || updatedTank.scannerAddonTwo.name === 'antiJammerScanner') ? true : false,
				);
				updatedTank.scanner = newComponent;
				break;
			case 4:
				newComponent = new TankPart(component);
				updatedTank.scannerAddonOne = newComponent;
				break;
			case 5:
				newComponent = new TankPart(component);
				updatedTank.scannerAddonTwo = newComponent;
				break;
			case 6:
				newComponent = new Jammer(component);
				updatedTank.jammer = newComponent;
				break;
			case 7:
				newComponent = new Treads(component);
				updatedTank.treads = newComponent;
				break;
			case 8:
				newComponent = new TankPart(component);
				updatedTank.itemOne = newComponent;
				break;
			case 9:
				newComponent = new TankPart(component);
				updatedTank.itemTwo = newComponent;
				break;
			case 10:
				newComponent = new TankPart(component);
				updatedTank.itemThree = newComponent;
				break;
			default:
				break;
		}

		//if the part index was a scanner add-on, we have to rebuild the scanner
		if (partIndex === 4 || partIndex === 5)
		{
			const scannerType = selectedTank.scanner.name;
			const newScanner=new Scanner(
					scannerType,
					(updatedTank.scannerAddonOne.name === 'itemScanner' || updatedTank.scannerAddonTwo.name === 'itemScanner') ? true : false,
					(updatedTank.scannerAddonOne.name === 'antiJammerScanner' || updatedTank.scannerAddonTwo.name === 'antiJammerScanner') ? true : false,
				);
			updatedTank.scanner = newScanner;
		}

		// Update the component, points, and parts array.
		updatePoints(newComponent.name, updatedTank.parts[partIndex].name);
		updatedTank.parts[partIndex] = newComponent;
		// Reset component list to provide user feedback.
		setSelectedTank(updatedTank);
		setComponentList([]);
		setCurrentPartIndex(-1);
		// Save the tank.
		saveTank();

	}

  const divStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  }

  const divStyle2 = {
    color: "#aa00ff",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  }

	const pointStyle = {
		color: "white",
		position:"relative",
		bottom:"3px",
		marginBottom:"50px",
		font:"1px"
	}

  const divStyle3 = {
    color: "#04CCFF",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  }

  const tankOptions = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    position: "relative",
    right: "160px"
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
      backgroundColor: "rgba(0,0,0,.5)",
      borderStyle: "solid",
      maxHeight: "100vh"
    },
    overlay:{
    	backgroundColor: "rgba(0,0,0,.5)"
	}
  }

	const handleJoyrideCallback = (data) => {
		const { status, type } = data;
		const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
		if (finishedStatuses.includes(status)) {
			setRun(false);
		}}

	const enableJoyride =  ()  => {
		let test = true
		setRun(test)
	}
	return (
		<div id="Parent" className='background-image-armory' data-testid="armoryRoot">
      <br/>
			<MainNavbar
				linkName="/Login"
				returnName="Logout"
				pageName="Armory"
				ref={navbarRef}
				//youtubeLinks={[
				//	'https://www.youtube.com/watch?v=kEClhrMWogY',
				//	'https://www.youtube.com/watch?v=1nnY9wlLOYU'
				//]}
			/>
			<div className="navbar" data-testid="armNav">
				<div className="navhelp">
					<button className="navbtn" onClick={()=>enableJoyride()} >Need Help?</button>
				</div>

			</div>

			<div className="column armoryleft" title="armLeft">
				<br/><br/>
				<label className="casusFont" style={divStyle}>Casus</label>
				<br/>
				<Link to={verifyLink("/Casus")}>
					<button className="primarybtn" style={divStyle}>Edit Tank Code</button>
				</Link>
				<br/><br/>
				{selectedTank==null?<div></div>:
					<CopyCasusCodePopup
						selectedTank={selectedTank}
						usersTanks={allTanks}
					/>
				}
				<br/><br/><br/><br/>
				<h5 className="font" style={tankOptions}>Tank Options</h5>
				<div className="row rowPadding">
					{selectedTank==null?<div></div>:
						<RenameTankPopup
							tank={selectedTank}
							renameTank={renameTank}
						/>
					}&emsp;

					<CreateNewTankPopup
						chassis={chassis}
						treads={treads}
					/><br/>&emsp;

					{selectedTank==null?<div></div>:

						<DeleteTankPopup
							tank={selectedTank}
						/>
					}
				</div>
				<br/><br/>

			</div>
			<div className="column armorymiddle" ref={el => armMid = el} data-testid="armMid">

				<h4 className="font" style={divStyle}>Currently Modifying:</h4>
				{selectedTank==null?<div></div>:
					<SelectTank
						selectedTank={selectedTank}
						allTanks={allTanks}
						changeSelectedTank={(tank) => changeSelectedTank(tank)}
						propogateChangesToCasus={true}
						allowRemoveTank={false}
					/>
				}


				{selectedTank==null?<div></div>:
					<TankDisplay tankToDisplay={selectedTank} smallTank={false} />
				}
			</div>
			<div data-testid="armRight">
				{selectedTank==null?<div></div>:
					<div className="column armoryright" style={{position: "relative"}}>
						<h5 className="font" style={divStyle}>{points}/10 Point(s) Used</h5>
						<label className="font" style={divStyle}>Chassis: </label>
						<button
							className={(currentPartIndex === 0) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(chassis); setCurrentPartIndex(0); setOpenChassis(true)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.chassis.name)}
						</button>

						<h7 style={pointStyle}>
							{getComponentPoints(selectedTank.chassis.name)+" Point(s)"}
						</h7>

            <Modal
              isOpen={openChassis}
              style={customStyles}
              contentLabel="chassis"
            >
              <EquipMenu 
                checkPoints={checkPoints}
                updatePoints={updatePoints}
                updateComponent={updateComponent}
                divStyle={divStyle}
                componentList={componentList}
                currentPartIndex={currentPartIndex}
                part='chassis'
                closeModals={closeModals}
              />
              <br/><br/><br/>
              <button style={{width: "20%", position: "relative", left: "38%"}} className="marketBtn" onClick={() => closeModals('chassis')}>Close</button>
            </Modal>
						<br/>
						<br/>

						<label className="font" style={divStyle}>Main Gun: </label>
						<button
							className={(currentPartIndex === 1) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(weapons); setCurrentPartIndex(1); setOpenWeapon1(true)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.mainGun.name)}
						</button>
						<h7 style={pointStyle}>
							{getComponentPoints(selectedTank.mainGun.name)+" Point(s)"}
						</h7>
            <Modal
              isOpen={openWeapon1}
              style={customStyles}
              contentLabel="weapon1"
            >
              <EquipMenu 
                checkPoints={checkPoints}
                updatePoints={updatePoints}
                updateComponent={updateComponent}
                divStyle={divStyle}
                componentList={componentList}
                currentPartIndex={currentPartIndex}
                part='weapon1'
                closeModals={closeModals}
              />
              <br/><br/>
              <button style={{width: "20%", position: "relative", left: "38%"}} className="marketBtn" onClick={() => closeModals('weapon1')}>Close</button>
            </Modal>
						<br/>
						<label className="font" style={divStyle}>Secondary Gun: </label>
						<button
							className={(currentPartIndex === 2) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(weapons); setCurrentPartIndex(2); setOpenWeapon2(true)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.secondaryGun.name)}
						</button>
						<h7 style={pointStyle}>
							{getComponentPoints(selectedTank.secondaryGun.name)+" Point(s)"}
						</h7>
            <Modal
              isOpen={openWeapon2}
              style={customStyles}
              contentLabel="weapon2"
            >
              <EquipMenu 
                checkPoints={checkPoints}
                updatePoints={updatePoints}
                updateComponent={updateComponent}
                divStyle={divStyle}
                componentList={componentList}
                currentPartIndex={currentPartIndex}
                part='weapon2'
                closeModals={closeModals}
              />
              <br/><br/><br/>
              <button style={{width: "20%", position: "relative", left: "38%"}} className="marketBtn" onClick={() => closeModals('weapon2')}>Close</button>
            </Modal>
						<br/>
						<br/>

						<label className="font" style={divStyle}>Scanners: </label>
						<button
							className={(currentPartIndex === 3) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(scanners); setCurrentPartIndex(3); setOpenScanners(true)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.scanner.name)}
						</button>
						<h7 style={pointStyle}>
							{getComponentPoints(selectedTank.scanner.name)+" Point(s)"}
						</h7>
            <Modal
              isOpen={openScanners}
              style={customStyles}
              contentLabel="scanner"
            >
              <EquipMenu 
                checkPoints={checkPoints}
                updatePoints={updatePoints}
                updateComponent={updateComponent}
                divStyle={divStyle}
                componentList={componentList}
                currentPartIndex={currentPartIndex}
                part='scanner'
                closeModals={closeModals}
              />
              <br/><br/>
              <button style={{width: "20%", position: "relative", left: "38%"}} className="marketBtn" onClick={() => closeModals('scanner')}>Close</button>
            </Modal>
						<br/>
						<label className="font" style={divStyle}>Scanner Addon: </label>
						<button
							className={(currentPartIndex === 4) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(scannerAddons); setCurrentPartIndex(4); setOpenScannerAddon1(true)}}
							disabled={(selectedTank.scanner.name === 'empty') ? true : false}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.scannerAddonOne.name)}
						</button>
						<h7 style={pointStyle}>
							{getComponentPoints(selectedTank.scannerAddonOne.name)+" Point(s)"}
						</h7>
            <Modal
              isOpen={openScannerAddon1}
              style={customStyles}
              contentLabel="scannerAdd1"
            >
              <EquipMenu 
                checkPoints={checkPoints}
                updatePoints={updatePoints}
                updateComponent={updateComponent}
                divStyle={divStyle}
                componentList={componentList}
                currentPartIndex={currentPartIndex}
                part='scannerAdd1'
                closeModals={closeModals}
              />
              <br/><br/>
              <button style={{width: "20%", position: "relative", left: "38%"}} className="marketBtn" onClick={() => closeModals('scannerAdd1')}>Close</button>
            </Modal>
						<br/>
						<label className="font" style={divStyle}>Scanner Addon: </label>
						<button
							className={(currentPartIndex === 5) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(scannerAddons); setCurrentPartIndex(5); setOpenScannerAddon2(true)}}
							disabled={(selectedTank.scanner.name === 'empty') ? true : false}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.scannerAddonTwo.name)}
						</button>
						<h7 style={pointStyle}>
							{getComponentPoints(selectedTank.scannerAddonTwo.name)+" Point(s)"}
						</h7>
            <Modal
              isOpen={openScannerAddon2}
              style={customStyles}
              contentLabel="scannerAdd2"
            >
              <EquipMenu 
                checkPoints={checkPoints}
                updatePoints={updatePoints}
                updateComponent={updateComponent}
                divStyle={divStyle}
                componentList={componentList}
                currentPartIndex={currentPartIndex}
                part='scannerAdd2'
                closeModals={closeModals}
              />
              <br/><br/>
              <button style={{width: "20%", position: "relative", left: "38%"}} className="marketBtn" onClick={() => closeModals('scannerAdd2')}>Close</button>
            </Modal>
						<br/>
						<br/>
						<label className="font" style={divStyle}>Jammers: </label>
						<button
							className={(currentPartIndex === 6) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(jammers); setCurrentPartIndex(6); setOpenJammers(true);}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.jammer.name)}
						</button>
						<h7 style={pointStyle}>
							{getComponentPoints(selectedTank.jammer.name)+" Point(s)"}
						</h7>
            <Modal
              isOpen={openJammers}
              style={customStyles}
              contentLabel="jammer"
            >
              <EquipMenu 
                checkPoints={checkPoints}
                updatePoints={updatePoints}
                updateComponent={updateComponent}
                divStyle={divStyle}
                componentList={componentList}
                currentPartIndex={currentPartIndex}
                part='jammer'
                closeModals={closeModals}
              />
              <br/><br/>
              <button style={{width: "20%", position: "relative", left: "38%"}} className="marketBtn" onClick={() => closeModals('jammer')}>Close</button>
            </Modal>
						<br/>
						<br/>

						<label className="font" style={divStyle}>Treads: </label>
						<button
							className={(currentPartIndex === 7) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(treads); setCurrentPartIndex(7); setOpenTreads(true)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.treads.name)}
						</button>
						<h7 style={pointStyle}>
							{getComponentPoints(selectedTank.treads.name)+" Point(s)"}
						</h7>
            <Modal
              isOpen={openTreads}
              style={customStyles}
              contentLabel="treads"
            >
              <EquipMenu 
                checkPoints={checkPoints}
                updatePoints={updatePoints}
                updateComponent={updateComponent}
                divStyle={divStyle}
                componentList={componentList}
                currentPartIndex={currentPartIndex}
                part='treads'
                closeModals={closeModals}
              />
              <br/><br/>
              <button style={{width: "20%", position: "relative", left: "38%"}} className="marketBtn" onClick={() => closeModals('treads')}>Close</button>
            </Modal>
						<br/>
						<br/>

						<label className="font" style={divStyle}>Item: </label>
						<button
							className={(currentPartIndex === 8) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(items); setCurrentPartIndex(8); setOpenItem1(true)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.itemOne.name)}
						</button>
						<h7 style={pointStyle}>
							{getComponentPoints(selectedTank.itemOne.name)+" Point(s)"}
						</h7>
            <Modal
              isOpen={openItem1}
              style={customStyles}
              contentLabel="item1"
            >
              <EquipMenu 
                checkPoints={checkPoints}
                updatePoints={updatePoints}
                updateComponent={updateComponent}
                divStyle={divStyle}
                componentList={componentList}
                currentPartIndex={currentPartIndex}
                part='item1'
                closeModals={closeModals}
              />
              <br/><br/>
              <button style={{width: "20%", position: "relative", left: "38%"}} className="marketBtn" onClick={() => closeModals('item1')}>Close</button>
            </Modal>
						<br/>
						<label className="font" style={divStyle}>Item: </label>
						<button
							className={(currentPartIndex === 9) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(items); setCurrentPartIndex(9); setOpenItem2(true)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.itemTwo.name)}
						</button>
						<h7 style={pointStyle}>
							{getComponentPoints(selectedTank.itemTwo.name)+" Point(s)"}
						</h7>
            <Modal
              isOpen={openItem2}
              style={customStyles}
              contentLabel="item2"
            >
              <EquipMenu 
                checkPoints={checkPoints}
                updatePoints={updatePoints}
                updateComponent={updateComponent}
                divStyle={divStyle}
                componentList={componentList}
                currentPartIndex={currentPartIndex}
                part='item2'
                closeModals={closeModals}
              />
              <br/><br/>
              <button style={{width: "20%", position: "relative", left: "38%"}} className="marketBtn" onClick={() => closeModals('item2')}>Close</button>
            </Modal>
						<br/>
						<label className="font" style={divStyle}>Item: </label>
						<button
							className={(currentPartIndex === 10) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(items); setCurrentPartIndex(10); setOpenItem3(true)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.itemThree.name)}
						</button>
						<h7 style={pointStyle}>
							{getComponentPoints(selectedTank.itemThree.name)+" Point(s)"}
						</h7>
            <Modal
              isOpen={openItem3}
              style={customStyles}
              contentLabel="item3"
            >
              <EquipMenu 
                checkPoints={checkPoints}
                updatePoints={updatePoints}
                updateComponent={updateComponent}
                divStyle={divStyle}
                componentList={componentList}
                currentPartIndex={currentPartIndex}
                part='item3'
                closeModals={closeModals}
              />
              <br/><br/>
              <button style={{width: "20%", position: "relative", left: "38%"}} className="marketBtn" onClick={() => closeModals('item3')}>Close</button>
            </Modal>
					</div>
				}
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
            arrowColor: '#414a4',
            backgroundColor: '#e3ffeb',
            overlayColor: 'rgba(79, 26, 0, 0.4)',
            primaryColor: '#414a4c',
            textColor: '#414a4c',
            width: 500,
            zIndex: 1000,
          }
        }}
			/>
		</div>
	);
}


export default Armory
