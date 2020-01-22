//@flow strict
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import Popup from 'reactjs-popup';


// Informational Popup component that explains what Fortuna is.
class InfoPopup extends React.Component<{||}> {
	render(): React.Node {
		return (
			<Popup trigger={<button type="button" className="infobtn"><h5>&#60; Click Here &#62;</h5></button>} modal>
				<div className="infopopup">
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
				</div>
			</Popup>
		);
	}
}

export default InfoPopup;