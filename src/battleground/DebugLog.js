//@flow strict

import * as React from 'react';

import './DebugLog.css';

type Props = {|
	debugLines: Array<string>,
|};

class DebugLog extends React.Component<Props> {

	render(): React.Node {
		return (
			<div className='debugLog'>
				<h4 className='debugLogHeader'>Tank Printouts</h4>
				{this.props.debugLines.map((text, index) =>
					<div key={index} className="debugEntry">
						{text}
					</div>
				)}
			</div>
		);
	}
}

export default DebugLog;
