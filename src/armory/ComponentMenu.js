//@flow strict

import * as React from 'react';
import type {ComponentType} from '../globalcomponents/ComponentType.js';
import RenderTank from '../globalComponents/'

type Props = {|
	currentTank: ?Array<ComponentType>,
	currentInventory: ?Array<ComponentType>
|};

type State = {|
	tank: ?Array<ComponentType>,
	inventory: ?Array<ComponentType>
|};

class ComponentMenu extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			tank: currentTank,
			inventory: currentInventory
		}
	}

	componentDidMount(): void {

	}

	loadComponents(): React.Node {
		
		
	}



	render(): React.Node {
		return (
			<div>
				<div className="column armorymiddle">
					<RenderTank tank={this.state.tank} />
				</div>
				<div className="column armoryright">
					{this.loadComponents}
				</div>
			</div>
		);
	}
}

/*
<h6>Chassis</h6>
				<select className="tankComponentMenu">
					{this.loadChassis}
				</select>
				<h6>Weapons</h6>
				<select className="tankComponentMenu">
					{this.loadWeapons}
				</select>
				<h6>Scanners</h6>
				<select className="tankComponentMenu">
					{this.loadScanners}
				</select>
				<h6>Jammers</h6>
				<select className="tankComponentMenu">
					{this.loadJammers}
				</select>
				<h6>Treads</h6>
				<select className="tankComponentMenu">
					{this.loadTreads}
				</select>
				<h6>Single-Use Items</h6>
				<select className="tankComponentMenu">
					{this.loadItems}
				</select>

*/