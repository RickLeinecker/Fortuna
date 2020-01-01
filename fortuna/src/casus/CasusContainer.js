//@flow strict

import * as React from 'react';
import BlockBank from './blockBank/BlockBank.js';
import CasusEditor from './CasusEditor.js';
import CasusBlock from './blocks/CasusBlock.js';
import ForBlock from './blocks/ForBlock.js';
import './CasusContainer.css';

type Props = {||};

type State = {
	draggedBlocks: ?Array<CasusBlock>
};

class CasusContainer extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			//draggedBlocks: null
			draggedBlocks: [new ForBlock()]
		};
	}

	render(): React.Node {
		return (
			<div className="casusContainerDiv">
				<BlockBank 
					draggedBlocks={this.state.draggedBlocks}
					onBlocksDragged={this.onBlocksDragged} 
					onDraggedBlocksReleased={this.onDraggedBlocksReleased}
				/>
				<CasusEditor 
					draggedBlocks={this.state.draggedBlocks}
					onBlocksDragged={this.onBlocksDragged} 
					onDraggedBlocksReleased={this.onDraggedBlocksReleased}
				/>
			</div>
		);
	}

	onBlocksDragged = (draggedBlocks: Array<CasusBlock>): void  => {
		this.setState({
			draggedBlocks: draggedBlocks
		});
	}

	onDraggedBlocksReleased = (): void => {
		this.setState({
			draggedBlocks: null
		});
	}
}

export default CasusContainer;
