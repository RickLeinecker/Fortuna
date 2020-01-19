//@flow strict
import * as React from 'react';
import Popup from 'reactjs-popup';

class SelectVariablePopup extends React.Component {

	render(): React.Node {
		return (
			<Popup
				open={true}
				closeOnDocumentClick={false}
				closeOnEscape={false}
			>
				<div>
					Select your variable here!
				</div>
			</Popup>
		);
	}
}

export default SelectVariablePopup;
