//@flow strict

import * as React from 'react';
import BlockBankTypeSelector from './BlockBankTypeSelector.js';

import type {BlockBankType} from './BlockBankType.js';

type Props = {||};
type State = {|
	selectedSection: BlockBankType	
|};

class BlockBank extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {selectedSection: 'CONTROL_FLOW'};
	}

	onSectionClicked = (section: BlockBankType) => {
		console.log('In block bank, section: '+section);
	}

	render(): React.Node {
		//display: 'inline-block',
		const style = {
			backgroundColor: '#ffaaff',
			height: '200px',
			justifyContent: 'center',
			textAlign: 'justify',
			width: '100%'
		};
		const leftSidebarStyle = {
			backgroundColor: '#aaaaff',
			height: '100%',
			width: '200px'
		};

		return (
			<div style={style}> 
				<BlockBankTypeSelector onSectionClicked={this.onSectionClicked} />
				<span style={leftSidebarStyle}>Block Bank</span>
			</div>
		);
	}

}

export default BlockBank;
