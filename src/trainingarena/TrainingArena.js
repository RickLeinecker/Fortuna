//@flow strict

import * as React from 'react';
import Navbar from '../globalComponents/Navbar.js';
import { Link } from 'react-router-dom';

class TrainingArena extends React.Component<{||}> {
    
    render(): React.Node {
        return (
            <div id="Parent">
                <Navbar linkName="BattleArena" returnName="Back to Battle Arena" pageName="Training Arena" userName="FRIcker | $465128" />
                <div className="column taleft">
                    <h2>Choose your Tank, Commander</h2>
                    <select className="dropdownMenu">
                        <option defaultValue>Select a Tank</option>
                        <option value="1">Child Consumer</option>
                        <option value="2">Fast Bang</option>
                        <option value="3">Biggest Gun</option>
                    </select>
                </div>
                <div className="column tamiddle">
                    <h2>Choose an Arena to Battle</h2>
                    <select className="dropdownMenu">
                        <option defaultValue>Select Arena</option>
                        <option value="1">Big Arena</option>
                        <option value="2">Small Arena</option>
                        <option value="3">Arena I am, yes</option>
                    </select>
										<Link to="Battleground">
                    	<button type="button" className="btn">Start Battle</button>
										</Link>
                </div>
                <div className="column taright">
                    <h2>Choose Training Bot</h2>
                    <select className="dropdownMenu">
                        <option defaultValue>Select a Tank</option>
                        <option value="1">Child Consumer</option>
                        <option value="2">Fast Bang</option>
                        <option value="3">Biggest Gun</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default TrainingArena;
