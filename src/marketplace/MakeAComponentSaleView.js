//@flow strict
import * as React from 'react';
import TankPart from '../tanks/TankPart.js';
import { getUser } from '../globalComponents/userAPIIntegration.js';
import { makeASale } from './marketPlaceAPIConnections.js';
import { toTitleCase } from '../globalComponents/Utility.js';

type Props = {||}; 
type State = {|
    userId: string,
    salePrice: number,
    itemID: string,
	itemAmount: number,
	itemsToSell: Array<TankPart>,
	amountOfACertainItemUserHas: Array<number>,
|};

class MakeAComponentSaleView extends React.Component<Props, State> {

    
    constructor() {
        super();
        this.state={
            userId: '',
            salePrice: 0,
            itemID: '',
			itemAmount: 0,
			itemsToSell:[],
			amountOfACertainItemUserHas: [],
        }
        this.getUserInventory();
    }


    getUserInventory ():Promise<void> {
		const responsePromise = getUser();
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					return data;
				}
				else {
					const jsonObjectOfUser = data;
					this.setState({userId:jsonObjectOfUser._id});
					const componentsWeCanSell = [];
					const amountOfComponentWeHave = [];
					//Add an empty so that the user actually sets the states
					componentsWeCanSell.push(new TankPart(""));
					amountOfComponentWeHave.push(0);
					for (const key in jsonObjectOfUser.inventory.tankComponents) {
						// we need to atleast have one of these
						if(jsonObjectOfUser.inventory.tankComponents[key] > 0) {
							componentsWeCanSell.push(new TankPart(key));
							amountOfComponentWeHave.push(jsonObjectOfUser.inventory.tankComponents[key]);
						}
						
					}
					this.setState({
						itemsToSell: componentsWeCanSell,
						amountOfACertainItemUserHas: amountOfComponentWeHave
					});
				}
			})
		).catch(
			error => {
				console.log('Couldnt connect to server!');
				console.log(error);
			}
		);
    };

    makeASaleOfAComponent =  ():void => {
		const responsePromise = makeASale(this.state.userId, this.state.salePrice, this.state.itemID, "component", this.state.itemAmount);
		responsePromise.then(
			response => response.json().then(data => {
				console.log(data);
			})
		).catch(
			error => {
				console.log('Couldnt connect to server!');
				console.log(error);
			}
		);
	};
    
    handleChangeInSaleItem = ({ target }:{target:HTMLInputElement }) => {this.setState({itemID: target.value});}
    handleChangeInSalePrice = ({ target }:{target:HTMLInputElement }) => {this.setState({salePrice: parseInt(target.value)});}
	handleChangeInAmountToSell = ({ target }:{target:HTMLInputElement }) => {this.setState({itemAmount: parseInt(target.value)});}
	
	getAmountOfThisItemUserHas(index:number):string {
		const amountOfThisItemUserHas = this.state.amountOfACertainItemUserHas[index];
		let responseString = '';
		if(amountOfThisItemUserHas > 0)
		{
			responseString = '(' + amountOfThisItemUserHas + ')';
		}
		return responseString;
	}

    render(): React.Node  { 
        return (
            <div id="Parent">
                <label>Select an Item to Sell</label>
                <select className="itemForSale" onChange={this.handleChangeInSaleItem}>{this.state.itemsToSell.map(({ name }, index) => <option key={index}  value={name}>{toTitleCase(name)} {this.getAmountOfThisItemUserHas(index)}</option>)}</select>
                <label>Selling Price</label>
                <input type="number" className="form-control" onChange={this.handleChangeInSalePrice}></input>
                <label>Amount to Sell</label>
                <input type="number" className="form-control" onChange={this.handleChangeInAmountToSell}></input>
                <button className="btn btn-success mt-2" onClick={this.makeASaleOfAComponent}>Sell</button>
            </div>
        );
    }
}

export default MakeAComponentSaleView;