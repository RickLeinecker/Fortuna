//@flow strict

import * as React from 'react';

class BlockPlaceHolder extends React.Component<{||}> {
	
	render(): React.Node {
		const blockStyle = {
			height: '10px'
			width: '30px',
		}
		return (
			<div style={blockStyle}>
				Command
			</div>
		);
	}
}

export default BlockPlaceHolder
