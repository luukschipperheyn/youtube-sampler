import { combineReducers } from 'redux'
import { sampleSlots, selectedSampleSlot } from './sampleSlots'
import counter from './counter'

export default combineReducers({
  selectedSampleSlot,
  sampleSlots,
  counter
})
