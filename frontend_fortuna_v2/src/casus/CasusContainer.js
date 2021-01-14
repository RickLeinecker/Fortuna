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
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {||};

type State = {
	draggedBlocks: ?Array<CasusBlock>,
	tankName: string,
};

class CasusContainer extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		verifyLogin();
		this.state = {
			draggedBlocks: null,
			tankName: 'loading tank...'
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
					linkName='/Armory'
					returnName='Back to Armory'
					pageName={'Casus for '+this.state.tankName}
					youtubeLinks={['https://www.youtube.com/watch?v=-qkt0ciiLfE']}
				/>
        <Container fluid>
          <Row className="mt-12">
            <Col>
              <CasusEditor 
                draggedBlocks={this.state.draggedBlocks}
                onBlocksDragged={this.onBlocksDragged} 
                onDraggedBlocksReleased={this.onDraggedBlocksReleased}
              />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <BlockBank 
              draggedBlocks={this.state.draggedBlocks}
              onBlocksDragged={this.onBlocksDragged} 
              onDraggedBlocksReleased={this.onDraggedBlocksReleased}
              />
            </Col>
          </Row>
          <ToastContainer />
        </Container>
        <Container>
          <Row>
              <Col>
                <Link to="TrainingArena"><Button className="testCode">Test Code</Button></Link>
              </Col>
            </Row>
        </Container>
        <div class="footer">
          <p>Photo credit: <a href="https://i.pinimg.com/originals/2c/91/78/2c91787e2c132a075493760641745b71.gif">walpaperlist</a></p>
        </div>
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
