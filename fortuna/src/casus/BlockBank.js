//@flow strict

import * as React from 'react';

class BlockBank extends React.Component<{||}> {

	render(): React.Node {
		const style = {
			backgroundColor: '#ffaaff',
			height: '200px',
			justifyContent: 'center',
			width: '100%'
		};

		return (
			<div style={style}> 
				Block Bank 
			</div>
		);
	}
}

export default BlockBank;
