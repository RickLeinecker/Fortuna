//@flow strict

import * as React from 'react';
import '../Main.css';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Leaderboard component. Displays top 10 players.
class Leaderboard extends React.Component<{||}> {
	render(): React.Node {
		return (
			<div className="leaderboard">
				<h4>Leaderboard</h4>
				<h6>1.  Long Johnson Boy</h6>
				<h6>2.  XxK1ll3rxX</h6>
				<h6>3.  momma</h6>
				<h6>4.  Lord of Weiner</h6>
				<h6>5.  animeluver</h6>
				<h6>6.  Zezima</h6>
				<h6>7.  Mark Zuckerberg</h6>
				<h6>8.  Long Johnson Boy2</h6>
				<h6>9.  34910020999</h6>
				<h6>10. Training Bot 3</h6>
			</div>
		)
	}
}

export default Leaderboard;