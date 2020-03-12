//@flow strict
import * as React from 'react';
import Cookies from 'universal-cookie';

type Props = {||}; 
type State = {|
    userId: string,
    salePrice: number,
    itemID: string,
    itemAmount: number,
|};
let itemsToSell = [{value: '', label: ''}];
class MakeAComponentSaleView extends React.Component<Props, State> {

    
    constructor() {
        super();
        this.state={
            userId: '',
            salePrice: 0,
            itemID: '',
            itemAmount: 0,
        }
        this.getUserInventory();
    }


    getUserInventory = async ():Promise<void> => {
        itemsToSell = [];
        itemsToSell.push({value: '', label: ''});
		const cookies = new Cookies();
		const token = cookies.get('token');
		const response = await fetch('/api/user/getUser/', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': token
			},
		});
		const body = await response.text();
		const jsonObjectOfUser = JSON.parse(body);
		//set the users id
		this.setState({userId:jsonObjectOfUser._id});
		for (let key in jsonObjectOfUser.inventory.tankComponents) {
            //This is how many of the current item the user has
            let amountOfItemsUserHas = jsonObjectOfUser.inventory.tankComponents[key];
            if(amountOfItemsUserHas > 0)
            {
                let obj = {};
                obj['value'] = key;
                obj['label'] = key;
                itemsToSell.push(obj);
            }		
		}
		//Need this to deal with the asynch nature of api calling......fun times
		this.forceUpdate();
    };

    makeASale = async ():Promise<void> => {
		const response = await fetch('/api/marketplace/addMarketSale/', {
			method: 'post',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({ sellerId: this.state.userId, salePrice: this.state.salePrice, itemId:this.state.itemID, itemType:"component", amount:this.state.itemAmount}),
		});
        const body = await response.text();
        console.log(body);
	};
    
    handleChangeInSaleItem = ({ target }:{target:HTMLInputElement }) => {this.setState({itemID: target.value});}
    handleChangeInSalePrice = ({ target }:{target:HTMLInputElement }) => {this.setState({salePrice: parseInt(target.value)});}
    handleChangeInAmountToSell = ({ target }:{target:HTMLInputElement }) => {this.setState({itemAmount: parseInt(target.value)});}
    render(): React.Node  { 
        return (
            <div id="Parent">
                <label>Select an Item to Sell</label>
                <select className="itemForSale" onChange={this.handleChangeInSaleItem}>{itemsToSell.map(({ value, label }, index) => <option key={index}  value={value}>{label}</option>)}</select>
                <label>Selling Price</label>
                <input type="number" className="form-control" onChange={this.handleChangeInSalePrice}></input>
                <label>Amount to Sell</label>
                <input type="number" className="form-control" onChange={this.handleChangeInAmountToSell}></input>
                <button className="btn btn-success mt-2" onClick={this.makeASale}>Sell</button>
            </div>
        );
    }
}

export default MakeAComponentSaleView;