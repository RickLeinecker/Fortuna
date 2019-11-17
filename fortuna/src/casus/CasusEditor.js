import * as React from 'react';
import CasusBlock from './blocks/CasusBlock.js';
import OrBlock from './blocks/OrBlock.js';
import VariableBlock from './blocks/VariableBlock.js';
import IntEqualsBlock from './blocks/IntEqualsBlock.js';
import SetVariableBlock from './blocks/SetVariableBlock.js';
import ForBlock from './blocks/ForBlock.js';

type Props = {||}
type State = {||}

class CasusEditor extends React.Component<Props, State> {

	componentDidMount(): void {
		const canvas=this.refs.canvas;
		const ctx : CanvasRenderingContext2D = canvas.getContext('2d');
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
				<canvas ref="canvas" width={640} height={425} style={canvasStyle}/>
			</div>
		);
	}

}

export default CasusEditor;