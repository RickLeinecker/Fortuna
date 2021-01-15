//@flow strict

import './MainMenu.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from '../globalComponents/MainNavbar.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import { Transition } from 'react-transition-group'
import { TweenMax, TweenLite } from 'gsap/all'

// MAY NEED TO CHAGNE THIS TO A FUNCTIONAL COMPONENT
// THIS HAS NO STATE

// Main Menu component.
class MainMenu extends React.Component<{||}> {

	constructor(props) {
		super(props);
    verifyLogin();
  }
  
  componentDidMount() {
    document.body.style.backgroundImage = "url('/login_background.gif')"
    document.body.style.fontFamily = "font-family: 'Press Start 2P', cursive;"
  }

	render(): React.Node {
    const { show } = this.props;
    const startState = { autoAlpha: 0, y: -50 }
		return (
			<div id="Parent">
				<MainNavbar 
					linkName="/Login" 
					returnName="Logout" 
					pageName="Main Menu" 
				/>
				<h1 className="menuheader">Where to Commander?</h1>
        <Transition
          unmountOnExit
          in={show}
          timeout={1000}
          onEnter={node => TweenLite.set(node, startState)}
          addEndListener={ (node, done) => {
            TweenLite.to(node, 0.5, {
              autoAlpha: show ? 1 : 0,
              y: show ? 0 : 50,
              onComplete: done
            });
          }}
        >
          <div className="column menuleft">
            <Link to={verifyLink("/Marketplace")}>
              <button className="mainMenuBtn">Marketplace</button>
            </Link>
          </div>
        </Transition>
				<div className="column menumiddle">
					<Link to={verifyLink("/BattleArena")}>
						<button className="mainMenuBtn">Battle Arena</button>
					</Link>
					<br/><br/><br/>
					<Link to={verifyLink("/TrainingArena")}>
						<button className="mainMenuBtn">Training Arena</button>
					</Link>
				</div>
				<div className="column menuright">
					<Link to={verifyLink("/Armory")}>
						<button className="mainMenuBtn">Armory</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default MainMenu;
