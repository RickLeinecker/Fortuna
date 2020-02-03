//@flow strict
import * as React from 'react';
import Popup from 'reactjs-popup';
import SetVariableBlock from '../blocks/SetVariableBlock.js';
import GetVariableBlock from '../blocks/GetVariableBlock.js';
import {
	isLegalVariableName,
	isLegalConstant
} from '../userInteraction/defaultVariableNames.js';

import './SelectVariablePopup.css';

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
		const enabled=this.getShouldBeAbleToClickCreateVariable();
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
							disabled={!enabled}
							onClick= {() => this.onCreateVariableSelected()}> 
								{this.getCreateVariableText()}
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

	getTypedLegalVariableName(): boolean {
		if (this.props.variableBlockToRename == null) {
			return false;
		}
		return isLegalVariableName(this.state.variableNameToCreate);
	}

	getTypedLegalConstant(): boolean {
		if (this.props.variableBlockToRename == null) {
			return false;
		}
		const expectedType = (this.props.variableBlockToRename instanceof GetVariableBlock) ?
			this.props.variableBlockToRename.dataType:
			this.props.variableBlockToRename.paramType;

		return isLegalConstant(this.state.variableNameToCreate, expectedType);
	}

	getShouldBeAbleToClickCreateVariable(): boolean {
		return this.getTypedLegalVariableName() || this.getTypedLegalConstant();
	}

	//returns "Constant/Create Variable", "Constant", or "Create Variable"
	getCreateVariableText(): 'Enter a Constant or Variable To Create' | 'Constant' | 'Create Variable' {
		if (this.getTypedLegalVariableName()) {
			return 'Create Variable';
		}
		if (this.getTypedLegalConstant()) {
			return 'Constant';
		}
		return 'Enter a Constant or Variable To Create';
	}

}

export default SelectVariablePopup;
