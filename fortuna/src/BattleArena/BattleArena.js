//@flow strict
import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BattleArena.css'
class BattleArena extends React.Component<{||}> {
    render(): React.Node {
        return (
        <div id="Parent">
            <div className="row styleForRow">
                <div className="col-md-4">
                    <Link to="/MainMenu">
                        <button type="button" className="btn btn-secondary btn-lg">&lt;- Back to Main Menu</button>
                    </Link>
                </div>
                <h1 className="col-md-4 text-center">Battle Arena</h1>
                <h3 className="col-md-4 text-right">UserName: $9432</h3> 
            </div>
            <div className="row styleForRow">
                <div className="col-md-6">
                    <div className = "row mb-3">
                        <div className = "col-md-1"></div>
                        <div className= "col-md-10">
                            <input type="text" className="form-control" placeholder="Search Players" aria-label="searchPlayer" aria-describedby="basic-addon1"/>
                        </div>
                        <div className = "col-md-1"></div>
                    </div>
                    <div className = "row mb-3">
                        <div className = "col-md-1"></div>
                        <div className= "col-md-10">
                            <button type="button" className="btn btn-primary">Quickplay</button>
                        </div>
                        <div className = "col-md-1"></div>
                    </div>
                    <div className = "row">
                        <div className = "col-md-1"></div>
                        <div className= "col-md-10">
                            <button type="button" className="btn btn-success">Training Arena</button>
                        </div>
                        <div className = "col-md-1"></div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className = "row mb-3">
                        <div className = "col-md-1"></div>
                        <div className= "col-md-10">
                        <select className="custom-select">
                            <option defaultValue>Choose A Tank</option>
                            <option value="1">Tank One</option>
                            <option value="2">Tank Two</option>
                            <option value="3">Tank Three</option>
                        </select>
                        </div>
                        <div className = "col-md-1"></div>
                    </div>
                    <div className = "row mb-3">
                        <div className = "col-md-1"></div>
                        <div className= "col-md-10">
                            <h4>Leaderboard</h4>
                            <p className = "leaderboardPlayer">Player One</p>
                            <p className = "leaderboardPlayer">Player Two</p>
                            <p className = "leaderboardPlayer">Player Three</p>
                            <p className = "leaderboardPlayer">Player Four</p>
                            <p className = "leaderboardPlayer">Player Five</p>
                            <p className = "leaderboardPlayer">Player Six</p>
                            <p className = "leaderboardPlayer">Player Seven</p>
                        </div>
                        <div className = "col-md-1"></div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default BattleArena;