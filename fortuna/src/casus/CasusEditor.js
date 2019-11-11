//@flow strict

import * as React from 'react';

type Props = {||}
type State = {||}

class CasusEditor extends React.Component<Props, State> {

	componentDidMount(): void {
		const canvas=this.refs.canvas;
		console.log("Here "+canvas);
	}

	render(): React.Node {
		const style = {
			backgroundColor: '#ffffaa',
			height: '500px',
			justifyContent: 'center',
			width: '100%'
		};
		const canvasSytle = {
			backgroundColor: '#ffffff'
		}


		return (
			<div style={style}>
				Casus Editor
				<canvas ref="canvas" width={640} height={425} style={style}/>
			</div>
		);
	}

}

export default CasusEditor

