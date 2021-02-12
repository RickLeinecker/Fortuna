//@flow strict

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Login from './login/Login.js';
import { BrowserRouter, Route } from 'react-router-dom';
import MainMenu from './mainmenu/MainMenu';
import Marketplace from './marketplace/Marketplace'
import BattleArena from './battlearena/BattleArena'
import TrainingArena from './trainingarena/TrainingArena'
import Armory from './armory/Armory'

// App class builds the front page.
class App extends React.Component<{||}> {
	
	render(): React.Node {
		return (
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/MainMenu" exact component={MainMenu} />
        <Route path="/Marketplace" exact component={Marketplace} />
        <Route path="/BattleArena" exact component={BattleArena} />
        <Route path="/TrainingArena" exact component={TrainingArena} />
        <Route path="/Armory" exact component={Armory} />
      </BrowserRouter>
		);
	}
}

export default App;