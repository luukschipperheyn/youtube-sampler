//@flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SampleSlotControls from '../components/SampleSlotControls'
import * as SamplerActions from '../actions/sampler'

const mapStateToProps = state => ({
  sampleSlot: state.sampleSlots[state.selectedSampleSlot]
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(SamplerActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleSlotControls)
