//@flow strict

import * as React from 'react';
import './CasusEditor.css'
import BlockBank from './blockBank/BlockBank.js';
import CasusEditor from './CasusEditor.js';
import CasusBlock from './blocks/CasusBlock.js';
import MainNavbar from '../globalComponents/MainNavbar.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import getTankForCasus from '../globalComponents/getTankForCasus.js';
import {getAllUsersTanks} from '../globalComponents/apiCalls/tankAPIIntegration.js';
import {ToastContainer} from 'react-toastify';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import JoyRide from 'react-joyride';

type Props = {||};

type State = {
	draggedBlocks: ?Array<CasusBlock>,
	tankName: string,
};

class CasusContainer extends React.Component<Props, State> {

	componentDidMount(): void {
		document.body.style.backgroundImage = "url('/login_background.gif')"
    document.body.style.backgroundRepeat = "round"
    const ref = this.refs.navbarRef
	}

	constructor(props: Props) {
		super(props);
		verifyLogin();
		this.state = {
			draggedBlocks: null,
      tankName: 'loading tank...',
      tour_steps: [
        {
          target: ".mt-12",
          content: "code canvas",
        },
        {
          target: ".blockTypeSelect",
          content: "choose module type"
        },
        {
          target: ".blockShelf",
          content: "choose a module for a type"
        },
        {
          target: ".testCode",
          content: "test code here"
        }
      ],
      run: false
		};

		const tankId=getTankForCasus();
		getAllUsersTanks(allTanks => {
			const tankEditing = allTanks.find(t => t._id === tankId);
			this.setState({tankName: tankEditing?.tankName ?? ''});
		});
	}

	render(): React.Node {
		return (
      <>
        <MainNavbar
          linkName="/Armory"
          returnName="To Armory"
          pageName="Armory"
          ref="navbarRef"
          //youtubeLinks={[
          //	'https://www.youtube.com/watch?v=kEClhrMWogY',
          //	'https://www.youtube.com/watch?v=1nnY9wlLOYU'
          //]}
        />
        <Container fluid>
          <Row className="mt-12">
            <Col md={12} className="editor">
              <CasusEditor 
                draggedBlocks={this.state.draggedBlocks}
                onBlocksDragged={this.onBlocksDragged}
                onDraggedBlocksReleased={this.onDraggedBlocksReleased}
              />
            </Col>
          </Row>
          <br></br>
          <BlockBank
            draggedBlocks={this.state.draggedBlocks}
            onBlocksDragged={this.onBlocksDragged}
            onDraggedBlocksReleased={this.onDraggedBlocksReleased}
          />
          <Row>
            <Col>
              <Link to="TrainingArena"><Button className="testCode">Test Code</Button></Link>
            </Col>
          </Row>
          <ToastContainer />
          <JoyRide 
            steps={this.state.tour_steps}
            run={this.state.run}
            continuous={true} 
            styles={{
              options: {
                zIndex: 1000,
                spotlightShadow: 'blue'
              }
            }}
          />
          <div class="footer">
              <p>Photo credit: <a href="https://i.pinimg.com/originals/2c/91/78/2c91787e2c132a075493760641745b71.gif">walpaperlist</a></p>
          </div>
        </Container>
      </>
		);
	}

	onBlocksDragged = (draggedBlocks: Array<CasusBlock>): void  => {
		this.setState({
			draggedBlocks: draggedBlocks
		});
	}

	onDraggedBlocksReleased = (): void => {
		this.setState({
			draggedBlocks: null
		});
	}
}

export default CasusContainer;
