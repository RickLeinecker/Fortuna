//@flow strict
import * as React from 'react';
import Popup from 'reactjs-popup';


// Informational Popup component that explains what Fortuna is.
class InfoPopup extends React.Component<{||}> {
	render(): React.Node {
		return (
			<Popup 
				trigger = {
					<button type="button" className="clearbtn">
						<h4>&#60; Fortuna Briefing &#62;</h4>
					</button>
				} modal>
				{close => (
					<div className="popup">
						<h2>Fortuna Version 1.0</h2>
						<p>
							Fortuna is a tank simulation game available online for free.
							Players can build and customize their tanks and instead of manually
							controlling their tank, they will build an AI to control it.
							<br />
							<br />
							Fortuna is meant to teach players simple AI and simple programming.
							<br />
							<br />
							Creators: Adam Blair, Emil Dolorfino, Jorge Vidal, Baylor Maloney, David Harmeyer
							<br />
							Sponsor: Richard Leinecker
						</p>
						<button className="closebtn" onClick={() => { close(); }}>Close</button>
					</div>
				)}
			</Popup>
		);
	}
}

export default InfoPopup;