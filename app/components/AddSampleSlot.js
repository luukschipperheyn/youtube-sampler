//@flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addSampleSlot } from '../actions/sampler'

const AddSampleSlot = ({ dispatch }) => {
  const handleClick = () => {
    dispatch(addSampleSlot())
  }
  return (
    <div>
      <a onClick={handleClick}>add</a>
    </div>
  )
}

export default connect()(AddSampleSlot)
