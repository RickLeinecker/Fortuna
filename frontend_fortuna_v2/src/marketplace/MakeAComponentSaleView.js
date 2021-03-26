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
			salePrice: 1,
			itemID: '',
			itemAmount: 1,
			itemsToSell: [],
      loading: false
		}
	}

	componentDidMount(): void {
		this.getUserInventory();
	}

	// Gets all of the user's inventory.
	getUserInventory(): void {
    this.setState({ loading: true });
		getUserAPICall(user => {
			this.setState({
				itemsToSell: user.inventory,
				userId: user.userId,
				itemID: user.inventory.length === 0 ? '' : user.inventory[0].componentName,
        loading: false
      });
		});
	}

	makeASaleOfAComponent = (): void => {
		// If the user has no components to sell, exit function.
    this.setState({ loading: true });

		if (this.state.itemID === '') {
      this.setState({ loading: false })
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
				this.setState({salePrice: 0, itemAmount: 0, loading: false});
				this.getUserInventory();
				this.props.onItemSold();
			},
      () => {
        this.setState({ loading: false })
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
    width: "20%",
    padding: "7px 7px 7px 7px",
    borderRadius: "2px",
    borderColor: "#04CCFF",
    backgroundColor: "#04CCFF",
    color: "#000921",
    left: "730px",
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

  tankLabelStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    left: "825px",
    position: "relative"
  }

  sellLabelStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    left: "850px",
    position: "relative"
  }

  buttonStyle = {
    left: "850px",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black"
  }

  spinnerStyle = {
    opacity: "0.5",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }

	render(): React.Node {

    if (this.state.loading)
    {
      return (
        <>
          <br/><br/><br/><br/>
          <img style={this.spinnerStyle} src="/spinner.gif" alt=""/> 
        </>
      )
    }
    else {
      return (
        <div id="Parent">
          <br/><br/><br/>
          <label style={this.tankLabelStyle}>Select an Item to Sell</label>
          <br/>
          <select className="dropdownMenu" style={this.selectStyle} onChange={e => this.setState({itemID: e.target.value})}>
            {this.state.itemsToSell.map(({ componentName, numberOwned }, index) => 
              <option key={index}  value={componentName}>{toTitleCase(componentName)} {'(' + numberOwned + ')'}</option>
            )}
          </select>
          <br/><br/><br/>
          <label style={this.sellLabelStyle}>Selling Price</label>
          <br/>
          <input style={this.inputStyle} type="number" className="inputText" value={this.state.salePrice} min="1" onChange={e => this.setState({salePrice: e.target.value})}></input>
          <br/><br/><br/>
          <label style={this.sellLabelStyle}>Amount to Sell</label>
          <br/>
          <input style={this.inputStyle} min="1" type="number" className="inputText" value={this.state.itemAmount} onChange={e => this.setState({itemAmount: e.target.value})}></input>
          <br/><br/>
          <button style={this.buttonStyle} className="primarybtn" onClick={this.makeASaleOfAComponent}>Sell</button>
          <ToastContainer />
        </div>
      );
    }

	}
}

export default MakeAComponentSaleView;
