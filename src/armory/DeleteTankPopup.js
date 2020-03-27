//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';

type Props = {|
	tank: Tank;
|};

type State = {|
	deleteTankOpen: boolean
|};

class DeleteTankPopup extends React.Component<Props, State> {
	
	constructor(props: Props) {
		super(props);

		this.state = {
			deleteTankOpen: false,
		}
	}

	render(): React.Node {
		const deleteButton = (
			<button className="popupbtn" onClick={() => this.handleDeleteClick()}>
				Delete
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({deleteTankOpen: true})}>Cancel</button>
		);
		return(
			<div>
				<h6>Delete Selected Tank</h6>
				
			</div>
		);
	}
}