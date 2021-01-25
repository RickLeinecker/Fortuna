//@flow strict

import './MainMenu.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from '../globalComponents/MainNavbar.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import JoyRide from 'react-joyride';

// Main Menu component.
class MainMenu extends React.Component<{||}> {

	constructor() {
		super();
    verifyLogin();

    this.state = {
      TOUR_STEPS: [
        {
          target: ".mainMenuBtn",
          content: "This is where you can search the dashboard."
        },
        {
          target: ".btlarena",
          content:
            "Bar chart for total order. You can see beautiful graphs here, thanks to creative tim for such UI."
        },
        {
          target: ".trainarena",
          content: "This is where you can find the external links."
        },
        {
          target: ".armory",
          content: "This is where you can see the footer links."
        }
      ]
    }
    
  }
  
  componentDidMount() {
    document.body.style.backgroundImage = "url('/login_background.gif')"
    document.body.style.fontFamily = "font-family: 'Press Start 2P', cursive;"
  }

	render(): React.Node {
		return (
      <>
        <div id="Parent">
          <MainNavbar 
            linkName="/Login" 
            returnName="Logout" 
            pageName="Main Menu" 
          />
          <h1 className="menuheader">Where to Commander?</h1>
          <div className="column menuleft">
            <Link to={verifyLink("/Marketplace")}>
              <button className="mainMenuBtn">Marketplace</button>
            </Link>
          </div>
          <div className="column menumiddle">
            <Link to={verifyLink("/BattleArena")}>
              <button className="mainMenuBtn btlarena">Battle Arena</button>
            </Link>
            <br/><br/><br/>
            <Link to={verifyLink("/TrainingArena")}>
              <button className="mainMenuBtn trainarena">Training Arena</button>
            </Link>
          </div>
          <div className="column menuright">
            <Link to={verifyLink("/Armory")}>
              <button className="mainMenuBtn armory">Armory</button>
            </Link>
          </div>
        </div>
        <JoyRide 
              steps={this.state.TOUR_STEPS} 
              continuous={true} 
              styles={{
                options: {
                  arrowColor: '#e3ffeb',
                  backgroundColor: 'rgb(245, 59, 229)',
                  overlayColor: 'rgba(79, 26, 0, 0.4)',
                  primaryColor: '#000',
                  textColor: 'white',
                  width: 200,
                  zIndex: 1000,
                }
              }}
          />
      </>

		);
	}
}

export default MainMenu;
