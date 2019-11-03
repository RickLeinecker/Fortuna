//@flow strict

import * as React from 'react';

class BlockPlaceHolder extends React.Component<{||}> {
	
	render(): React.Node {
		const blockStyle = {
			alignSelf: 'flex-end',
			backgroundColor: '#00aa0f',
			height: '10px',
			width: '30px'
		}
		return (
			<span style={blockStyle}>
				Command
			</span>
		);
	}
}

export default BlockPlaceHolder
