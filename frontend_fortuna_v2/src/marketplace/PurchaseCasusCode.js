//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank.js';
import { ToastContainer , toast } from 'react-toastify';
import saveCasus from '../casus/saveCasus.js';
import { getMarketSales, marketSale, getMarketTanks, getMarketCasusCode } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';
import ListingView from './ListingsView.js'

type Props = {|
	selectedTank: Tank,
	usersTanks: Array<Tank>,
    sellerId: String,
    saleId: String,
    userId: String,
    setLoading: () => void,
	onItemBought: () => void,
|};

type State = {|
	popupOpen: boolean,
	tankBeingCopiedFrom: ?Tank,
	confirmed: boolean,
	casusCodeForSale: Array<SaleObject>,
|};

var saleSuccess = false;

class PurchaseCasusCode extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			popupOpen: false,
			tankBeingCopiedFrom : null,
			confirmed: false,
            sellerId: this.props.sellerId,
            saleId: this.props.saleId,
            userId: this.props.userId,
			saleSuccess: false,
		}
	}

	setTankBeingCopiedFrom(tankBeingUsedId: string): void {
		this.setState({tankBeingCopiedFrom: this.props.usersTanks.find(tank => tank._id === tankBeingUsedId)});
	}

	// Converts SaleObject to Tank.
	convertSalesToCasusCode(saleTanks: Array<SaleObject>): void {
		// Find the tank Ids from the Array of SaleObject.
		const casusIds: Array<string> = [];
		for(let i = 0; i < saleTanks.length; i++) {
			if(saleTanks[i].tankId == null) {
				throw new Error("Trying to get tanks when the items for sale have tank id equal to null");
			}
			casusIds.push(saleTanks[i].tankId);
		}
	}

	// API call to validate marketplace purchase
	makeASale(): void {
		marketSale(this.props.userId, this.props.sellerId, this.props.saleId, success => {
			toast.success("Item Purchased.");
			console.log("saleSuccess = ", saleSuccess);
			this.props.onItemBought();
			this.copyCasusCode();
		});
	}

	copyCasusCode(): void {
		if(this.state.tankBeingCopiedFrom == null) {
			toast.error("Couldn't find this tank");
			return;
		}
		if(this.state.confirmed === false) {
			toast.error("Please confirm you understand that you are overwriting code");
			return;
		}

		const selectedTank = this.state.tankBeingCopiedFrom;
		const selectedCasusCode = this.props.selectedTank.casusCode;
		saveCasus(selectedCasusCode, selectedTank._id, () => {
			toast.success("Copied Casus");
			this.setState({popupOpen: false});
		});

		this.props.getSales();
	}

	changeConfirmed(): void {
		if(this.state.confirmed) {
			this.setState({confirmed: false});
		}
		else {
			this.setState({confirmed: true});
		}
	}

	removeSelectedTankFromList(): Array<Tank> {
		const listOfTanksWithoutCurrentTank = [];
		for(let i = 0; i < this.props.usersTanks.length; i++) {
			if(this.props.usersTanks[i]._id !== this.props.selectedTank._id) {
				listOfTanksWithoutCurrentTank.push(this.props.usersTanks[i]);
			}
		}
		return listOfTanksWithoutCurrentTank;
	}

	render(): React.Node {
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({popupOpen: false})}>Cancel</button>
		);
		const copyButton = (this.state.confirmed === false || this.state.tankBeingCopiedFrom == null)?(<button className="smallbtn" disabled>Copy</button>):(<button className="smallbtn" onClick={() => this.makeASale()}>Copy</button>);
		const checkBoxField = (
			<label>
				<input
					className = "customCheckBox"
					type="checkbox"
					checked={this.state.confirmed}
					onChange={() => this.changeConfirmed()} />
				 I understand I am overwriting this tank's Casus Code
			</label>
		)
		const listOfTanksWithoutCurrentTank = this.removeSelectedTankFromList();
		return(
			<div>
				<button className="btn" onClick={() => this.setState({popupOpen: true})}>
					Buy
				</button>
				<Popup
					open={this.state.popupOpen}
					onClose={() => this.setState({popupOpen: false})}
				>
					<div className="popup">
						<br/>
						<h3>Copy Casus Code To</h3>
						<select 
							className="dropdownMenu" 
							onChange={e => this.setTankBeingCopiedFrom(e.target.value)}
						>
							<option>Select A Tank To Store New Casus Code</option>
							{listOfTanksWithoutCurrentTank.map(tank => 
								<option key = {tank._id} value = {tank._id}>{tank.tankName}</option>
							)}
						</select>
						{checkBoxField}
						<br/>
						{copyButton}{cancelButton}
					</div>
				</Popup>
				<ToastContainer />
			</div>
		);
	}
}

export default PurchaseCasusCode;