//@flow strict

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlockBankTypeSelector.css';

import type {BlockBankType} from './BlockBankType.js';

type Props = {|
	onSectionClicked: (section: BlockBankType) => void
|};

class BlockBankTypeSelector extends React.Component<Props> {

	showSection(section: BlockBankType):void {
		this.props.onSectionClicked(section);
	}

	render():React.Node {

		//sections:
		//	- Control Flow (if / if-else / loops)
		//	- Variables (Set __ to / Get variables)
		//	- Math (angleTo, abs, +, -, *, /)
		//	- Logic (and / or / xor)
		//	- Lists
		return (
			<div className="blockBankTypeSelectorDiv">
				<button 
					className="btn btn-secondary paddedButton" 
					onClick={() => this.showSection('CONTROL_FLOW')}>
						Control Flow
				</button>
				<button 
					className="btn btn-secondary paddedButton" 
					onClick={() => this.showSection('VARIABLES')}>
						Variables
				</button>
				<button 
					className="btn btn-secondary paddedButton" 
					onClick={() => this.showSection('MATH')}>
						Math
				</button>
				<button 
					className="btn btn-secondary paddedButton" 
					onClick={() => this.showSection('LOGIC')}>
						Logic
				</button>
				<button 
					className="btn btn-secondary paddedButton" 
					onClick={() => this.showSection('LISTS')}>
						Lists
				</button>
			</div>
		);
	}

}

export default BlockBankTypeSelector;
