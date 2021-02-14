import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Modal from 'react-modal'
import Explanation from './Explanation'

function Help() {
  const [controlModalIsOpen, setControlModalIsOpen] = useState(false);
  const [variablesModalIsOpen, setVariablesModalIsOpen] = useState(false);
  const [mathModalIsOpen, setMathModalIsOpen] = useState(false);

  const [doublesModalIsOpen, setDoublesModalIsOpen] = useState(false);
  const [logicModalIsOpen, setLogicModalIsOpen] = useState(false);
  const [integerModalIsOpen, setIntegerModalIsOpen] = useState(false);
  
  const [listsModalIsOpen, setListsModalIsOpen] = useState(false);
  const [debugModalIsOpen, setDebugModalIsOpen] = useState(false);
  const [functionsModalIsOpen, setFunctionsModalIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('body');
  })

  const choices = {
    CONTROL_FLOW: 'CONTROL_FLOW',
    VARIABLES: 'VARIABLES',
    MATH: 'MATH',
    DOUBLES: 'DOUBLES',
    LOGIC: 'LOGIC',
    INTEGERS: 'INTEGERS',
    LISTS: 'LISTS',
    DEBUG: 'DEBUG',
    FUNCTIONS: 'FUNCTIONS'
  }

  const openModals = (choice) => {
    switch(choice)
    {
      case choices.CONTROL_FLOW: 
        setControlModalIsOpen(true);
        break;
      case choices.VARIABLES:
        setVariablesModalIsOpen(true)
        break;
      case choices.MATH:
        setMathModalIsOpen(true);
        break;
      case choices.DOUBLES:
        setDoublesModalIsOpen(true);
        break;
      case choices.LOGIC:
        setLogicModalIsOpen(true);
        break;
      case choices.INTEGERS:
        setIntegerModalIsOpen(true);
        break;
      case choices.LISTS:
        setListsModalIsOpen(true);
        break;
      case choices.DEBUG:
        setDebugModalIsOpen(true);
        break;
      case choices.FUNCTIONS:
        setFunctionsModalIsOpen(true);
        break;
      default:
        break;
    }
  }

  const closeModals = (choice) => {
    switch(choice)
    {
      case choices.CONTROL_FLOW: 
        setControlModalIsOpen(false);
        break;
      case choices.VARIABLES:
        setVariablesModalIsOpen(false)
        break;
      case choices.MATH:
        setMathModalIsOpen(false);
        break;
      case choices.DOUBLES:
        setDoublesModalIsOpen(false);
        break;
      case choices.LOGIC:
        setLogicModalIsOpen(false);
        break;
      case choices.INTEGERS:
        setIntegerModalIsOpen(false);
        break;
      case choices.LISTS:
        setListsModalIsOpen(false);
        break;
      case choices.DEBUG:
        setDebugModalIsOpen(false);
        break;
      case choices.FUNCTIONS:
        setFunctionsModalIsOpen(false);
        break;
      default:
        break;
    }
  }


  const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      backgroundColor: "#012074",
      borderStyle: "solid"
    }
  }

  const pstyle = {
    color: 'white',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
  }

  return (
    <div>
      <Container fluid>
        <p style={pstyle}>What would you like more information on?</p>
        <Row>
          <Col md={4}>
            <Button onClick={() => openModals(choices.CONTROL_FLOW)}>Control Flow</Button>
            <Modal
              isOpen={controlModalIsOpen}
              style={customStyles}
              contentLabel="Control Modal"
            >
              <Explanation choice={choices.CONTROL_FLOW} />
              <div className="divider-top" />
              <Button onClick={() => closeModals(choices.CONTROL_FLOW)}>Close</Button>
            </Modal>
          </Col>
          <Col md={4}>
            <Button onClick={() => openModals(choices.VARIABLES)}>Variables</Button>
            <Modal
              isOpen={variablesModalIsOpen}
              style={customStyles}
              contentLabel="Variables Modal"
            >
              <Explanation choice={choices.VARIABLES} />
              <Button onClick={() => closeModals(choices.VARIABLES)}>Close</Button>
            </Modal>
          </Col>
          <Col  md={4}>
            <Button onClick={() => openModals(choices.MATH)}>Math</Button>
            <Modal
              isOpen={mathModalIsOpen}
              style={customStyles}
              contentLabel="Math Modal"
            >
              <Explanation choice={choices.MATH} />
              <Button onClick={() => closeModals(choices.MATH)}>Close</Button>
            </Modal>
          </Col>
          {/* <Col md={6}/> */}
        </Row>
        <div className="divider"/>
        <Row>
          <Col md={4}>
          <Button onClick={() => openModals(choices.DOUBLES)}>Doubles</Button>
            <Modal
              isOpen={doublesModalIsOpen}
              style={customStyles}
              contentLabel="Doubles Modal"
            >
              <Explanation choice={choices.DOUBLES} />
              <Button onClick={() => closeModals(choices.DOUBLES)}>Close</Button>
            </Modal>
          </Col>
          <Col md={4}>
            <Button onClick={() => openModals(choices.LOGIC)}>Logic</Button>
            <Modal
              isOpen={logicModalIsOpen}
              style={customStyles}
              contentLabel="Logic Modal"
            >
              <Explanation choice={choices.LOGIC} />
              <Button onClick={() => closeModals(choices.LOGIC)}>Close</Button>
            </Modal>
          </Col>
          <Col md={4}>
            <Button onClick={() => openModals(choices.INTEGERS)}>Integers</Button>
            <Modal
              isOpen={integerModalIsOpen}
              style={customStyles}
              contentLabel="Integers Modal"
            >
              <Explanation choice={choices.INTEGERS} />
              <Button onClick={() => closeModals(choices.INTEGERS)}>Close</Button>
            </Modal>
          </Col>
          {/* <Col md={6}/> */}
        </Row>
        <div className="divider"/>
        <Row>
          <Col md={4}>
            <Button onClick={() => openModals(choices.LISTS)}>Lists</Button>
            <Modal
              isOpen={listsModalIsOpen}
              style={customStyles}
              contentLabel="Lists Modal"
            >
              <Explanation choice={choices.LISTS} />
              <Button onClick={() => closeModals(choices.LISTS)}>Close</Button>
            </Modal>
          </Col>
          <Col md={4}>
            <Button onClick={() => openModals(choices.DEBUG)}>Debug</Button>
            <Modal
              isOpen={debugModalIsOpen}
              style={customStyles}
              contentLabel="Debug Modal"
            >
              <Explanation choice={choices.DEBUG} />
              <Button onClick={() => closeModals(choices.DEBUG)}>Close</Button>
            </Modal>
          </Col>
          <Col md={4}>
            <Button onClick={() => openModals(choices.FUNCTIONS)}>Functions</Button>
            <Modal
              isOpen={functionsModalIsOpen}
              style={customStyles}
              contentLabel="Function Modal"
            >
              <Explanation choice={choices.FUNCTIONS} />
              <Button onClick={() => closeModals(choices.FUNCTIONS)}>Close</Button>
            </Modal>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Help
