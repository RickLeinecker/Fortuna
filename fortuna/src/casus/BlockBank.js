//@flow strict

import * as React from 'react';
import BlockBankTypeSelector from './BlockBankTypeSelector.js';

class BlockBank extends React.Component<{||}> {

	render(): React.Node {
		//display: 'inline-block',
		const style = {
			backgroundColor: '#ffaaff',
			height: '200px',
			justifyContent: 'center',
			textAlign: 'justify',
			width: '100%'
		};
		const leftSidebarStyle = {
			backgroundColor: '#aaaaff',
			height: '100%',
			width: '200px'
		};

		return (
			<div style={style}> 
				<BlockBankTypeSelector />
				<span style={leftSidebarStyle}>Block Bank</span>
			</div>
		);
	}

}

export default BlockBank;
