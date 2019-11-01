//@flow strict

import * as React from 'react';

class BlockBank extends React.Component<{||}> {

	render(): React.Node {
		const style = {
			backgroundColor: '#ffaaff',
			height: '100px',
			justifyContent: 'center',
			width: '100%'
		};
		const leftSidebarStyle = {
			backgroundColor: '#aaaaff',
			height: '100%',
			width: '200px'
		};

		return (
			<div style={style}> 
				<div style={leftSidebarStyle}>
					Block Bank 
				</div>
				<div>
					Other stuff goes here
				</div>
			</div>
		);
	}
}

export default BlockBank;
