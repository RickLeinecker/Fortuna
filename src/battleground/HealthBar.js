//@flow strict

import * as React from 'react';
import "../Main.css";

type Props = {
	playersTankName: string,
	playersHealth: number
}

type State = {
};

class HealthBar extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
	}

	componentDidUpdate(prevProps) {
		if(prevProps.playersHealth !== this.props.playersHealth) {
			const canvas = this.refs.canvas;
			const ctx = canvas.getContext("2d");
			ctx.fillStyle="#FF0000";
			ctx.fillRect(10,140,(this.props.playersHealth/100)*140,25);
		}
	}

	render(): React.Node {
		return (
			<div style={{display:"inline-block"}}>
				{this.props.playersTankName}:
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
