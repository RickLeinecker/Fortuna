import React from 'react'
import Modal from 'react-modal';
import EquipMenu from './EquipMenu';

export const chassis = () => {
  return (
    <Modal></Modal>
    <EquipMenu 
    checkPoints={checkPoints}
    updatePoints={updatePoints}
    updateComponent={updateComponent}
    divStyle={divStyle}
    componentList={componentList}
    currentPartIndex={currentPartIndex}
  />
  )
}