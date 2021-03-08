//@flow strict
import * as React from 'react';
import { ToastContainer , toast } from 'react-toastify';
import Component from '../globalComponents/typesAndClasses/Component.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import { makeASale } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';
import { toTitleCase } from '../globalComponents/Utility.js';

type Props = {|
	onItemSold: () => void,
|}; 

type State = {|
	userId: string,
	salePrice: number,
	itemID: string,
	itemAmount: number,
	itemsToSell: Array<Component>,
|};

class MakeAComponentSaleView extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			userId: '',
			salePrice: 0,
			itemID: '',
			itemAmount: 0,
			itemsToSell: [],
		}
	}

	componentDidMount(): void {
		this.getUserInventory();
	}

	// Gets all of the user's inventory.
	getUserInventory(): void {
		getUserAPICall(user => {
			this.setState({
				itemsToSell: user.inventory,
				userId: user.userId,
				itemID: user.inventory.length === 0 ? '' : user.inventory[0].componentName});
		});
	}

	makeASaleOfAComponent = (): void => {
		// If the user has no components to sell, exit function.
		if (this.state.itemID === '') {
			toast.error("No components to sell");
			return;
		}
		makeASale(
			this.state.userId, 
			this.state.salePrice, 
			this.state.itemID, 
			"component", 
			this.state.itemAmount,
			() => {
				toast.success("Item Placed in Market.");
				this.setState({salePrice: 0, itemAmount: 0});
				this.getUserInventory();
				this.props.onItemSold();
			}
		);
	}
	
	formatAmountUserHas(amountOfThisItemUserHas: number): string {
		let responseString = '';
		if(amountOfThisItemUserHas > 0) {
			responseString = '(' + amountOfThisItemUserHas + ')';
		}
		return responseString;
	}

  selectStyle = {
    cursor: "pointer",
    width: "50%",
    padding: "7px 7px 7px 7px",
    borderRadius: "2px",
    borderColor: "#04CCFF",
    backgroundColor: "#04CCFF",
    color: "#000921",
    left: "500px",
    position: "relative"
  }

  inputStyle = {
    cursor: "pointer",
    width: "5%",
    padding: "7px 7px 7px 7px",
    borderRadius: "2px",
    borderColor: "#04CCFF",
    backgroundColor: "#04CCFF",
    color: "#000921",
    left: "850px",
    position: "relative"
  }

  // divStyle = {
  //   color: "white",
  //   textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  // }

  labelStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    left: "850px",
    position: "relative"
  }

  buttonStyle = {
    left: "850px",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black"
  }

	render(): React.Node {
		return (
			<div id="Parent">
        <br/><br/><br/>
				<label style={this.labelStyle}>Select an Item to Sell</label>
        <br/>
				<select className="dropdownMenu" style={this.selectStyle} onChange={e => this.setState({itemID: e.target.value})}>
					{this.state.itemsToSell.map(({ componentName, numberOwned }, index) => 
						<option key={index}  value={componentName}>{toTitleCase(componentName)} {'(' + numberOwned + ')'}</option>
					)}
				</select>
				<br/><br/><br/>
				<label style={this.labelStyle}>Selling Price</label>
        <br/>
				<input style={this.inputStyle} type="number" className="inputText" value={this.state.salePrice} onChange={e => this.setState({salePrice: e.target.value})}></input>
				<br/><br/><br/>
				<label style={this.labelStyle}>Amount to Sell</label>
        <br/>
				<input style={this.inputStyle} type="number" className="inputText" value={this.state.itemAmount} onChange={e => this.setState({itemAmount: e.target.value})}></input>
				<br/><br/>
				<button style={this.buttonStyle} className="primarybtn" onClick={this.makeASaleOfAComponent}>Sell</button>
				<ToastContainer />
			</div>
		);
	}
}

export default MakeAComponentSaleView;
