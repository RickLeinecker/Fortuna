//@flow strict

import * as React from 'react';
import "../Main.css";

type Props = {
	userName: string,
}

type State = {
};

class HealthBar extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		const canvas = this.refs.canvas;
		var ctx = canvas.getContext("2d");
		var playerHealth=100;
		ctx.fillStyle="#FF0000";
		ctx.fillRect(10,140,(playerHealth/100)*140,25);
		ctx.fillText("Player",0,0);
	  }

	render(): React.Node {
		return (
			<div style={{display:"inline-block"}}>
				{this.props.userName}:
				<canvas
				className="healthBarCanvas"
				style={{display:"inline-block"}}
				ref="canvas"
				/>
			</div>
		);
	}
}

export default HealthBar;
