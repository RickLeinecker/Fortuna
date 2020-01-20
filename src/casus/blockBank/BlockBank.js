//@flow strict

import * as React from 'react';
import BlockBankTypeSelector from './BlockBankTypeSelector.js';
import BlockBankBlockShelf from './BlockBankBlockShelf.js';
import CasusBlock from '../blocks/CasusBlock.js';
import './BlockBank.css';

import type {BlockBankType} from './BlockBankType.js';

type Props = {|
	draggedBlocks: ?Array<CasusBlock>,
	onBlocksDragged: (Array<CasusBlock>) => void,
	onDraggedBlocksReleased: () => void
|};

type State = {|
	selectedSection: BlockBankType	
|};

class BlockBank extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {selectedSection: 'CONTROL_FLOW'};
	}

	onSectionClicked = (section: BlockBankType) => {
		this.setState({selectedSection: section});
	}

	render(): React.Node {
		return (
			<div className="flexContainer"> 
				<div className="flexLeft">
					<BlockBankTypeSelector onSectionClicked={this.onSectionClicked} />
				</div>
				<div className="flexRight">
					<BlockBankBlockShelf
						selectedSection={this.state.selectedSection} 
						{...this.props}
					/>
				</div>
			</div>
		);
	}

}

export default BlockBank;
