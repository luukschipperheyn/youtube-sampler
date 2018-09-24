//@flow
import { connect } from 'react-redux'
import SampleSlot from '../components/SampleSlot'
import { bindActionCreators } from 'redux'
import * as SamplerActions from '../actions/sampler'

function getSampleSlotById (sampleSlots, id) {
  return sampleSlots[id]
}

const mapStateToProps = (state, ownProps) => ({
  sampleSlot: getSampleSlotById(state.sampleSlots, ownProps.sampleSlotId)
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(SamplerActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleSlot)
