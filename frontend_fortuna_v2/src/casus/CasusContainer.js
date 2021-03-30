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
import getFirstTimeHomeAPICall from "../globalComponents/apiCalls/getFirstTimeHomeAPICall";
import setFirstTimeHomeAPICall from "../globalComponents/apiCalls/setFirstTimeHomeAPICall";
import setFirstTimeCasusAPICall from "../globalComponents/apiCalls/setFirstTimeCasusAPICall";
import getFirstTimeCasusAPICall from "../globalComponents/apiCalls/getFirstTimeCasusAPICall";

type Props = {||};

type State = {
	draggedBlocks: ?Array<CasusBlock>,
	tankName: string,
};

class CasusContainer extends React.Component<Props, State> {

	componentDidMount(): void {
    document.body.style.backgroundRepeat = "round"
    const ref = this.refs.navbarRef
        getFirstTimeCasusAPICall((res) => {
            console.log("RES: ", res);
            this.setState({run:res});
        })

        if(this.state.run == true)
        {
            setFirstTimeCasusAPICall();
        }

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
          disableBeacon: true,
          content: "Welcome to Casus, the simplified code editor that allows you to program your tanks movement and actions",
        },
        {
          target: ".blockShelf",
          content: "These code blocks can be dragged into the canvas above to create code. If you're placing code blocks inside of each other, make sure the shapes match!"
        },
        {
          target: ".blockTypeSelect",
          content: "Here are different categories for your code blocks to help you find different code types and shapes"
        },
          {
              target: ".help",
              content: "This section is for help on basic programming concepts and how these code types relate to real world code"
          },
        {
          target: ".testCode",
          content: "Click here to test your code"
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

    componentDidMount(): void {
        document.body.style.backgroundRepeat = "round"
        const ref = this.refs.navbarRef
        getFirstTimeCasusAPICall((res) => {
            console.log("RES: ", res);
            this.setState({run:res});

            if(this.state.run == true)
            {
                setFirstTimeCasusAPICall();
            }
        })


    }

	render(): React.Node {
		return (
      <div id="Parent" className='background-image'>
        <MainNavbar
          className='background-image'
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
      </div>
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
