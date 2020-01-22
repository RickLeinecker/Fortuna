//@flow strict
import * as React from 'react';
import Popup from 'reactjs-popup';

import "./SelectVariablePopup.css";

type Props = {||};

type State = {|
	open: boolean;
	variableNameToCreate: string;
|};

class SelectVariablePopup extends React.Component<Props, State> {
	
	constructor(props: Props) {
		super(props);

		this.state={
			open: true,
			variableNameToCreate: ''
		}
	}

	onVariableSelected(variableSelected: string): void {
		this.setState({open: false});
	}

	onCreateVariableSelected(): void {
		this.setState({open: false});
	}

	handleInputChange(newVariableName: string): void {
		this.setState({variableNameToCreate: newVariableName});
	}

	render(): React.Node {
		return (
			<Popup
				open={this.state.open}
				closeOnDocumentClick={false}
				closeOnEscape={false}
			>
				<div>
					<h1>Select Variable:</h1>
					<button 
						className="btn normalPadding" 
						onClick= {() => this.onVariableSelected('Foo')}>
							Foo
					</ button>
					<button 
						className="btn normalPadding" 
						onClick= {() => this.onVariableSelected('i')}>
							i
					</ button>
					<button 
						className="btn normalPadding" 
						onClick= {() => this.onVariableSelected('Bar')}>
							Bar
					</ button>

					<div className="centered">
						<input className="normalPadding" onChange={(e) => this.handleInputChange(e.target.value)}/>
						<button 
							className="btn normalPadding" 
							disabled={this.state.variableNameToCreate.length===0}
							onClick= {() => this.onCreateVariableSelected()}> 
								Create Variable 
						</button>
					</div>
				</div>
			</Popup>
		);
	}

}

export default SelectVariablePopup;
