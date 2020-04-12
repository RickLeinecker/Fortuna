//@flow strict
import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank';
import { getTankById } from '../globalComponents/apiCalls/tankAPIIntegration';
import TankDisplay from '../tanks/TankDisplay.js';
import { getTank, getEmptyCasusCode } from '../tanks/TankLoader.js';
import BackendTank from '../tanks/BackendTank.js';


type Props = {|
	tankIdToShow: string
|}; 

type State = {|
	showingTank: boolean,
	tankBeingShown: Tank
|}

// This popup takes an id of a tank, gets that tank, and shows it
class ShowTankPopup extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		//This blank tank is a placeholder for the tank that we are goiing to pull from the show tank function
		const blankTank: BackendTank = new BackendTank(
			'',
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',],
			getEmptyCasusCode(),
			false,
			'',
			''
		);
		this.state = {
			showingTank: false,
			tankBeingShown: getTank(blankTank)
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
						<TankDisplay tankToDisplay={this.state.tankBeingShown} smallTank={false} />
					</div>
				</Popup>
			</div>
		);
	}
}

export default ShowTankPopup;