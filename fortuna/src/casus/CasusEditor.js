//@flow strict

import * as React from 'react';
import CasusBlock from './blocks/CasusBlock.js';
import OrBlock from './blocks/OrBlock.js';
import VariableBlock from './blocks/VariableBlock.js';
import IntEqualsBlock from './blocks/IntEqualsBlock.js';
import SetVariableBlock from './blocks/SetVariableBlock.js';
import ForBlock from './blocks/ForBlock.js';
import ContainerBlock from './blocks/ContainerBlock.js';
import Vec from './blocks/Vec.js';

type Props = {||}
type State = {|
	containerBlock: CasusBlock
|}

type ClickEvent = {
	clientX: number,
	clientY: number
}

class CasusEditor extends React.Component<Props, State> {

	componentDidMount(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

		const emptyBlock: CasusBlock = new OrBlock();
		const testVariable: CasusBlock = new VariableBlock('DOUBLE', 'Some variable with a really long name');
		const testEquals: IntEqualsBlock = new IntEqualsBlock();
		const setIntVariable: CasusBlock = new SetVariableBlock('answer', 'INT');
		const testForLoop: CasusBlock = new ForBlock();

		const containerBlock: ContainerBlock = new ContainerBlock();

		containerBlock.children.push(emptyBlock);
		containerBlock.children.push(testVariable);
		containerBlock.children.push(testEquals);
		containerBlock.children.push(setIntVariable);
		containerBlock.children.push(testForLoop);

		containerBlock.precompBounds();
		containerBlock.precompXY(0, 0);
		containerBlock.renderDFS(ctx);

		this.setState({
			containerBlock: containerBlock,
		});
	}

	processMouseClick(clickEvent: ClickEvent): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const boundingBox: ClientRect = canvas.getBoundingClientRect();

		const x = clickEvent.clientX - boundingBox.left;
		const y = clickEvent.clientY - boundingBox.top;

		this.state.containerBlock.unhighlightEverything();
		const deepestClicked: CasusBlock = this.state.containerBlock.getDeepestChildContainingPoint(new Vec(x, y));
		deepestClicked.highlighted=true;
		
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		this.state.containerBlock.renderDFS(ctx);
	}

	render(): React.Node {
		const style = {
			backgroundColor: '#ffffaa',
			height: '500px',
			justifyContent: 'center',
			width: '100%'
		};
		const canvasStyle = {
			backgroundColor: '#ffffff'
		}

		return (
			<div style={style}>
				<canvas 
					height={425} 
					onClick={e => this.processMouseClick(e)}
					ref="canvas" 
					style={canvasStyle}
					width={640} />
			</div>
		);
	}

}

export default CasusEditor;

