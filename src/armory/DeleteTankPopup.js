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

	handleDeleteClick(): void {
		
	}

	render(): React.Node {
		const deleteButton = (
			<button className="popupbtn" onClick={() => this.handleDeleteClick()}>
				Delete
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({deleteTankOpen: false})}>Cancel</button>
		);
		return(
			<div>
				<h6>Delete Selected Tank</h6>
				<button className="btn" onClick={() => this.setState({deleteTankOpen: true})}>
					Delete
				</button>
				<Popup
					open={this.state.deleteTankOpen}
					onClose={() => this.setState({deleteTankOpen: false})}
				>
					<div className="popup deletePopup">
						<h4>Delete {this.props.tank.tankName}?</h4>
						{deleteButton}{cancelButton}
					</div>
				</Popup>
			</div>
		);
	}
}

export default DeleteTankPopup;