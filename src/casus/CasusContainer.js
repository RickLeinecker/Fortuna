//@flow strict

import * as React from 'react';
import BlockBank from './blockBank/BlockBank.js';
import CasusEditor from './CasusEditor.js';
import CasusBlock from './blocks/CasusBlock.js';
import Navbar from '../globalComponents/Navbar.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import getTankForCasus from '../globalComponents/getTankForCasus.js';
import {getAllUsersTanks} from '../globalComponents/apiCalls/tankAPIIntegration.js';
import {ToastContainer} from 'react-toastify';

type Props = {||};

type State = {
	draggedBlocks: ?Array<CasusBlock>,
	tankName: string,
};

class CasusContainer extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		verifyLogin();
		this.state = {
			draggedBlocks: null,
			tankName: 'loading tank...'
		};

		const tankId=getTankForCasus();
		getAllUsersTanks(allTanks => {
			const tankEditing = allTanks.find(t => t._id === tankId);
			this.setState({tankName: tankEditing?.tankName ?? ''});
		});
	}

	render(): React.Node {
		return (
			<div className="haveScorebarIfSmall">
				<Navbar
					linkName='/Armory'
					returnName='Back to Armory'
					pageName={'Casus for '+this.state.tankName}
					youtubeLinks={['https://www.youtube.com/watch?v=-qkt0ciiLfE']}
				/>
				<BlockBank 
					draggedBlocks={this.state.draggedBlocks}
					onBlocksDragged={this.onBlocksDragged} 
					onDraggedBlocksReleased={this.onDraggedBlocksReleased}
				/>
				<div className="undoBtnArea">
					<button className="undoBtn">Undo</button>
					<button className="undoBtn" disabled={true}>Redo</button>
				</div>
				<CasusEditor 
					draggedBlocks={this.state.draggedBlocks}
					onBlocksDragged={this.onBlocksDragged} 
					onDraggedBlocksReleased={this.onDraggedBlocksReleased}
				/>
				<ToastContainer />
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
