//@flow strict

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import App from './App.js';
import Login from './login/Login.js';
import MainMenu from './mainmenu/MainMenu.js';
import Marketplace from './marketplace/Marketplace.js';
import CasusContainer from './casus/CasusContainer.js';
import BattleArena from './battlearena/BattleArena.js';
import Armory from './armory/Armory.js';
import TrainingArena from './trainingarena/TrainingArena.js';
import Battleground from './battleground/Battleground.js';
import ConfirmEmail from './login/ConfirmEmail.js';
import Cookies from 'universal-cookie';

const cookie = new Cookies();
const loggedIn: boolean = (cookie.get('token')) ? true : false;
console.log(loggedIn);

// The routing const holds the paths to other react components.
const routing = (
	<Router>
		<div>
			<Switch>
				<Route exact path="/" component={(loggedIn) ? MainMenu : App} />
				<Route path="/Login" component={(loggedIn) ? MainMenu : Login} />
				<Route path="/MainMenu" component={(loggedIn) ? MainMenu : Login} />
				<Route path="/Marketplace" component={(loggedIn) ? Marketplace : Login} />
				<Route path="/Casus" component={(loggedIn) ? CasusContainer : Login} />
				<Route path="/BattleArena" component={(loggedIn) ? BattleArena : Login} />
				<Route path="/Armory" component={(loggedIn) ? Armory : Login} />
				<Route path="/TrainingArena" component={(loggedIn) ? TrainingArena : Login} />
				<Route path="/Battleground" component={(loggedIn) ? Battleground : Login} />
				<Route path="/ConfirmEmail/:token/:email" component= {ConfirmEmail}/>
			</Switch>
		</div>
	</Router>
)

// Renders the page.
const rootComponent = document.getElementById('root');
if (rootComponent != null) {
	ReactDOM.render(routing, rootComponent);
}
