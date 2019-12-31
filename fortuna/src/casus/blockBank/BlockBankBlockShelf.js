//@flow strict

import * as React from 'react';

import type {BlockBankType} from './BlockBankType.js';

type Props = {|
	selectedSection: BlockBankType
|};

class BlockBankBlockShelf extends React.Component<Props> {

	render(): React.Node {
		const style = {
			backgroundColor: '#eeeeee',
		};
		console.log('Selected section: '+this.props.selectedSection);
		return (
			<div style={style}>
				The currently selected section is {this.props.selectedSection}.
			</div>
		);
	}

}

export default BlockBankBlockShelf;
