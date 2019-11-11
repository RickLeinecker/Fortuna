//@flow strict

import * as React from 'react';

type Props = {|
	
|};

type State = {||};

class BlockPlaceHolder extends React.Component<Props, State> {
	
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
