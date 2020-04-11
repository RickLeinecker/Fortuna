//@flow strict
import * as React from 'react';
import Popup from 'reactjs-popup';

type Props = {|
	youtubeVideoLink: string
|}; 

type State = {|
	youtubeVideoOpen: boolean
|}
	

// Youtube video popup, takes in a youtube video link and displays it in the website
class YoutubeVideoPopup extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			youtubeVideoOpen: false
		}
	}

	handleCloseClick(): void {
		this.setState({youtubeVideoOpen: false});
	}

	render(): React.Node {
		return (
			<div>
				<h6 className="helpLink" onClick={() => this.setState({youtubeVideoOpen: true})}>
					Help?
				</h6>
				<Popup 
					open={this.state.youtubeVideoOpen}
					onClose={() => this.handleCloseClick()}
				>
					<div className="popup">
						<div className="row com-md-12 d-flex justify-content-center">
							<iframe src={this.props.youtubeVideoLink} title='youtubeVideo' height='480' width='720'></iframe>
						</div>
					</div>
				</Popup>
			</div>
		);
	}
}

export default YoutubeVideoPopup;
