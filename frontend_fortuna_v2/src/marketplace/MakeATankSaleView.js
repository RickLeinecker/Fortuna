//@flow strict
import * as React from 'react';
import Tank from '../tanks/Tank.js';
import { getAllUsersTanks, getFavoriteTank, getFavoriteTankTeam } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import { makeASale } from '../globalComponents/apiCalls/marketPlaceAPIConnections.js';
import { ToastContainer , toast } from 'react-toastify';

type Props = {|
	onItemSold: () => void,
|};

type State = {|
	userId: string,
	salePrice: number,
	tankBeingSoldId: string,
	itemAmount: number,
	tanksToSell: Array<Tank>,
	favTankId: string,
	favTankTeamIds: Array<string>
|};

class MakeATankSaleView extends React.Component<Props, State> {

	constructor() {
		super();
		this.state = {
			userId: '',
			salePrice: 1,
			tankBeingSoldId: '',
			tankCasusCode: [],
			itemAmount: 0,
			tanksToSell: [],
			favTankId: '',
			favTankTeamIds: ['', '', ''],
      loading: false
		}
	}

 

	// Once mounted, get the userId, favorite tank id, and favorite tank team ids.
	componentDidMount(): void {
    this.setState({ loading: true });
		getUserAPICall(user => {
			this.setState({userId: user.userId}, () => {
        this.getAllUsersTanksForSell();
      });
		});



		getFavoriteTank(tank => {
			if (tank != null) {
				this.setState({ favTankId: tank._id});
			}
		});

		getFavoriteTankTeam(tanks => {
			const favTankIds: Array<string> = ['', '', ''];
			for (let i: number = 0; i < 3; i++) {
				if (tanks[i] != null) {
					favTankIds[i] = tanks[i]._id;
				}
			}
			this.setState({favTankTeamIds: favTankIds});
		})
	}

	// Get all of a user's tanks, besides the favorite tank.
	getAllUsersTanksForSell() : void {
		getAllUsersTanks(allTanks => {
				// Find the favorite tank and remove it if it exists.
				const index = allTanks.map(tank => tank._id).indexOf(this.state.favTankId);
				if (index > -1) {
					allTanks.splice(index, 1);
				}

        this.setState({tanksToSell: allTanks, tankBeingSoldId: (allTanks.length === 0) ? '' : allTanks[0]._id, tankCasusCode: allTanks[0]._id.casusCodeId, loading: false});
        

		});
	};

	//This will make a sale for a tank
	makeASaleOfATank = (): void => {
    this.setState({ loading: true })
		//Check for if last tank can't allow them to sell tank
		if(this.state.tanksToSell.length === 1) {
      this.setState({ loading: false })
			toast.error("Can't sell last tank");
			return;
		}

		makeASale(
			this.state.userId,
			this.state.salePrice,
			this.state.tankBeingSoldId,
			"tank",
			1,
			() => {
				toast.success("Tank Placed in Market.");
				this.getAllUsersTanksForSell();
				this.setState({salePrice: 1, loading: false});
				this.props.onItemSold();
			},
      () => {
        this.setState({ loading: false })
      }
		);
	}

  buttonStyle = {
    left: "110px",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black"
  }

  spinnerStyle = {
    opacity: "0.5",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }

	render(): React.Node  {

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
          <label>Select a tank to Sell</label>
          <br/><br/>
          <select
            className="dropdownMenu"
            onChange={e => this.setState({tankBeingSoldId: e.target.value})}
          >
            {this.state.tanksToSell.map(({ tankName, _id }, index) =>
              <option key={index}  value={_id}>{tankName}</option>
            )}
          </select>
          <br/><br/><br/>
          <label>Selling Price</label>
          <br/>
          <input
            type="number"
            value={this.state.salePrice}
            className="inputText"
            onChange={e => this.setState({salePrice: e.target.value})}
            min="1"
          ></input>
          <br/><br/><br/><br/>
          <button style={this.buttonStyle} className="primarybtn" onClick={this.makeASaleOfATank}>Sell</button>
        </div>
      );
    }
	}
}

export default MakeATankSaleView;
