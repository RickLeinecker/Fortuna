//@flow strict
import * as React from 'react';
import Popup from 'reactjs-popup';


// Informational Popup component that explains what Fortuna is.
class InfoPopup extends React.Component<{||}> {
	render(): React.Node {
		return (
			<Popup
				trigger = {
					<button className="clearbtn">
						<div className="infotext">
							<h5>&#60;Fortuna Briefing&#62;</h5>
						</div>
					</button>
				} modal>
				{close => (
					<div className="popup">
						<h2>Fortuna Version 2.0</h2>
						<p>
							Fortuna is a tank simulation game available online for free.
							Players can build and customize their tanks and instead of manually
							controlling their tank, they will build an AI to control it.
							<br />
							<br />
							Fortuna's goal is to teach players simple AI and simple programming.
							<br />
							<br />
							v2 Team: William Bechtel, John Cordero, Sarinda Samarasinghe, Brittanie Staton
							<br />
							v1 Team: Adam Blair, Emil Dolorfino, David Harmeyer, Baylor Maloney, Jorge Vidal
							<br />
							Sponsor: Richard Leinecker
						</p>
						<br />
						<button className="closebtn" onClick={() => { close(); }}>Close</button>
					</div>
				)}
			</Popup>
		);
	}
}

export default InfoPopup;
