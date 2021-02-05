import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Modal from 'react-modal'

function Help() {
  const [controlModalIsOpen, setControlModalIsOpen] = useState(false);
  const [variablesModalIsOpen, setVariablesModalIsOpen] = useState(false);
  const [mathModalIsOpen, setMathModalIsOpen] = useState(false);

  const [doublesModalIsOpen, setDoublesModalIsOpen] = useState(false);
  const [logicModalIsOpen, setLogicModalIsOpen] = useState(false);
  const [integerModalIsOpen, setIntegerModalIsOpen] = useState(false);
  
  const [listsModalIsOpen, setListsModalIsOpen] = useState(false);
  const [debugModalIsOpen, setDebugsModalIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('body');
  })

  const choices = {
    CONTROL_FLOW: 'CONTROL FLOW',
    VARIABLES: 'VARIABLES',
    MATH: 'MATH',
    DOUBLES: 'DOUBLES',
    LOGIC: 'LOGIC',
    INTEGERS: 'INTEGERS',
    LISTS: 'LISTS',
    DEBUG: 'DEBUG'
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
        setDebugsModalIsOpen(true);
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
        setDebugsModalIsOpen(false);
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
    }
  }

  return (
    <div>
      <Container fluid>
        <p style={{color: "white", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>What would you like more information on?</p>
        <Row>
          <Col md={4}>
            <Button onClick={() => openModals(choices.CONTROL_FLOW)}>Control Flow</Button>
            <Modal
              isOpen={controlModalIsOpen}
              style={customStyles}
              contentLabel="Control Modal"
            >
              <p>Info on Control Flow</p>
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
              <p>Info on Variables</p>
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
              <p>Info on Math</p>
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
              <p>Info on Doubles</p>
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
              <p>Info on Logic</p>
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
              <p>Info on Integers</p>
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
              <p>Info on Lists</p>
              <Button onClick={() => closeModals(choices.LISTS)}>Close</Button>
            </Modal>
          </Col>
          <Col md={4}>
            <Button onClick={() => openModals(choices.LISTS)}>Lists</Button>
            <Modal
              isOpen={listsModalIsOpen}
              style={customStyles}
              contentLabel="Lists Modal"
            >
              <p>Info on Lists</p>
              <Button onClick={() => closeModals(choices.LISTS)}>Close</Button>
            </Modal>
          </Col>
          {/* <Col md={8}/> */}
        </Row>
      </Container>
    </div>
  )
}

export default Help
