//@flow strict
import * as React from 'react';
import Popup from 'reactjs-popup';
import SetVariableBlock from '../blocks/SetVariableBlock.js';
import GetVariableBlock from '../blocks/GetVariableBlock.js';

import "./SelectVariablePopup.css";

type Props = {|
	variableBlockToRename: SetVariableBlock | GetVariableBlock | null,
	onCancelClicked: () => void,
	onVariableCreated: (string) => void
|};

type State = {|
	variableNameToCreate: string;
|};

class SelectVariablePopup extends React.Component<Props, State> {
	
	constructor(props: Props) {
		super(props);

		this.state={
			variableNameToCreate: ''
		}
	}

	onCreateVariableSelected(): void {
		this.props.onVariableCreated(this.state.variableNameToCreate);
	}

	handleInputChange(newVariableName: string): void {
		this.setState({variableNameToCreate: newVariableName});
	}

	render(): React.Node {
		return (
			<Popup
				open={this.props.variableBlockToRename != null}
				closeOnDocumentClick={false}
				closeOnEscape={false}
			>
				<div>
					<h1>Select Variable:</h1>
					<button 
						className="btn normalPadding" 
						onClick= {() => this.props.onVariableCreated('Foo')}>
							Foo
					</ button>
					<button 
						className="btn normalPadding" 
						onClick= {() => this.props.onVariableCreated('i')}>
							i
					</ button>
					<button 
						className="btn normalPadding" 
						onClick= {() => this.props.onVariableCreated('Bar')}>
							Bar
					</ button>

					<div className="centered">
						<input className="normalPadding" onChange={(e) => this.handleInputChange(e.target.value)}/>

						<button 
							className="btn normalPadding" 
							disabled={this.state.variableNameToCreate.length===0}
							onClick= {() => this.onCreateVariableSelected()}> 
								Create Variable 
						</button>

						<button
							className="btn normalPadding"
							onClick={() => this.props.onCancelClicked()}>
								Cancel
						</button>
					</div>
				</div>
			</Popup>
		);
	}

}

export default SelectVariablePopup;
