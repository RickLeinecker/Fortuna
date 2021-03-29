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
import { TweenMax, Power3, TweenLite } from 'gsap'

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
	let SetWagerPopupRef = useRef(null);
	let navbarRef = useRef(null);

	let armleft = useRef(null);
	let armMid = useRef(null);
	let armright = useRef(null);

	useEffect(() => {
		verifyLogin();
		// Functions to get all user tanks and user inventory.
		getTanks();
		getUserInventory();

		 TweenLite.from(armleft, 1, {opacity: 0, x: -200, ease: Power3.easeInOut});
		 TweenLite.from(armMid, 1, {opacity: 0, y: -200, ease: Power3.easeInOut});
		 TweenLite.from(armright, 1, {opacity: 0, x: 200, ease: Power3.easeInOut});

	}, [])

	useEffect(() => {
			// Handles initializing points when the page is first loaded or when a new tank is selected.
		const initPoints: void = () => {
			if (selectedTank == null)
				return;

			const tank: Tank = selectedTank;
			let newPoints: number = 0;

			for (let i = 0; i < 11; i++)
			{
				newPoints = newPoints + getComponentPoints(tank.parts[i].name);
			}

			setPoints(newPoints);
		}
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

	const onWagerUpdate: void = () => {
		const navbar = navbarRef;
		navbar.reloadNavbar();
	}

  const divStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  }

  const divStyle2 = {
    color: "#aa00ff",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  }

  const divStyle3 = {
    color: "#04CCFF",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  }
	
	return (
		<div id="Parent" className='background-image-armory'>
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
			<div className="column armoryleft" ref={el => armleft = el}>
				<h4 className="font" style={divStyle}>Selected Tank</h4>
				{selectedTank==null?<div></div>:
					<SelectTank
						selectedTank={selectedTank}
						allTanks={allTanks}
						changeSelectedTank={(tank) => changeSelectedTank(tank)}
						propogateChangesToCasus={true}
						allowRemoveTank={false}
					/>
				}
				<br/><br/>
				<label className="font" style={divStyle}>Edit Code</label>
				<br/>
				<Link to={verifyLink("/Casus")}>
					<button className="primarybtn" style={divStyle3}>Casus</button>
				</Link>
				<br/><br/>
				{selectedTank==null?<div></div>:
					<CopyCasusCodePopup
						selectedTank={selectedTank}
						usersTanks={allTanks}
					/>
				}
				<br/><br/><br/>
				<h5 className="font" style={divStyle}>Tank Options</h5>
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
					/>&emsp;
					{selectedTank==null?<div></div>:
						<DeleteTankPopup
							tank={selectedTank}
						/>
					}
				</div>
				<br/><br/>
				<SetWagerPopup
					ref={SetWagerPopupRef}
					onWagerUpdate={onWagerUpdate}
				/>
			</div>
			<div className="column armorymiddle" ref={el => armMid = el}>
				<h1 className="font" style={divStyle}>{selectedTank?.tankName ?? 'Loading tanks...'}</h1>
				{selectedTank==null?<div></div>:
					<TankDisplay tankToDisplay={selectedTank} smallTank={false} />
				}
				{(currentPartIndex === -1) ?
					<div></div> :
					<div>
						<h4 className="font" style={divStyle}>Component Menu</h4>
						<div className="componentMenu">
							<table>
								<thead>
									<tr>
										<th className="font">Component Name</th>
										<th className="font">Number Owned</th>
										<th className="font">Point Value</th>
									</tr>
								</thead>
								<tbody>
									{(componentList == null) ? <tr></tr> : componentList.map(({componentName, numberOwned}, index) => (
										<tr key={index}>
											<td align="left">
												<button
													className="componentMenuBtn"
													onClick={() => updateComponent(componentName, currentPartIndex)}
													disabled={checkPoints(componentName, currentPartIndex)}
												>
													{toTitleCase(componentName)}
												</button>
											</td>
											<td>{numberOwned}</td>
											<td>{getComponentPoints(componentName)}</td>
										</tr>
									))}
									{(currentPartIndex === 0 || currentPartIndex === 7) ?
										<tr></tr> :
										<tr>
											<td align="left">
												<button
													className="componentMenuBtn font"
													onClick={() => updateComponent('empty', currentPartIndex)}
												>
													Empty
												</button>
											</td>
											<td></td><td></td>
										</tr>
									}
								</tbody>
							</table>
						</div>
					</div>
				}
			</div>
			<div ref={el => armright = el}>
				{selectedTank==null?<div></div>:
					<div className="column armoryright" style={{position: "relative"}}>
						<h5 className="font" style={divStyle}>{points}/10 Points Used</h5>
						<label className="font" style={divStyle}>Chassis: </label>
						<button
							className={(currentPartIndex === 0) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(chassis); setCurrentPartIndex(0);}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.chassis.name)}
						</button>
						<br/>
						<br/>

						<label className="font" style={divStyle}>Main Gun: </label>
						<button
							className={(currentPartIndex === 1) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(weapons); setCurrentPartIndex(1)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.mainGun.name)}
						</button>
						<br/>
						<label className="font" style={divStyle}>Secondary Gun: </label>
						<button
							className={(currentPartIndex === 2) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(weapons); setCurrentPartIndex(2)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.secondaryGun.name)}
						</button>
						<br/>
						<br/>

						<label className="font" style={divStyle}>Scanners: </label>
						<button
							className={(currentPartIndex === 3) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(scanners); setCurrentPartIndex(3)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.scanner.name)}
						</button>
						<br/>
						<label className="font" style={divStyle}>Scanner Addon: </label>
						<button
							className={(currentPartIndex === 4) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(scannerAddons); setCurrentPartIndex(4)}}
							disabled={(selectedTank.scanner.name === 'empty') ? true : false}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.scannerAddonOne.name)}
						</button>
						<br/>
						<label className="font" style={divStyle}>Scanner Addon: </label>
						<button
							className={(currentPartIndex === 5) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(scannerAddons); setCurrentPartIndex(5)}}
							disabled={(selectedTank.scanner.name === 'empty') ? true : false}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.scannerAddonTwo.name)}
						</button>
						<br/>
						<br/>

						<label className="font" style={divStyle}>Jammers: </label>
						<button
							className={(currentPartIndex === 6) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(jammers); setCurrentPartIndex(6)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.jammer.name)}
						</button>
						<br/>
						<br/>

						<label className="font" style={divStyle}>Treads: </label>
						<button
							className={(currentPartIndex === 7) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(treads); setCurrentPartIndex(7)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.treads.name)}
						</button>
						<br/>
						<br/>

						<label className="font" style={divStyle}>Item: </label>
						<button
							className={(currentPartIndex === 8) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(items); setCurrentPartIndex(8)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.itemOne.name)}
						</button>
						<br/>
						<label className="font" style={divStyle}>Item: </label>
						<button
							className={(currentPartIndex === 9) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(items); setCurrentPartIndex(9)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.itemTwo.name)}
						</button>
						<br/>
						<label className="font" style={divStyle}>Item: </label>
						<button
							className={(currentPartIndex === 10) ? "componentMenuBtn selectedComponent font" : "componentMenuBtn font"}
							onClick={() => {setComponentList(items); setCurrentPartIndex(10)}}
              style={divStyle2}
						>
							{toTitleCase(selectedTank.itemThree.name)}
						</button>
					</div>
				}
			</div>

			<ToastContainer />
		</div>
	);
}

export default Armory
