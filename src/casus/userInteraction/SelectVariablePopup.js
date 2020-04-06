//@flow strict
import * as React from 'react';
import Popup from 'reactjs-popup';
import SetVariableBlock from '../blocks/SetVariableBlock.js';
import GetVariableBlock from '../blocks/GetVariableBlock.js';
import DefineFunctionBlock from '../blocks/DefineFunctionBlock.js';
import CallFunctionBlock from '../blocks/CallFunctionBlock.js';
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
	variableBlockToRename: SetVariableBlock | GetVariableBlock | DefineFunctionBlock | CallFunctionBlock | null,
	onCancelClicked: () => void,
	onVariableCreated: (variableName: string) => void,
	getExistingVariableNames: (dataType: DataType) => Array<string>
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
		const selectVariableOrFunctionText='Select '+this._functionOrVariableWord();

		return (
			<Popup
				open={this.props.variableBlockToRename != null}
				closeOnDocumentClick={false}
				closeOnEscape={false}

			>
				<div className="popup centered">
					<h2>{selectVariableOrFunctionText}</h2>

					{prepopulatedVariables.map(name => (
						<button
							className="popupbtn normalPadding" 
							onClick= {() => this.onCreateVariableSelected(name)}
							key={name}>
							{name}
						</button>
					))}
					<br/>
					<input className="inputText" onChange={(e) => this.handleInputChange(e.target.value)}/>
					<br/>
					<button 
						className="popupbtn" 
						disabled={!enabled}
						onClick= {() => this.onCreateVariableSelected(null)}> 
							{this.getCreateVariableText()}
					</button>

					<button
						className="cancelbtn"
						onClick={() => this.onCancelClicked()}>
							Cancel
					</button>
				</div>
			</Popup>
		);
	}

	getExpectedDataType(): DataType {
		if (this.props.variableBlockToRename == null) {
			return 'VOID';
		}
		if (this.props.variableBlockToRename instanceof CallFunctionBlock || 
			this.props.variableBlockToRename instanceof DefineFunctionBlock) {
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
	getCreateVariableText(): string {
		if (this.getTypedLegalVariableName() || !this.canHaveConstants()) {
			return 'Create '+this._functionOrVariableWord();
		}
		if (this.getTypedLegalConstant()) {
			return 'Constant';
		}
		return 'Enter a Constant or '+this._functionOrVariableWord()+' To Create';
	}

	getPrepopulatedValues(): Array<string> {
		const dataType=this.getExpectedDataType();
		let prepopulatedValues=[];
		switch(dataType) {
			case 'INT':
				prepopulatedValues = this.getPrepoulatedInts();
				break;
			case 'DOUBLE':
				prepopulatedValues = this.getPrepoulatedDoubles();
				break;
			case 'BOOLEAN':
				prepopulatedValues = this.getPrepopulatedBooleans();
				break;
			case 'DOUBLE_LIST':
				prepopulatedValues = this.getPrepopulatedDoubleLists();
				break;
			default:
				prepopulatedValues = [];
				break;
		}
		return prepopulatedValues.concat(this.props.getExistingVariableNames(dataType));
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

	_isFunctionBlock(): boolean {
		return this.props.variableBlockToRename instanceof CallFunctionBlock ||
			this.props.variableBlockToRename instanceof DefineFunctionBlock;
	}

	_functionOrVariableWord(): string {
		return this._isFunctionBlock()?'Function':'Variable';
	}

}

export default SelectVariablePopup;
