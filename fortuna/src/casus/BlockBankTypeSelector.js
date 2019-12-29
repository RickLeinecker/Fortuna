//@flow strict

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlockBankTypeSelector.css';

import type {BlockBankType} from './BlockBankType.js';

class BlockBankTypeSelector extends React.Component<{||}> {

	showSection(section: BlockBankType):void {
		console.log('showing section '+section);
	}

	render():React.Node {
		const style = {
			backgroundColor: '#111111',
			height: '100%',
			width: '200px'
		}

		//sections:
		//	- Control Flow (if / if-else / loops)
		//	- Variables (Set __ to / Get variables)
		//	- Math (angleTo, abs, +, -, *, /)
		//	- Logic (and / or / xor)
		//	- Lists
		return (
			<div style={style}>
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
