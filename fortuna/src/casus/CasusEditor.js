//@flow strict

import * as React from 'react';
import CasusBlock from './blocks/CasusBlock.js';
import SampleBlock from './blocks/SampleBlock.js';

type Props = {||}
type State = {||}

class CasusEditor extends React.Component<Props, State> {

	componentDidMount(): void {
		const canvas=this.refs.canvas;
		const ctx : CanvasRenderingContext2D = canvas.getContext('2d');
		//ctx.font= '16px Arial';
		//ctx.fillText("This is a block", 210, 75);
		const emptyBlock: CasusBlock = new SampleBlock();
		emptyBlock.precompBoundingBox(10, 10);
		emptyBlock.renderDFS(ctx);
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

