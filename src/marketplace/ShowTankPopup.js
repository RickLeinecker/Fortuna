//@flow strict
import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank';
import { getTankById } from '../globalComponents/apiCalls/tankAPIIntegration';
import TankDisplay from '../tanks/TankDisplay.js';


type Props = {|
	tankIdToShow: string
|}; 

type State = {|
	showingTank: boolean,
	tankBeingShown: ?Tank
|}

// This popup takes an id of a tank, gets that tank, and shows it
class ShowTankPopup extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			showingTank: false,
			tankBeingShown: null
		}
	}

	//This function gets the tank id from the state , creates that tank , and makes showing the popup true
	showTank() {
		//Get the tank we are going to show
		getTankById(this.props.tankIdToShow, tankReturned => {
			this.setState({
				tankBeingShown: tankReturned,
				showingTank: true
			});
		});
	}

	handleCloseClick(): void {
		this.setState({showingTank: false});
	}

	render(): React.Node {
		return (
			<div>
				<button className="btn mt-2" onClick={() => this.showTank()}>
					See Tank
				</button>
				<Popup 
					open={this.state.showingTank}
					onClose={() => this.handleCloseClick()}
				>
					<div className="popup">
						{this.state.tankBeingShown == null ? "Loading Tank":<TankDisplay tankToDisplay={this.state.tankBeingShown} smallTank={false} />}
						<button onClick={() => this.handleCloseClick()} className="closebtn">Close</button>
					</div>
				</Popup>
			</div>
		);
	}
}

export default ShowTankPopup;