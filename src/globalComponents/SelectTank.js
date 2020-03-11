//@flow strict

import * as React from 'react';

type Props = {|
	changeCurrentTank: (SyntheticInputEvent<HTMLInputElement>) => void
|};

type State = {|
	tankList: Array<string>,
	currentTank: string
|};

// Select Tank Component. Shows users all their tanks.
//
// Prop Names:
// updateCurrentTank (function from Armory and Battle Arena)
// 
// State Names:
// tankList (list of tank names that the user owns)
// currentTank (the tank the user has selected in the dropdown)
//
// EXAMPLE PROP USAGE = <SelectTank updateCurrentTank={this.updateCurrentTank}
//
// Needs API calls to be added.

class SelectTank extends React.Component<Props, State> {

	constructor() {
		super();

		this.state = {
			tankList: ["Bigone", "Small one", "hehaw ONE"], // NEEDS API CALL TO GET LIST OF TANK NAMES A USER HAS
			currentTank: ""
		};
	}

	render(): React.Node {
		return(
			<div>
				<h3>Select a Tank</h3>
				<select 
					onChange={(e) => this.props.changeCurrentTank(e)}
					className="dropdownMenu"
				>
					<option defaultValue></option>
					{this.state.tankList.map((tank, index) =>
						<option
							key={index}
							value={tank}
						>
							{tank}
						</option>
					)}
				</select>
			</div>
		);
	}
}

export default SelectTank;