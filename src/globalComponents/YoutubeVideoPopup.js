//@flow strict
import * as React from 'react';
import Popup from 'reactjs-popup';

type Props = {|
	youtubeVideoLinks: Array<string>
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
		const iframes=[];
		for (const link: string of this.props.youtubeVideoLinks) {
			iframes.push(
				<div key={link}>
					<iframe 
						key={link+'_Iframe'}
						src={link} 
						title='yotubeVideo' 
						height='480' 
						width='720'
					/>
					<br/>
				</div>
			);
		}
		return (
			<div>
				<button className="clearbtn" onClick={() => this.setState({youtubeVideoOpen: true})}>
					Help?
				</button>
				<Popup 
					open={this.state.youtubeVideoOpen}
					onClose={() => this.handleCloseClick()}
				>
					<div className="popup youtubePopup">
						<div className="row com-md-12 d-flex justify-content-center">
							{iframes}
						</div>
					</div>
				</Popup>
			</div>
		);
	}
}

export default YoutubeVideoPopup;
