//@flow strict

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import App from './App.js';
import Login from './login/Login.js';
import MainMenu from './mainmenu/MainMenu.js';
import Marketplace from './marketplace/Marketplace.js';
import CasusContainer from './casus/CasusContainer.js';
import BattleArena from './BattleArena/BattleArena.js';

// The routing const holds the paths to other react components.
const routing = (
	<Router>
		<div>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/Login" component={Login} />
				<Route path="/MainMenu" component={MainMenu} />
				<Route path="/Marketplace" component={Marketplace} />
				<Route path="/Casus" component={CasusContainer} />
				<Route path="/BattleArena" component={BattleArena} />
			</Switch>
		</div>
	</Router>
)

// Renders the page.
const rootComponent = document.getElementById('root');
if (rootComponent != null) {
	ReactDOM.render(routing, rootComponent);
}
