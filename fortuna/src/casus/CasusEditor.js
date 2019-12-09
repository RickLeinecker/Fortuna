//@flow strict

import * as React from 'react';
import CasusBlock from './blocks/CasusBlock.js';
import OrBlock from './blocks/OrBlock.js';
import VariableBlock from './blocks/VariableBlock.js';
import IntEqualsBlock from './blocks/IntEqualsBlock.js';
import SetVariableBlock from './blocks/SetVariableBlock.js';
import ForBlock from './blocks/ForBlock.js';

type Props = {||}
type State = {||}

type ClickEvent = {
	clientX: number,
	clientY: number
}

class CasusEditor extends React.Component<Props, State> {

	componentDidMount(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		//ctx.font= '16px Arial';
		//ctx.fillText("This is a block", 210, 75);
		const emptyBlock: CasusBlock = new OrBlock();
		emptyBlock.precompBounds();
		emptyBlock.precompXY(10, 10);
		emptyBlock.renderDFS(ctx);

		const testVariable: CasusBlock = new VariableBlock('DOUBLE', 'Some variable with a really long name');
		testVariable.precompBounds();
		testVariable.precompXY(10, 90);
		testVariable.renderDFS(ctx);

		const testEquals: IntEqualsBlock = new IntEqualsBlock();
		testEquals.lChild=new VariableBlock('INT', 'answer');
		testEquals.rChild=new VariableBlock('INT', 'otherAnswer');
		testEquals.precompBounds();
		testEquals.precompXY(10, 150);
		testEquals.renderDFS(ctx);

		const setIntVariable: CasusBlock = new SetVariableBlock('answer', 'INT');
		setIntVariable.precompBounds();
		setIntVariable.precompXY(10, 200);
		setIntVariable.renderDFS(ctx);

		const testForLoop: CasusBlock = new ForBlock();
		testForLoop.precompBounds();
		testForLoop.precompXY(10, 260);
		testForLoop.renderDFS(ctx);
	}

	processMouseClick(clickEvent: ClickEvent): void {
		console.log(clickEvent);
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const boundingBox: ClientRect = canvas.getBoundingClientRect();

		const x = clickEvent.clientX - boundingBox.left;
		const y = clickEvent.clientY - boundingBox.top;

		console.log('Processing click event at '+x+' '+y);
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

