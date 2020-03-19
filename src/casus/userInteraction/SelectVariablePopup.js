//@flow strict
import * as React from 'react';
import Popup from 'reactjs-popup';
import SetVariableBlock from '../blocks/SetVariableBlock.js';
import GetVariableBlock from '../blocks/GetVariableBlock.js';
import {
	TRUE_KEYWORD,
	FALSE_KEYWORD,
	isLegalVariableName,
	isLegalConstant,
} from '../userInteraction/defaultVariableNames.js';
import type {DataType} from '../blocks/DataType.js';
import {
	builtInIntVariables, 
	builtInBooleanVariables, 
	builtInDoubleVariables,
	builtInDoubleListVariables,
} from '../userInteraction/CasusSpecialVariables.js';

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

	onCreateVariableSelected(variableName: ?string): void {
		this.props.onVariableCreated(variableName ?? this.state.variableNameToCreate);
		this.setState({variableNameToCreate: ''});
	}

	onCancelClicked(): void {
		this.props.onCancelClicked();
		this.setState({variableNameToCreate: ''});
	}

	handleInputChange(newVariableName: string): void {
		this.setState({variableNameToCreate: newVariableName});
	}

	render(): React.Node {
		const enabled=this.getShouldBeAbleToClickCreateVariable();
		const prepopulatedVariables=this.getPrepopulatedValues();

		return (
			<Popup
				open={this.props.variableBlockToRename != null}
				closeOnDocumentClick={false}
				closeOnEscape={false}
				className="selectVariablePopup"
			>
				<div>
					<h1>Select Variable:</h1>

					{prepopulatedVariables.map(name => (
						<button
							className="btn normalPadding" 
							onClick= {() => this.onCreateVariableSelected(name)}
							key={name}>
							{name}
						</button>
					))}

					<div className="centered">
						<input className="normalPadding" onChange={(e) => this.handleInputChange(e.target.value)}/>

						<button 
							className="btn normalPadding" 
							disabled={!enabled}
							onClick= {() => this.onCreateVariableSelected(null)}> 
								{this.getCreateVariableText()}
						</button>

						<button
							className="btn normalPadding"
							onClick={() => this.onCancelClicked()}>
								Cancel
						</button>
					</div>
				</div>
			</Popup>
		);
	}

	getExpectedDataType(): DataType {
		if (this.props.variableBlockToRename == null) {
			return 'VOID';
		}
		return (this.props.variableBlockToRename instanceof GetVariableBlock) ?
			this.props.variableBlockToRename.dataType:
			this.props.variableBlockToRename.paramType;
	}

	canHaveConstants(): boolean {
		return this.props.variableBlockToRename != null &&
			this.props.variableBlockToRename instanceof GetVariableBlock;
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
		if (!this.canHaveConstants()) {
			return false;
		}

		return isLegalConstant(this.state.variableNameToCreate, this.getExpectedDataType());
	}

	getShouldBeAbleToClickCreateVariable(): boolean {
		return this.getTypedLegalVariableName() || this.getTypedLegalConstant();
	}

	//returns "Constant/Create Variable", "Constant", or "Create Variable"
	getCreateVariableText(): 'Enter a Constant or Variable To Create' | 'Constant' | 'Create Variable' {
		if (this.getTypedLegalVariableName() || !this.canHaveConstants()) {
			return 'Create Variable';
		}
		if (this.getTypedLegalConstant()) {
			return 'Constant';
		}
		return 'Enter a Constant or Variable To Create';
	}

	getPrepopulatedValues(): Array<string> {
		const dataType=this.getExpectedDataType();
		switch(dataType) {
			case 'INT':
				return this.getPrepoulatedInts();
			case 'DOUBLE':
				return this.getPrepoulatedDoubles();
			case 'BOOLEAN':
				return this.getPrepopulatedBooleans();
			case 'DOUBLE_LIST':
				return this.getPrepopulatedDoubleLists();
			default:
				return [];
		}
	}

	getPrepoulatedInts(): Array<string> {
		if (this.canHaveConstants()) {
			return ['0', '1', '2'].concat(builtInIntVariables);
		}
		else {
			return builtInIntVariables;
		}
	}

	getPrepoulatedDoubles(): Array<string> {
		if (this.canHaveConstants()) {
			return ['0.0', '1.0', '2.0', '3.1415926535'].concat(builtInDoubleVariables);
		}
		else {
			return builtInDoubleVariables;
		}
	}

	getPrepopulatedBooleans(): Array<string> {
		if (this.canHaveConstants()) {
			return [TRUE_KEYWORD, FALSE_KEYWORD].concat(builtInBooleanVariables);
		}
		else {
			return builtInBooleanVariables;
		}
	}

	getPrepopulatedDoubleLists(): Array<string> {
		return builtInDoubleListVariables;
	}

}

export default SelectVariablePopup;
