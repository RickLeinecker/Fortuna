//@flow strict

import * as React from 'react';
import BlockBank from './blockBank/BlockBank.js';
import CasusEditor from './CasusEditor.js';
import CasusBlock from './blocks/CasusBlock.js';
import ForBlock from './blocks/ForBlock.js';

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
		const containerStyle = {
			padding: 20,
			backgroundColor: '#00ff00'
		};

		return (
			<div style={containerStyle}>
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
